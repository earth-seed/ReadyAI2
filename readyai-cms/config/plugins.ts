export default ({ env }) => {
  const plugins: any = {
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
          secure: true,
        },
        actionOptions: {
          upload: {
            folder: 'readyai-cms',
            use_filename: true,
            unique_filename: true,
            resource_type: 'auto',
          },
          uploadStream: {
            folder: 'readyai-cms',
            resource_type: 'auto',
          },
          delete: {},
        },
        sizeLimit: 10000000, // 10MB
      },
    },
    'content-manager': {
      config: {
        preview: {
          enabled: true,
          openTarget: 'new-tab',
          // Preview URL template - Strapi replaces {id}, {token}, {contentType} placeholders
          // Priority: STAGING_FRONTEND_URL > FRONTEND_URL > defaults
          url: (() => {
            const isProduction = env('NODE_ENV') === 'production';
            const frontendUrl = env('STAGING_FRONTEND_URL') || 
                              env('FRONTEND_URL') || 
                              (isProduction ? 'https://readyai.dev' : 'http://localhost:5173');
            return `${frontendUrl}/preview?id={id}&token={token}&contentType={contentType}`;
          })(),
        },
      },
    },
  };

  // Only add email plugin if SMTP credentials are provided
  if (env('SMTP_USER') && env('SMTP_PASS')) {
    plugins.email = {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp.office365.com'),
          port: env.int('SMTP_PORT', 587),
          secure: env.bool('SMTP_SECURE', false),
          auth: {
            user: env('SMTP_USER'),
            pass: env('SMTP_PASS'),
          },
        },
        settings: {
          defaultFrom: env('SMTP_FROM', 'Contact readyai.dev'),
          defaultReplyTo: env('SMTP_FROM', 'Contact readyai.dev'),
        },
      },
    };
  }

  return plugins;
};
