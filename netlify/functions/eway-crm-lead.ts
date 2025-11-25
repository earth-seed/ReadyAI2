import { Handler } from '@netlify/functions';

interface EWayLoginResponse {
  sessionId: string;
  webServiceApiVersion?: string;
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

    // Step 1: Login to get sessionId
    const loginResponse = await fetch(`${serviceUrl}/LogIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        passwordHash: password,
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

    // Step 2: Parse name into FirstName and LastName
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Step 3: Create contact/lead in eWay-CRM
    console.log('📝 Creating contact in eWay-CRM...');
    
    const contactData = {
      sessionId: sessionId,
      transmitObject: {
        FileAs: formData.name,
        FirstName: firstName,
        LastName: lastName,
        Email: formData.email,
        CompanyName: formData.company || '',
        BusinessPhone: formData.phone || '',
        AdditionalFields: {
          LeadSource: 'Website - Gated Content',
          Content: formData.content || 'Gated Content Download',
        },
      },
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
      console.error('❌ Save contact failed:', saveResponse.status, errorText);
      
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
          details: errorText
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

