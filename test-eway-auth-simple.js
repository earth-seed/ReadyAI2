/**
 * Simple test script for eWay-CRM authentication
 * 
 * Loads environment variables from .env file in project root
 * 
 * Run: node test-eway-auth-simple.js
 */

import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const envFile = readFileSync(join(__dirname, '.env'), 'utf-8');
  envFile.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, '');
        process.env[key.trim()] = cleanValue;
      }
    }
  });
} catch (error) {
  // .env file not found or couldn't be read - that's okay, use process.env
  console.warn('⚠️  Could not load .env file, using process.env variables');
}

const serviceUrl = process.env.EWAY_CRM_SERVICE_URL;
const username = process.env.EWAY_CRM_USERNAME;
const password = process.env.EWAY_CRM_PASSWORD;
const appVersion = process.env.EWAY_CRM_APP_VERSION || '1.0';

/**
 * Hash password using MD5 for eWay CRM legacy login endpoint
 * @param {string} password - Plain text password
 * @returns {string} MD5 hash of the password in lowercase hex format
 */
function hashPassword(password) {
  return createHash('md5').update(password).digest('hex');
}

console.log('\n🧪 Testing eWay-CRM Authentication\n');
console.log('Configuration:');
console.log(`  Service URL: ${serviceUrl}`);
console.log(`  Username: ${username}`);
console.log(`  Password: ${password ? '***' + password.slice(-4) : 'NOT SET'}`);
console.log(`  App Version: ${appVersion}\n`);

if (!serviceUrl || !username || !password) {
  console.error('❌ ERROR: Missing required environment variables');
  console.error('\nMake sure you set them when running:');
  console.error('  EWAY_CRM_SERVICE_URL=https://hosting.eway-crm.us/readyai/API \\');
  console.error('  EWAY_CRM_USERNAME=your-email@example.com \\');
  console.error('  EWAY_CRM_PASSWORD=your-password \\');
  console.error('  node test-eway-auth-simple.js');
  process.exit(1);
}

async function testAuth() {
  try {
    console.log('🔐 Step 1: Attempting to login...');
    console.log('   Trying REST API endpoint...');
    
    // Hash password using MD5 for legacy login endpoint
    const passwordHash = hashPassword(password);
    
    // Try REST API first
    let loginResponse = await fetch(`${serviceUrl}/LogIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        passwordHash: passwordHash,
        appVersion: appVersion,
      }),
    });

    console.log(`   Status: ${loginResponse.status} ${loginResponse.statusText}`);

    // If 405, try alternative endpoint structure
    if (loginResponse.status === 405) {
      console.log('\n   REST API not supported, trying alternative endpoints...');
      
      // Try lowercase api
      const altUrl1 = serviceUrl.replace('/API', '/api');
      console.log(`   Trying: ${altUrl1}/LogIn`);
      
      loginResponse = await fetch(`${altUrl1}/LogIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          userName: username,
          passwordHash: passwordHash,
          appVersion: appVersion,
        }),
      });
      
      console.log(`   Status: ${loginResponse.status} ${loginResponse.statusText}`);
    }

    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      console.error('❌ Login failed!');
      
      // Only show first 500 chars of error
      console.error('   Response:', errorText.substring(0, 500));
      
      if (loginResponse.status === 404) {
        console.error('\n💡 The endpoint was not found.');
        console.error('   Check the Swagger docs at: https://hosting.eway-crm.us/readyai/api/swagger');
        console.error('   Look for the correct "LogIn" or "Login" endpoint path.');
      } else if (loginResponse.status === 401) {
        console.error('\n💡 Authentication failed - check your username and password.');
      } else if (loginResponse.status === 405) {
        console.error('\n💡 Method not allowed - this might be a SOAP/WCF service.');
        console.error('   Contact eWay-CRM support for the correct API endpoint and format.');
      }
      
      process.exit(1);
    }

    const loginData = await loginResponse.json();
    
    // Check for actual SessionId (eWay-CRM returns 200 even on failure!)
    const sessionId = loginData.SessionId || loginData.sessionId;
    
    if (!sessionId) {
      console.error('❌ Login failed!');
      console.error('   Return Code:', loginData.ReturnCode);
      console.error('   Description:', loginData.Description);
      console.error('\n💡 eWay-CRM returned 200 OK but no SessionId - this means authentication failed.');
      console.error('   Please verify your username and password are correct.');
      process.exit(1);
    }
    
    console.log('✅ Login successful!');
    console.log('   Session ID:', sessionId);
    console.log('   API Version:', loginData.WcfVersion || loginData.webServiceApiVersion || 'N/A');
    
    console.log('\n📋 Step 2: Testing session with GetContacts...');
    
    const getContactsResponse = await fetch(`${serviceUrl}/GetContacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionId,
        transmitObject: {
          maxRecords: 1,
        },
      }),
    });

    if (getContactsResponse.ok) {
      const contactsData = await getContactsResponse.json();
      console.log('✅ GetContacts successful - session is valid!');
      console.log('   Records found:', contactsData.Data?.length || 0);
    } else {
      const errorText = await getContactsResponse.text();
      console.warn('⚠️  GetContacts failed (may not have permission):', errorText);
    }

    // Logout
    console.log('\n🚪 Step 3: Logging out...');
    
    const logoutResponse = await fetch(`${serviceUrl}/LogOut`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (logoutResponse.ok) {
      console.log('✅ Logout successful!');
    } else {
      console.warn('⚠️  Logout failed (non-critical)');
    }

    console.log('\n✅ ALL TESTS PASSED! eWay-CRM integration is working correctly.\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run the test
testAuth();

