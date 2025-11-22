var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/submit-lead.ts
var submit_lead_exports = {};
__export(submit_lead_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(submit_lead_exports);

// netlify/functions/lib/eway-crm.ts
var import_crypto = require("crypto");
var EwayCRMClient = class {
  credentials;
  sessionId = null;
  constructor(credentials) {
    this.credentials = credentials;
  }
  /**
   * Get Basic Auth header
   */
  getAuthHeader() {
    const authString = Buffer.from(
      `${this.credentials.username}:${this.credentials.password}`
    ).toString("base64");
    return `Basic ${authString}`;
  }
  /**
   * Create MD5 hash of password for API authentication
   */
  hashPassword(password) {
    return (0, import_crypto.createHash)("md5").update(password).digest("hex");
  }
  /**
   * Login to eWay CRM and get session ID
   * Uses WCF API: POST to /LogIn
   */
  async login() {
    console.log("Logging in to eWay CRM...");
    console.log("Using service URL:", this.credentials.serviceUrl);
    const response = await fetch(`${this.credentials.serviceUrl}/LogIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        userName: this.credentials.username,
        passwordHash: this.hashPassword(this.credentials.password),
        appVersion: "ReadyAI1.0.0",
        clientMachineIdentifier: "netlify-function",
        clientMachineName: "ReadyAI-Website"
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Login failed:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Login failed: ${response.statusText}`);
    }
    const result = await response.json();
    console.log("Login successful:", result);
    if (result.SessionId) {
      this.sessionId = result.SessionId;
      return result.SessionId;
    }
    throw new Error("No SessionId in login response");
  }
  /**
   * Create a new contact in eWay CRM
   * Uses WCF API: POST to /SaveContact
   */
  async createContact(contact) {
    if (!this.sessionId) {
      await this.login();
    }
    const contactData = {
      FirstName: contact.FirstName,
      LastName: contact.LastName,
      Email1Address: contact.Email,
      // Note: Email1Address, not Email
      FileAs: contact.FileAs || `${contact.FirstName} ${contact.LastName}`,
      Note: contact.AdditionalFields?.Description || "",
      ...contact.AdditionalFields
    };
    const requestBody = {
      sessionId: this.sessionId,
      transmitObject: contactData,
      dieOnItemConflict: false
    };
    console.log("Sending to eWay CRM SaveContact:", {
      url: `${this.credentials.serviceUrl}/SaveContact`,
      sessionId: this.sessionId,
      data: contactData
    });
    const response = await fetch(`${this.credentials.serviceUrl}/SaveContact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("SaveContact error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Failed to create contact: ${response.statusText}`);
    }
    const result = await response.json();
    console.log("eWay CRM success:", result);
    return result;
  }
  /**
   * Logout and cleanup session
   */
  async logout() {
    if (!this.sessionId) return;
    try {
      await fetch(`${this.credentials.serviceUrl}/LogOut`, {
        method: "POST",
        headers: {
          "Authorization": this.getAuthHeader(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sessionId: this.sessionId })
      });
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.sessionId = null;
    }
  }
};

// netlify/functions/submit-lead.ts
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validateLeadData(data) {
  const errors = [];
  if (!data.firstName || data.firstName.trim().length === 0) {
    errors.push("First name is required");
  }
  if (!data.lastName || data.lastName.trim().length === 0) {
    errors.push("Last name is required");
  }
  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email is required");
  }
  return {
    valid: errors.length === 0,
    errors
  };
}
var handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }
  try {
    const leadData = JSON.parse(event.body || "{}");
    console.log("Received lead submission:", {
      email: leadData.email,
      source: leadData.source,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    const validation = validateLeadData(leadData);
    if (!validation.valid) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          errors: validation.errors
        })
      };
    }
    if (process.env.EWAY_TEST_MODE === "true") {
      console.log("[TEST MODE] Would send to eWay CRM:", leadData);
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          testMode: true,
          message: "Test mode - no data sent to eWay CRM"
        })
      };
    }
    const ewayUsername = process.env.EWAY_CRM_USERNAME;
    const ewayPassword = process.env.EWAY_CRM_PASSWORD;
    const ewayServiceUrl = process.env.EWAY_CRM_SERVICE_URL;
    if (!ewayUsername || !ewayPassword || !ewayServiceUrl) {
      console.error("Missing eWay CRM credentials in environment variables");
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: "Server configuration error"
        })
      };
    }
    const ewayClient = new EwayCRMClient({
      username: ewayUsername,
      password: ewayPassword,
      serviceUrl: ewayServiceUrl
    });
    const result = await ewayClient.createContact({
      FirstName: leadData.firstName,
      LastName: leadData.lastName,
      Email: leadData.email,
      Category: leadData.source || "Website Lead",
      AdditionalFields: {
        Description: leadData.consent ? "User consented to privacy policy" : void 0
      }
    });
    await ewayClient.logout();
    console.log("Successfully created contact in eWay CRM:", {
      email: leadData.email,
      result
    });
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: true,
        message: "Lead submitted successfully"
      })
    };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Failed to submit lead. Please try again."
      })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=submit-lead.js.map
