/**
 * Netlify Function: Submit Lead to eWay CRM
 * Endpoint: /.netlify/functions/submit-lead
 */

import { Handler, HandlerEvent } from '@netlify/functions';
import { EwayCRMClient } from './lib/eway-crm';

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  source?: string;
  consent?: boolean;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate lead data
 */
function validateLeadData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.firstName || data.firstName.trim().length === 0) {
    errors.push('First name is required');
  }

  if (!data.lastName || data.lastName.trim().length === 0) {
    errors.push('Last name is required');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Main handler function
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const leadData: LeadData = JSON.parse(event.body || '{}');

    console.log('Received lead submission:', {
      email: leadData.email,
      source: leadData.source,
      timestamp: new Date().toISOString(),
    });

    // Validate data
    const validation = validateLeadData(leadData);
    if (!validation.valid) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          errors: validation.errors,
        }),
      };
    }

    // Check for test mode (won't send to eWay CRM)
    if (process.env.EWAY_TEST_MODE === 'true') {
      console.log('[TEST MODE] Would send to eWay CRM:', leadData);
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          testMode: true,
          message: 'Test mode - no data sent to eWay CRM',
        }),
      };
    }

    // Get eWay CRM credentials from environment
    const ewayUsername = process.env.EWAY_CRM_USERNAME;
    const ewayPassword = process.env.EWAY_CRM_PASSWORD;
    const ewayServiceUrl = process.env.EWAY_CRM_SERVICE_URL;

    if (!ewayUsername || !ewayPassword || !ewayServiceUrl) {
      console.error('Missing eWay CRM credentials in environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: 'Server configuration error',
        }),
      };
    }

    // Initialize eWay CRM client
    const ewayClient = new EwayCRMClient({
      username: ewayUsername,
      password: ewayPassword,
      serviceUrl: ewayServiceUrl,
    });

    // Create contact in eWay CRM
    const result = await ewayClient.createContact({
      FirstName: leadData.firstName,
      LastName: leadData.lastName,
      Email: leadData.email,
      Category: leadData.source || 'Website Lead',
      AdditionalFields: {
        Description: leadData.consent
          ? 'User consented to privacy policy'
          : undefined,
      },
    });

    // Cleanup session
    await ewayClient.logout();

    console.log('Successfully created contact in eWay CRM:', {
      email: leadData.email,
      result: result,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Lead submitted successfully',
      }),
    };
  } catch (error) {
    console.error('Error submitting lead:', error);

    // Don't expose internal errors to client
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Failed to submit lead. Please try again.',
      }),
    };
  }
};

