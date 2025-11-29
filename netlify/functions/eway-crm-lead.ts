import { Handler } from '@netlify/functions';
import { createHash } from 'crypto';

interface EWayLoginResponse {
  sessionId: string;
  webServiceApiVersion?: string;
}

/**
 * Hash password using MD5 for eWay CRM legacy login endpoint
 * @param password - Plain text password
 * @returns MD5 hash of the password in lowercase hex format
 */
function hashPassword(password: string): string {
  return createHash('md5').update(password).digest('hex');
}

interface EWaySaveContactResponse {
  data?: any;
  success?: boolean;
  message?: string;
}

interface LeadFormData {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  content?: string;
  consent?: boolean;
  // Legacy support for single 'name' field
  name?: string;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const formData: LeadFormData = JSON.parse(event.body || '{}');
    
    // Support legacy format with single 'name' field
    let firstName: string;
    let lastName: string;
    
    if (formData.firstName && formData.lastName) {
      // New format with separate first and last name
      firstName = formData.firstName.trim();
      lastName = formData.lastName.trim();
    } else if (formData.name) {
      // Legacy format - parse single name field
      const nameParts = formData.name.trim().split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'First name, last name, and email are required' }),
      };
    }
    
    // Validate required fields
    if (!firstName || !lastName || !formData.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'First name, last name, and email are required' }),
      };
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    const serviceUrl = process.env.EWAY_CRM_SERVICE_URL;
    const username = process.env.EWAY_CRM_USERNAME;
    const password = process.env.EWAY_CRM_PASSWORD;
    const appVersion = process.env.EWAY_CRM_APP_VERSION || 'ReadyAI1.0';

    if (!serviceUrl || !username || !password) {
      console.error('❌ Missing eWay-CRM credentials in environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    console.log('🔐 Attempting to login to eWay-CRM...');

    // Hash password using MD5 for legacy login endpoint
    const passwordHash = hashPassword(password);

    // Step 1: Login to get sessionId
    const loginResponse = await fetch(`${serviceUrl}/LogIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        passwordHash: passwordHash,
        appVersion: appVersion,
        clientMachineIdentifier: 'readyai-website',
        clientMachineName: 'ReadyAI Website',
      }),
    });

    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      console.error('❌ Login failed:', loginResponse.status, errorText);
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          error: 'Authentication failed',
          details: errorText
        }),
      };
    }

    const loginData: any = await loginResponse.json();
    const sessionId = loginData.SessionId || loginData.sessionId;

    if (!sessionId) {
      console.error('❌ No sessionId received from login');
      console.error('Login response:', loginData);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to obtain session',
          details: loginData.Description || 'No session ID in response'
        }),
      };
    }

    console.log('✅ Login successful, sessionId obtained');

    // Step 2: Check for existing contact by email to avoid duplicates
    console.log('🔍 Checking for existing contact...');
    const checkDuplicateResponse = await fetch(`${serviceUrl}/GetContacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          sessionId: sessionId,
          transmitObject: {
            Email1Address: formData.email.trim(),
            maxRecords: 10, // Get more records to check all email fields
          },
        }),
    });

    let existingContact = null;
    if (checkDuplicateResponse.ok) {
      try {
        const checkData = await checkDuplicateResponse.json();
        if (checkData.Data && Array.isArray(checkData.Data) && checkData.Data.length > 0) {
          // Check if any contact has matching email in Email1Address, Email2Address, or Email3Address
          const emailToCheck = formData.email.trim().toLowerCase();
          const foundContact = checkData.Data.find((contact: any) => {
            const email1 = contact.Email1Address?.toLowerCase();
            const email2 = contact.Email2Address?.toLowerCase();
            const email3 = contact.Email3Address?.toLowerCase();
            return email1 === emailToCheck || email2 === emailToCheck || email3 === emailToCheck;
          });
          if (foundContact) {
            existingContact = foundContact;
            console.log('ℹ️  Contact already exists with this email, skipping creation');
          }
        }
      } catch (error) {
        // If GetContacts fails or returns unexpected format, continue with creation
        console.warn('⚠️  Could not check for duplicates, proceeding with creation:', error);
      }
    }

    // Step 3: Create contact/lead in eWay-CRM (only if not duplicate)
    if (existingContact) {
      console.log('✅ Using existing contact, skipping creation');
      
      // Logout and return success
      try {
        await fetch(`${serviceUrl}/LogOut`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
      } catch (logoutError) {
        console.error('⚠️ Logout failed:', logoutError);
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          message: 'Lead already exists',
          duplicate: true,
          data: { existing: true }
        }),
      };
    }

    console.log('📝 Creating new contact in eWay-CRM...');
    
    // Build transmitObject - ensure required fields have values
    // eWay CRM uses Email1Address, Email2Address, Email3Address (not "Email")
    const fullName = `${firstName} ${lastName}`.trim();
    const emailValue = formData.email.trim();
    const transmitObject: any = {
      FileAs: fullName,
      FirstName: firstName,
      LastName: lastName,
      Email1Address: emailValue, // eWay CRM uses Email1Address for primary email
    };

    // Only add optional fields if they have values (avoid empty strings)
    if (formData.company && formData.company.trim()) {
      transmitObject.CompanyName = formData.company.trim();
    }
    
    if (formData.phone && formData.phone.trim()) {
      transmitObject.BusinessPhone = formData.phone.trim();
    }

    const contactData = {
      sessionId: sessionId,
      transmitObject: transmitObject,
    };

    const saveResponse = await fetch(`${serviceUrl}/SaveContact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!saveResponse.ok) {
      const errorText = await saveResponse.text();
      console.error('❌ Save contact failed:', saveResponse.status, errorText.substring(0, 200));
      
      // Try to logout even if save failed
      try {
        await fetch(`${serviceUrl}/LogOut`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
      } catch (logoutError) {
        console.error('⚠️ Logout failed after save error:', logoutError);
      }

      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to save contact',
          details: errorText.substring(0, 500) // Limit error text length
        }),
      };
    }

    const saveData: EWaySaveContactResponse = await saveResponse.json();
    console.log('✅ Contact saved successfully');

    // Step 4: Logout
    try {
      await fetch(`${serviceUrl}/LogOut`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
    } catch (logoutError) {
      console.error('⚠️ Logout failed (non-critical):', logoutError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Lead submitted successfully',
        data: saveData
      }),
    };

  } catch (error: any) {
    console.error('❌ Unexpected error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
};

