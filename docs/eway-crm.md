# eWay-CRM Integration - Setup & Deployment Guide

## 🎯 Current Status

✅ **Code Integration**: Complete  
✅ **Service URL**: Correct (`https://hosting.eway-crm.us/readyai/API.svc`)  
✅ **Environment Variables**: Configured  
⚠️ **Authentication**: Invalid credentials - needs correction

---

## ⚠️ ISSUE: Invalid Credentials

**Error Message:**
```
Invalid password or username 'codeseedtech@gmail.com'
```

**What Happened:**
- The eWay-CRM API returns HTTP 200 (OK) even when authentication fails
- This caused initial tests to show false success
- Actual authentication status is determined by presence of `SessionId` in response
- Current credentials are being rejected by eWay-CRM

---

## 🔧 ACTION REQUIRED

### Step 1: Verify Your Credentials

**Test web login first:**
1. Open: https://hosting.eway-crm.us/readyai
2. Try logging in with:
   - Username: `codeseedtech@gmail.com`
   - Password: (the one in your `.env` file)

**If web login works:**
- The API might require a different password or authentication method
- Contact eWay-CRM support (see below)

**If web login fails:**
- Get the correct password from your client
- Update `.env` file with correct password
- Run test again

### Step 2: Test API Authentication

```bash
cd /Users/leyla/ReadyAI2
bash -c 'set -a; source .env; set +a; node test-eway-auth-simple.js'
```

**Expected output if successful:**
```
✅ Login successful!
   Session ID: (actual session ID)
   API Version: 9.1.0.225
```

### Step 3: Contact eWay-CRM Support (if needed)

**Questions to ask:**
1. "Does the account `codeseedtech@gmail.com` have API access enabled?"
2. "Do I need a special API password, or can I use my regular web login password?"
3. "Are there any additional authentication requirements for API access?"

**eWay-CRM Support:**
- Documentation: https://kb.eway-crm.com/en/documentation/6-add-ins/6-7-api-1
- Support portal: Check your eWay-CRM account for support contact

---

## 📁 What's Been Created

### 1. Netlify Function (`/netlify/functions/eway-crm-lead.ts`)

Handles all lead submissions from your gated content forms:
- Authenticates with eWay-CRM
- Creates contacts with form data
- Manages sessions (login/logout)
- Error handling and logging

### 2. Frontend Integration (`/src/components/ui/GatedContentModal.tsx`)

Updated to send leads to eWay-CRM via the Netlify function.

### 3. Test Scripts

- `test-eway-auth-simple.js` - Basic authentication test
- `test-lead-creation.js` - Full lead creation test
- `check-env.sh` - Verify environment variables

---

## 🔧 Environment Variables

Your `.env` file should contain:

```env
EWAY_CRM_SERVICE_URL=https://hosting.eway-crm.us/readyai/API.svc
EWAY_CRM_USERNAME=codeseedtech@gmail.com
EWAY_CRM_PASSWORD=your-password-here
EWAY_CRM_APP_VERSION=ReadyAI1.0
```

**Important**: 
- Service URL must include `.svc` extension
- App version must be `ReadyAI1.0` (at least 6 characters, starting with letters)
- Password should be plain text (API handles hashing internally)

---

## 🚀 Deployment (Once Authentication Works)

### Step 1: Test Authentication

```bash
cd /Users/leyla/ReadyAI2
bash -c 'set -a; source .env; set +a; node test-eway-auth-simple.js'
```

✅ Must show: `✅ Login successful!` with a SessionId

### Step 2: Test Locally

```bash
netlify dev
```
Open http://localhost:8888, submit gated content form, verify contact in eWay-CRM

### Step 3: Configure Netlify

**Netlify Dashboard** → Your Site → **Environment variables**:
```
EWAY_CRM_SERVICE_URL = https://hosting.eway-crm.us/readyai/API.svc
EWAY_CRM_USERNAME = codeseedtech@gmail.com
EWAY_CRM_PASSWORD = (your working password)
EWAY_CRM_APP_VERSION = ReadyAI1.0
```

### Step 4: Deploy

```bash
git add .
git commit -m "Add eWay-CRM lead collection integration"
git push
```

### Step 5: Test Production

Submit form on live site → Verify contact in eWay-CRM

---

## 🔍 How It Works

### User Journey:
```
User clicks "Get Access" on gated content
         ↓
Fills out form (name, email, company, phone)
         ↓
Submits form
         ↓
Frontend → Netlify Function → eWay-CRM
         ↓
Contact created in eWay-CRM
         ↓
User receives download link
```

### API Flow:
```
1. Function receives form data
2. Login to eWay-CRM (get SessionId)
3. Create contact with form data
4. Logout from eWay-CRM
5. Return success to frontend
```

### Data Mapping:
| Form Field | eWay-CRM Field | Required |
|------------|----------------|----------|
| Name | FileAs | Yes |
| First Name | FirstName | Yes |
| Last Name | LastName | Yes |
| Email | Email | Yes |
| Company | CompanyName | No |
| Phone | BusinessPhone | No |
| Content Title | AdditionalFields.Content | No |
| Source | AdditionalFields.LeadSource | No |

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid password or username" | Test web login, verify credentials, contact support |
| "Method Not Allowed (405)" | Add `.svc` to URL: `https://hosting.eway-crm.us/readyai/API.svc` |
| Form submits but no contact | Check Netlify function logs, verify env vars in Netlify |
| "App version must be 6+ characters" | Use `ReadyAI1.0` not `1.0` |
| Test shows "Login successful" but SessionId is undefined | That's a false positive - authentication actually failed |

## 📊 Monitoring

**View Logs:** Netlify Dashboard → Your Site → Functions → `eway-crm-lead` → Function log

**Logged Events:** Login, contact creation, logout, errors with details

---

## 📋 Deployment Checklist

- [ ] Test web login: https://hosting.eway-crm.us/readyai
- [ ] Update `.env` with correct password
- [ ] Run `node test-eway-auth-simple.js` → must show SessionId
- [ ] Test locally with `netlify dev`
- [ ] Set Netlify environment variables
- [ ] Deploy with `git push`
- [ ] Test on live site

---

## 🆘 Need Help?

**eWay-CRM Support:** https://kb.eway-crm.com/en/documentation/6-add-ins/6-7-api-1

**Questions to Ask:**
1. Does account `codeseedtech@gmail.com` have API access?
2. Should I use regular password or API-specific password?
3. Are there additional authentication requirements?

---

## ✨ Summary

**What Works:** ✅ Integration code complete, environment configured  
**What's Blocked:** ⚠️ Invalid credentials - authentication failing  
**Next Step:** Get correct credentials from client or eWay-CRM support  
**Once Fixed:** Leads will automatically flow from website → eWay-CRM

---

**Security Note:** Never commit `.env` file to git. Credentials stored as environment variables for security.

