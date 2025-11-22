/**
 * eWay CRM API Client
 * Simple wrapper for eWay CRM REST API
 */

import { createHash } from 'crypto';

interface EwayContact {
  FirstName: string;
  LastName: string;
  Email: string;
  FileAs?: string;
  Category?: string;
  AdditionalFields?: Record<string, any>;
}

interface EwayCredentials {
  username: string;
  password: string;
  serviceUrl: string;
}

export class EwayCRMClient {
  private credentials: EwayCredentials;
  private sessionId: string | null = null;

  constructor(credentials: EwayCredentials) {
    this.credentials = credentials;
  }

  /**
   * Get Basic Auth header
   */
  private getAuthHeader(): string {
    const authString = Buffer.from(
      `${this.credentials.username}:${this.credentials.password}`
    ).toString('base64');
    return `Basic ${authString}`;
  }

  /**
   * Create MD5 hash of password for API authentication
   */
  private hashPassword(password: string): string {
    return createHash('md5').update(password).digest('hex');
  }

  /**
   * Login to eWay CRM and get session ID
   * Uses WCF API: POST to /LogIn
   */
  private async login(): Promise<string> {
    console.log('Logging in to eWay CRM...');
    console.log('Using service URL:', this.credentials.serviceUrl);
    
    const response = await fetch(`${this.credentials.serviceUrl}/LogIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        userName: this.credentials.username,
        passwordHash: this.hashPassword(this.credentials.password),
        appVersion: 'ReadyAI1.0.0',
        clientMachineIdentifier: 'netlify-function',
        clientMachineName: 'ReadyAI-Website',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Login failed:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Login successful:', result);
    
    // Extract SessionId from response (note: capital S)
    if (result.SessionId) {
      this.sessionId = result.SessionId;
      return result.SessionId;
    }
    
    throw new Error('No SessionId in login response');
  }

  /**
   * Create a new contact in eWay CRM
   * Uses WCF API: POST to /SaveContact
   */
  async createContact(contact: EwayContact): Promise<any> {
    // Login if we don't have a session
    if (!this.sessionId) {
      await this.login();
    }

    // Prepare contact data according to eWay CRM WCF API format
    const contactData = {
      FirstName: contact.FirstName,
      LastName: contact.LastName,
      Email1Address: contact.Email, // Note: Email1Address, not Email
      FileAs: contact.FileAs || `${contact.FirstName} ${contact.LastName}`,
      Note: contact.AdditionalFields?.Description || '',
      ...contact.AdditionalFields,
    };

    // WCF API expects: sessionId, transmitObject, dieOnItemConflict
    const requestBody = {
      sessionId: this.sessionId,
      transmitObject: contactData,
      dieOnItemConflict: false,
    };

    console.log('Sending to eWay CRM SaveContact:', {
      url: `${this.credentials.serviceUrl}/SaveContact`,
      sessionId: this.sessionId,
      data: contactData,
    });

    const response = await fetch(`${this.credentials.serviceUrl}/SaveContact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SaveContact error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Failed to create contact: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('eWay CRM success:', result);
    return result;
  }

  /**
   * Logout and cleanup session
   */
  async logout(): Promise<void> {
    if (!this.sessionId) return;

    try {
      await fetch(`${this.credentials.serviceUrl}/LogOut`, {
        method: 'POST',
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: this.sessionId }),
      });
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.sessionId = null;
    }
  }
}

