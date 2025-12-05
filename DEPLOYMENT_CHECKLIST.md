# Split Deployment Checklist: Netlify (Frontend) + Render (Strapi)

## 🎯 Overview
- **Frontend**: Deployed on Netlify (public site + Netlify Functions)
- **Backend**: Strapi CMS deployed on Render
- **Database**: PostgreSQL on Render

---

## 📋 NETLIFY ENVIRONMENT VARIABLES

Set these in **Netlify Dashboard** → **Site Settings** → **Environment Variables**:

### Frontend Configuration
```bash
# Strapi API URL (your Render Strapi service)
VITE_STRAPI_URL=https://readyai-strapi-cms.onrender.com

# Firebase Configuration (for authentication)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Netlify Functions (Serverless)
```bash
# eWay-CRM Integration
EWAY_CRM_SERVICE_URL=https://hosting.eway-crm.us/readyai/API.svc
EWAY_CRM_USERNAME=your-email@example.com
EWAY_CRM_PASSWORD=your-password
EWAY_CRM_APP_VERSION=ReadyAI1.0

# SMTP Email (for contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@readyai.dev
```

### Build Environment
```bash
NODE_VERSION=20
NODE_ENV=production
```

---

## 📋 RENDER (STRAPI) ENVIRONMENT VARIABLES

Set these in **Render Dashboard** → **Your Strapi Service** → **Environment**:

### Database
```bash
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=[Auto-populated from Render PostgreSQL service]
```

### Security Keys (Generate random strings - use different values for each!)
```bash
APP_KEYS=[generate-random-string-1,generate-random-string-2,generate-random-string-3,generate-random-string-4]
API_TOKEN_SALT=[generate-random-string]
ADMIN_JWT_SECRET=[generate-random-string]
TRANSFER_TOKEN_SALT=[generate-random-string]
JWT_SECRET=[generate-random-string]
ENCRYPTION_KEY=[generate-random-string]
```

### Cloudinary (Media Storage)
```bash
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

### Frontend URL (IMPORTANT for CORS & Preview)
```bash
# Your Netlify site URL (e.g., https://readyai.dev or https://your-site.netlify.app)
FRONTEND_URL=https://readyai.dev

# Optional: Staging URL if you have one
STAGING_FRONTEND_URL=https://staging-readyai.netlify.app
```

### Strapi Public URL
```bash
PUBLIC_URL=https://readyai-strapi-cms.onrender.com
```

### Email (Optional - for Strapi email plugin)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@readyai.dev
```

### Admin Bootstrap (Optional - auto-creates/resets admin)
```bash
ADMIN_EMAIL=admin@readyai.dev
ADMIN_PASSWORD=your-secure-password
```

---

## ✅ PRE-DEPLOYMENT CHECKLIST

### 1. Strapi Configuration
- [ ] Update `readyai-cms/config/middlewares.ts` - CORS includes your Netlify domain
- [ ] Update `readyai-cms/config/admin.ts` - Preview allowedOrigins includes your Netlify domain
- [ ] Set `FRONTEND_URL` in Render to your Netlify domain
- [ ] Verify `PUBLIC_URL` in Render points to your Render Strapi URL

### 2. Netlify Configuration
- [ ] All environment variables set (see above)
- [ ] Build settings match `netlify.toml`:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Functions directory: `netlify/functions`
- [ ] Branch to deploy: `main` or `master` (verify correct branch)

### 3. Render Configuration
- [ ] PostgreSQL database created
- [ ] Strapi web service created
- [ ] Root directory: `readyai-cms`
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] All environment variables set (see above)

### 4. Security
- [ ] All secrets use environment variables (no hardcoded values)
- [ ] `.env` files are gitignored
- [ ] Generate unique security keys for production
- [ ] CORS configured correctly in Strapi

### 5. Testing
- [ ] Frontend can fetch articles from Strapi API
- [ ] Netlify Functions work (eWay-CRM, email, health check)
- [ ] Strapi admin panel accessible
- [ ] Preview links work from Strapi
- [ ] Images load correctly (Cloudinary URLs)

---

## 🔧 CRITICAL CONFIGURATION UPDATES NEEDED

### Update Strapi CORS (if not already done)

The CORS configuration should include your Netlify domain. It already uses `env('FRONTEND_URL')`, so make sure you set `FRONTEND_URL` in Render to your Netlify domain.

**File**: `readyai-cms/config/middlewares.ts`
- Already configured to use `env('FRONTEND_URL')` ✅
- Just ensure `FRONTEND_URL` is set in Render

### Update Strapi Preview Configuration

**File**: `readyai-cms/config/admin.ts`
- Already configured to use `env('FRONTEND_URL')` ✅
- Just ensure `FRONTEND_URL` is set in Render

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Deploy Strapi to Render
1. Push code to GitHub
2. Connect repository to Render
3. Create PostgreSQL database
4. Create web service (pointing to `readyai-cms` directory)
5. Set all environment variables
6. Deploy and wait for success
7. Access admin: `https://readyai-strapi-cms.onrender.com/admin`

### Step 2: Configure Netlify
1. Link new repository in Netlify
2. Verify build settings
3. Set all environment variables
4. Deploy

### Step 3: Update Strapi with Netlify URL
1. In Render, set `FRONTEND_URL` to your Netlify domain
2. Restart Strapi service
3. Test CORS by fetching articles from frontend

### Step 4: Verify Everything Works
- [ ] Frontend loads
- [ ] Articles display from Strapi
- [ ] Contact forms submit (eWay-CRM)
- [ ] Admin panel accessible
- [ ] Preview links work

---

## 🐛 TROUBLESHOOTING

### CORS Errors
- **Symptom**: Frontend can't fetch from Strapi
- **Fix**: Ensure `FRONTEND_URL` in Render matches your Netlify domain exactly (including `https://`)

### Images Not Loading
- **Symptom**: Article images show broken
- **Fix**: Check Cloudinary credentials in Render, verify images uploaded correctly

### Netlify Functions Not Working
- **Symptom**: 500 errors from functions
- **Fix**: Check environment variables in Netlify, check function logs

### Preview Links Not Working
- **Symptom**: Preview returns 401/403
- **Fix**: Ensure `FRONTEND_URL` in Render matches Netlify domain, check preview token generation

---

## 📝 NOTES

- **Netlify Functions**: Run serverless, have access to `process.env` variables
- **Strapi on Render**: Needs `PUBLIC_URL` for proper URL generation
- **CORS**: Must include exact Netlify domain (with protocol)
- **Preview**: Uses `FRONTEND_URL` to generate preview links
- **Database**: Render auto-connects PostgreSQL via `DATABASE_URL`

---

## 🔐 SECURITY REMINDERS

1. **Never commit** `.env` files
2. **Generate unique** security keys for production
3. **Use strong passwords** for admin accounts
4. **Enable HTTPS** (automatic on Netlify/Render)
5. **Review CORS** settings regularly
6. **Rotate secrets** periodically

