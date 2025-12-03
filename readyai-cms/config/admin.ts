export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      // Allow previews from configured frontend URLs
      allowedOrigins: [
        env('FRONTEND_URL'),
        env('STAGING_FRONTEND_URL'),
        'http://localhost:5173',
        'http://localhost:3000',
        'https://readyai.dev',
        'https://readyai2.onrender.com',
      ].filter(Boolean),
      // Preview handler - generates the preview URL with token
      async handler(uid: string, params: any) {
        const documentId = params?.documentId;
        
        if (!documentId) {
          throw new Error('Missing documentId in preview handler');
        }
        
        // Generate preview token using crypto
        const crypto = require('crypto');
        const secret = env('PREVIEW_SECRET') || env('ADMIN_JWT_SECRET') || 'default-preview-secret-change-me';
        
        // Generate token with documentId and timestamp
        const timestamp = Date.now();
        const tokenData = `${uid}:${documentId}:${timestamp}`;
        const token = crypto
          .createHash('sha256')
          .update(`${tokenData}:${secret}`)
          .digest('hex');
        
        // Determine frontend URL: STAGING_FRONTEND_URL > FRONTEND_URL > defaults
        const isProduction = env('NODE_ENV') === 'production';
        const frontendUrl = env('STAGING_FRONTEND_URL') || 
                          env('FRONTEND_URL') || 
                          (isProduction ? 'https://readyai.dev' : 'http://localhost:5173');
        
        return `${frontendUrl}/preview?id=${documentId}&token=${token}&contentType=${uid}`;
      },
    },
  },
});
