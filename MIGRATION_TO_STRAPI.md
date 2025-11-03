# Migration Guide: Old Admin Dashboard → Strapi CMS

## 🎯 **Migration Overview**

This guide will help you seamlessly replace your old Firebase-based admin dashboard with Strapi CMS on Render.

---

## 📋 **Step 1: Deploy Strapi to Render**

### 1.1 Create PostgreSQL Database
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"PostgreSQL"**
3. Name: `readyai-postgres`
4. Plan: Starter ($7/month)
5. Click **"Create Database"**
6. Copy the **Internal Database URL** (you'll need this)

### 1.2 Deploy Strapi Service
1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `readyai-strapi-cms`
   - **Root Directory**: `readyai-cms`
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter ($7/month)

### 1.3 Set Environment Variables in Render
Add these environment variables to your Strapi service:

```bash
# Database
DATABASE_CLIENT=postgres
DATABASE_URL=[Paste Internal Database URL from step 1.1]

# Environment
NODE_ENV=production

# Security Keys (Generate random strings)
APP_KEYS=[generate-random-string]
API_TOKEN_SALT=[generate-random-string]
ADMIN_JWT_SECRET=[generate-random-string]
TRANSFER_TOKEN_SALT=[generate-random-string]
JWT_SECRET=[generate-random-string]

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.netlify.app
```

### 1.4 Deploy and Access Strapi
1. Click **"Create Web Service"**
2. Wait for deployment to complete
3. Access your Strapi admin at: `https://readyai-strapi-cms.onrender.com/admin`
4. Create your first admin user account

---

## 📋 **Step 2: Update Frontend Configuration**

### 2.1 Add Environment Variables
Add to your frontend `.env` file (for Netlify, add in Netlify dashboard):

```env
# Strapi CMS URL
VITE_STRAPI_URL=https://readyai-strapi-cms.onrender.com
```

### 2.2 Test Locally First
1. Start Strapi locally: `cd readyai-cms && npm run develop`
2. Start frontend: `npm run dev`
3. Visit `http://localhost:3000/admin` - should redirect to Strapi

---

## 📋 **Step 3: User Migration**

### 3.1 Create Users in Strapi
For each of your content creators:

1. Sign in to Strapi admin panel
2. Go to **Settings → Administration Panel → Users**
3. Click **"Create new user"**
4. Fill in:
   - First name, Last name
   - Email (same as their existing account)
   - Password (send them initial password or reset link)
   - Role: **Editor** or **Author**
5. Click **Save**

### 3.2 Assign Roles
- **Editor**: Can create, edit, and publish any content
- **Author**: Can create and edit their own content
- **Super Admin**: Full access (only you)

### 3.3 Notify Your Team
Send them:
- New admin URL: `https://your-site.netlify.app/admin`
- Their login credentials
- Brief guide on using Strapi (it's intuitive!)

---

## 📋 **Step 4: Deploy Frontend Changes**

### 4.1 Commit and Push
```bash
git add .
git commit -m "Migrate admin dashboard to Strapi CMS"
git push origin bm/strapi
```

### 4.2 Netlify Deployment
1. Push to your branch
2. Netlify will auto-deploy
3. Add environment variable in Netlify:
   - Key: `VITE_STRAPI_URL`
   - Value: `https://readyai-strapi-cms.onrender.com`

---

## ✅ **Testing Checklist**

Before going live:

- [ ] Strapi deployed and accessible
- [ ] Can create admin user
- [ ] Can create content creator users
- [ ] `/admin` route redirects correctly
- [ ] Content creators can log in
- [ ] Can create articles in Strapi
- [ ] Media uploads work (Cloudinary)
- [ ] Frontend can fetch content from Strapi API

---

## 🔄 **Rollback Plan** (If Needed)

If something goes wrong, you can quickly rollback:

1. Revert the `AdminPage.tsx` changes
2. Push to main branch
3. Old Firebase admin will be restored

---

## 💰 **Cost Summary**

| Service | Cost | Purpose |
|---------|------|---------|
| Strapi on Render | $7/month | CMS Backend |
| PostgreSQL on Render | $7/month | Database |
| Cloudinary | Free | Media Storage |
| Netlify (Frontend) | Your existing plan | Frontend hosting |
| **Total** | **$14/month** | Professional CMS |

---

## 🎉 **Benefits of Migration**

✅ **Professional CMS**: Industry-standard content management  
✅ **Better UX**: Intuitive interface for content creators  
✅ **Media Management**: Built-in media library with Cloudinary  
✅ **Content API**: RESTful API for frontend integration  
✅ **Scalable**: Handles growth easily  
✅ **Maintainable**: Standard stack, easy to find developers  

---

## 📞 **Support**

If you run into issues:
1. Check Render logs for Strapi errors
2. Check Netlify logs for frontend errors
3. Verify environment variables are set correctly
4. Ensure CORS is configured properly

---

## 🚀 **Next Steps After Migration**

1. **Migrate existing content** from Firebase to Strapi
2. **Set up content API** integration in frontend
3. **Train your team** on Strapi (5-10 min overview)
4. **Monitor** for the first few days
5. **Gather feedback** from content creators
