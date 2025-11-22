# eWay CRM Integration

This document describes the eWay CRM integration for lead capture forms.

## Architecture

**Frontend** → **Netlify Function** → **eWay CRM API**

- Frontend forms submit to `/.netlify/functions/submit-lead`
- Netlify Function authenticates and sends data to eWay CRM
- Completely separate from Strapi CMS
- Feature flag controlled rollout

## Files

```
netlify/functions/
├── submit-lead.ts          # Main Netlify Function endpoint
└── lib/
    └── eway-crm.ts         # eWay CRM API client

src/components/ui/
├── PlatformExplorationPopup.tsx   # Updated with eWay integration
└── LeadCapturePopup.tsx           # Updated with eWay integration
```

## Environment Variables

### For Local Testing (.env file)

Create a `.env` file in the project root with:

```bash
# eWay CRM Credentials
EWAY_CRM_USERNAME=codeseedtech@gmail.com
EWAY_CRM_PASSWORD=your_eway_password_here
EWAY_CRM_SERVICE_URL=https://hosting.eway-crm.us/readyai/API

# Test Mode - prevents actual submissions to eWay CRM
EWAY_TEST_MODE=true

# Frontend Feature Flag - enables eWay integration in forms
VITE_USE_EWAY_INTEGRATION=false
```

### For Netlify Production

Set these in Netlify Dashboard → Site Settings → Environment Variables:

```bash
EWAY_CRM_USERNAME=codeseedtech@gmail.com
EWAY_CRM_PASSWORD=your_actual_password
EWAY_CRM_SERVICE_URL=https://hosting.eway-crm.us/readyai/API
EWAY_TEST_MODE=false
VITE_USE_EWAY_INTEGRATION=false  # Keep false until fully tested
```

## Feature Flag

The integration is controlled by `VITE_USE_EWAY_INTEGRATION`:

- `false` (default): Uses old Netlify Forms (safe, no changes)
- `true`: Uses new eWay CRM integration via Netlify Function

This allows safe testing and gradual rollout.

## Local Testing

See the "Local Testing Steps" section below for detailed instructions.

## Field Mapping

| Frontend Field | eWay CRM Field | Notes |
|---------------|----------------|-------|
| firstName | FirstName | Required |
| lastName | LastName | Required |
| email | Email | Required, validated |
| source | Category | Tracks form origin |
| consent | Description | Privacy policy consent |

## Error Handling

- All errors are logged but not exposed to users
- Failed submissions return generic error message
- Users always get feedback (never left hanging)
- Function has 10-second timeout

## Monitoring

Check Netlify Function logs:
1. Go to Netlify Dashboard
2. Click on your site
3. Navigate to "Functions" tab
4. Click "submit-lead" function
5. View logs and metrics

