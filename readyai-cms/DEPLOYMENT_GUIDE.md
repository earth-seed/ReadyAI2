# ReadyAI Strapi CMS - Render Deployment Guide

## 🚀 Deployment Steps

### 1. Create PostgreSQL Database on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL"
3. Name it: `readyai-postgres`
4. Plan: Starter ($7/month)
5. Click "Create Database"

### 2. Deploy Strapi Service
1. In Render Dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `readyai-strapi-cms`
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter ($7/month)

### 3. Environment Variables
Set these in your Render service environment variables:

```
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=[Auto-populated from PostgreSQL service]
APP_KEYS=[Generate random string]
API_TOKEN_SALT=[Generate random string]
ADMIN_JWT_SECRET=[Generate random string]
TRANSFER_TOKEN_SALT=[Generate random string]
JWT_SECRET=[Generate random string]
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

### 4. Connect Database
1. In your Strapi service settings
2. Go to "Environment"
3. Add environment variable: `DATABASE_URL`
4. Value: Copy from your PostgreSQL service "External Database URL"

## 📊 Cost Breakdown
- **Strapi Service**: $7/month
- **PostgreSQL Database**: $7/month
- **Cloudinary**: Free tier
- **Total**: $14/month

## 🔧 Local Development
For local development, create `.env` file:
```env
DATABASE_CLIENT=postgres
DATABASE_URL=your_postgres_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

## 🎯 After Deployment
1. Access your Strapi admin at: `https://your-service-name.onrender.com/admin`
2. Create your first admin user
3. Start creating content!
