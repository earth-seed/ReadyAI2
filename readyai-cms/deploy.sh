#!/bin/bash

# ReadyAI Strapi CMS Deployment Script for Render

echo "🚀 Deploying ReadyAI Strapi CMS to Render..."

# Build the application
echo "📦 Building Strapi application..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your GitHub repo to Render"
echo "3. Create a PostgreSQL database on Render"
echo "4. Set environment variables in Render dashboard"
echo "5. Deploy your service"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
