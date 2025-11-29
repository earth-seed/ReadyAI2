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
  name: string;
  company?: string;
  email: string;
  phone?: string;
  content?: string;
  consent?: boolean;
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
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and email are required' }),
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
    console.log(`Service URL: ${serviceUrl}`);
    console.log(`Username: ${username}`);

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
          Email: formData.email.trim(),
          maxRecords: 1,
        },
      }),
    });

    let existingContact = null;
    if (checkDuplicateResponse.ok) {
      try {
        const checkData = await checkDuplicateResponse.json();
        if (checkData.Data && Array.isArray(checkData.Data) && checkData.Data.length > 0) {
          // Check if any contact has matching email
          const foundContact = checkData.Data.find((contact: any) => 
            contact.Email && contact.Email.toLowerCase() === formData.email.trim().toLowerCase()
          );
          if (foundContact) {
            existingContact = foundContact;
            console.log('ℹ️  Contact already exists with this email, skipping creation');
            console.log('   Existing contact ID:', (existingContact as any).ItemGUID || (existingContact as any).Id);
          }
        }
      } catch (error) {
        // If GetContacts fails or returns unexpected format, continue with creation
        console.warn('⚠️  Could not check for duplicates, proceeding with creation:', error);
      }
    }

    // Step 3: Parse name into FirstName and LastName
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Step 4: Create contact/lead in eWay-CRM (only if not duplicate)
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
    // eWay CRM requires LastName, so use a fallback if empty
    const transmitObject: any = {
      FileAs: formData.name.trim(),
      FirstName: firstName.trim(),
      LastName: (lastName && lastName.trim()) || firstName.trim() || 'User', // Ensure LastName always has a value
      Email: formData.email.trim(),
    };

    // Only add optional fields if they have values (avoid empty strings)
    if (formData.company && formData.company.trim()) {
      transmitObject.CompanyName = formData.company.trim();
    }
    
    if (formData.phone && formData.phone.trim()) {
      transmitObject.BusinessPhone = formData.phone.trim();
    }

    // Try a simpler approach - AdditionalFields might need to be flat or omitted
    // Some eWay CRM versions don't support nested AdditionalFields
    // Let's try without AdditionalFields first to see if that's the issue
    // If needed, we can add them back in a different format

    const contactData = {
      sessionId: sessionId,
      transmitObject: transmitObject,
    };

    console.log('📤 Sending contact data:', JSON.stringify(contactData, null, 2));

    const saveResponse = await fetch(`${serviceUrl}/SaveContact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!saveResponse.ok) {
      const errorText = await saveResponse.text();
      console.error('❌ Save contact failed:', saveResponse.status);
      console.error('Response headers:', Object.fromEntries(saveResponse.headers.entries()));
      console.error('Response body:', errorText);
      console.error('Request payload was:', JSON.stringify(contactData, null, 2));
      
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
    console.log('🚪 Logging out...');
    try {
      await fetch(`${serviceUrl}/LogOut`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
      console.log('✅ Logout successful');
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

