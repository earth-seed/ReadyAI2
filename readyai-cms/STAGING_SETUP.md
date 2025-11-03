# Staging Environment Setup Guide

## 🎯 **Option 1: Separate Render Services (Recommended)**

### **For Strapi CMS:**
1. **Create Staging Strapi Service:**
   - Name: `readyai-strapi-staging`
   - Branch: `feature/strapi-integration`
   - Database: `readyai-postgres-staging`

2. **Create Staging Database:**
   - Name: `readyai-postgres-staging`
   - Plan: Starter ($7/month)
   - This keeps your data completely separate

### **For Frontend:**
1. **Create Staging Frontend:**
   - Name: `readyai-frontend-staging`
   - Branch: `feature/strapi-integration`
   - Connect to staging Strapi API

## 🎯 **Option 2: Local Development (Free)**

### **Keep Working Locally:**
1. **Use local SQLite for development:**
   ```bash
   # Switch back to SQLite for local development
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   ```

2. **Use staging database when ready to test:**
   ```bash
   # Switch to PostgreSQL for testing
   DATABASE_CLIENT=postgres
   DATABASE_URL=your_staging_postgres_url
   ```

## 🎯 **Option 3: Hybrid Approach (Best of Both)**

### **Local Development + Staging Deployment:**
1. **Develop locally** with SQLite (fast, free)
2. **Deploy to staging** when ready to test integration
3. **Deploy to production** when everything works

## 📋 **Recommended Workflow:**

### **Step 1: Create Development Branch**
```bash
git checkout -b feature/strapi-integration
git push -u origin feature/strapi-integration
```

### **Step 2: Local Development**
- Keep using SQLite locally
- Develop and test Strapi integration
- Use localhost for frontend development

### **Step 3: Staging Deployment**
- Deploy Strapi to `readyai-strapi-staging`
- Deploy frontend to `readyai-frontend-staging`
- Test full integration

### **Step 4: Production Deployment**
- Merge to main branch
- Deploy to production services
- Switch main frontend to use new Strapi

## 💰 **Cost Comparison:**

| **Option** | **Strapi** | **Database** | **Frontend** | **Total** |
|------------|------------|--------------|--------------|-----------|
| **Local Dev** | Free | Free | Free | $0 |
| **Staging** | $7/month | $7/month | $7/month | $21/month |
| **Production** | $7/month | $7/month | Existing | $14/month |

## 🔧 **Environment Variables Strategy:**

### **Local Development:**
```env
DATABASE_CLIENT=sqlite
NODE_ENV=development
```

### **Staging:**
```env
DATABASE_CLIENT=postgres
DATABASE_URL=staging_postgres_url
NODE_ENV=production
```

### **Production:**
```env
DATABASE_CLIENT=postgres
DATABASE_URL=production_postgres_url
NODE_ENV=production
```
