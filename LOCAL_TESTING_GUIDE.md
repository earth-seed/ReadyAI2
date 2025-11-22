# Local Testing Guide - eWay CRM Integration

This guide ensures you can test the eWay CRM integration locally **without affecting production**.

## Prerequisites

- Node.js installed
- Netlify CLI installed (we'll install if needed)
- eWay CRM credentials
- Project already cloned

---

## Step 1: Install Netlify CLI (if not already installed)

```bash
npm install -g netlify-cli
```

Verify installation:
```bash
netlify --version
```

---

## Step 2: Create Local Environment File

Create a `.env` file in the project root (`/Users/leyla/ReadyAI2/.env`):

```bash
# eWay CRM Credentials
EWAY_CRM_USERNAME=codeseedtech@gmail.com
EWAY_CRM_PASSWORD=your_actual_eway_password
EWAY_CRM_SERVICE_URL=https://hosting.eway-crm.us/readyai/API

# TEST MODE - Prevents real submissions to eWay CRM
# Set to 'true' for safe local testing
EWAY_TEST_MODE=true

# Frontend Feature Flag
# Set to 'true' to test the new eWay integration
# Set to 'false' to use old Netlify Forms
VITE_USE_EWAY_INTEGRATION=true
```

**Important:** 
- Replace `your_actual_eway_password` with your real password
- Keep `EWAY_TEST_MODE=true` to prevent creating test contacts in eWay CRM
- This `.env` file is gitignored and won't be committed

---

## Step 3: Install Dependencies

If you haven't already:

```bash
cd /Users/leyla/ReadyAI2
npm install
```

---

## Step 4: Start Local Development Server

Run the Netlify dev server (includes both frontend and functions):

```bash
netlify dev
```

This will:
- Start your Vite dev server
- Start Netlify Functions locally
- Load environment variables from `.env`
- Make everything available at `http://localhost:8888`

**Expected output:**
```
◈ Netlify Dev ◈
◈ Injected build setting env var: ...
◈ Loaded function submit-lead
◈ Functions server is listening on 58471
◈ Starting Netlify Dev with Vite

  ➜  Local:   http://localhost:8888/
  ➜  Functions: http://localhost:8888/.netlify/functions/
```

---

## Step 5: Test the Function Directly (Optional)

Before testing through the UI, you can test the function directly:

### Test 1: Check if function is loaded

```bash
curl http://localhost:8888/.netlify/functions/submit-lead
```

**Expected:** Method not allowed error (405) - this is good! It means function is working but requires POST.

### Test 2: Test with valid data (TEST MODE)

```bash
curl -X POST http://localhost:8888/.netlify/functions/submit-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "source": "local-test",
    "consent": true
  }'
```

**Expected response (with EWAY_TEST_MODE=true):**
```json
{
  "success": true,
  "testMode": true,
  "message": "Test mode - no data sent to eWay CRM"
}
```

### Test 3: Test with invalid data

```bash
curl -X POST http://localhost:8888/.netlify/functions/submit-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "",
    "email": "invalid-email"
  }'
```

**Expected response:**
```json
{
  "success": false,
  "errors": ["First name is required", "Valid email is required"]
}
```

---

## Step 6: Test Through the Website UI

1. **Open your browser** to `http://localhost:8888`

2. **Navigate to a page** with the lead capture popup (or wait for it to trigger)

3. **Fill out the form:**
   - First Name: Test
   - Last Name: Local
   - Email: test@example.com
   - Check the consent box

4. **Submit the form**

5. **Check the terminal** where `netlify dev` is running

**Expected logs:**
```
[Received lead submission: {
  email: 'test@example.com',
  source: 'platform-exploration-popup',
  timestamp: '2025-11-21T...'
}]
[TEST MODE] Would send to eWay CRM: { ... }
```

6. **Check your browser console** (F12 → Console tab)
   - Should see successful form submission
   - No errors

---

## Step 7: Test Real Submission (Optional - Creates Real Contact)

⚠️ **WARNING:** This will create a real contact in eWay CRM!

Only do this when you're ready to test the full integration.

1. **Update `.env` file:**
   ```bash
   EWAY_TEST_MODE=false  # Change to false
   VITE_USE_EWAY_INTEGRATION=true
   ```

2. **Restart `netlify dev`** (Ctrl+C, then `netlify dev` again)

3. **Submit a test form** with real data

4. **Check eWay CRM** immediately to verify the contact was created

5. **Check terminal logs** for successful submission:
   ```
   Successfully created contact in eWay CRM: { email: '...', result: {...} }
   ```

---

## Step 8: Test Fallback Mode (Old Netlify Forms)

To verify the feature flag works:

1. **Update `.env` file:**
   ```bash
   VITE_USE_EWAY_INTEGRATION=false  # Disable eWay integration
   ```

2. **Restart `netlify dev`**

3. **Submit form** - should use old Netlify Forms method

4. **Check logs** - should see Netlify Forms submission, not eWay CRM

---

## Troubleshooting

### Function not found (404)
- Make sure you're running `netlify dev` (not `npm run dev`)
- Check that `netlify/functions/submit-lead.ts` exists
- Try restarting `netlify dev`

### Environment variables not loading
- Make sure `.env` file is in project root
- Variable names must match exactly
- Restart `netlify dev` after changing `.env`

### TypeScript errors in function
- Check `netlify/functions/lib/eway-crm.ts` exists
- Run `npm install` to ensure all dependencies are installed
- Check for syntax errors in the terminal

### CORS errors in browser
- Should not happen with `netlify dev` (same origin)
- If you see CORS errors, make sure you're accessing `localhost:8888` not a different port

### eWay CRM authentication failed
- Double-check credentials in `.env`
- Verify password is correct
- Check that service URL is correct: `https://hosting.eway-crm.us/readyai/API`

---

## Stopping the Server

When done testing:

1. Press `Ctrl+C` in the terminal running `netlify dev`
2. Server stops immediately

---

## Next Steps After Successful Local Testing

1. **Commit your changes:**
   ```bash
   git add netlify/ src/
   git commit -m "Add eWay CRM integration with feature flag"
   ```

2. **Push to a feature branch:**
   ```bash
   git checkout -b feature/eway-integration
   git push origin feature/eway-integration
   ```

3. **Create Pull Request** on GitHub
   - Netlify will create a deploy preview automatically
   - Test on the preview URL

4. **Set environment variables in Netlify Dashboard** (for preview and production)

5. **Merge to main** only after preview testing is successful

---

## Safety Checklist ✅

Before deploying to production, verify:

- [ ] Local testing with `EWAY_TEST_MODE=true` works
- [ ] Local testing with `EWAY_TEST_MODE=false` creates real contact
- [ ] Feature flag (`VITE_USE_EWAY_INTEGRATION=false`) keeps old behavior
- [ ] Feature flag (`VITE_USE_EWAY_INTEGRATION=true`) uses eWay CRM
- [ ] Error handling works (try invalid email, empty fields)
- [ ] Form submission UI feedback works correctly
- [ ] Console shows no errors
- [ ] Contact appears in eWay CRM with correct fields
- [ ] No production environment variables in `.env` (gitignored)

---

## Production Deployment Safety

**Key Points:**
- Local testing uses `.env` file (not committed to git)
- Production uses Netlify environment variables
- Feature flag allows gradual rollout
- Can revert instantly if issues arise
- Old Netlify Forms still work as fallback

**Recommended Production Rollout:**
1. Deploy with `VITE_USE_EWAY_INTEGRATION=false` (old behavior)
2. Monitor for issues
3. Change to `VITE_USE_EWAY_INTEGRATION=true` in Netlify dashboard
4. Trigger new deployment
5. Monitor function logs
6. If issues: change back to `false` and redeploy

---

## Questions?

Refer to `EWAY_CRM_INTEGRATION.md` for architecture details.

