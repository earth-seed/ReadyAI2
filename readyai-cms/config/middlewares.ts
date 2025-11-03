export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
      crossOriginEmbedderPolicy: false,
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:1337',
        'http://localhost:3000',
        env('FRONTEND_URL'),
        env('PUBLIC_URL'),
      ].filter(Boolean),
      headers: [
        'Content-Type',
        'Authorization',
        'X-Frame-Options',
        'X-Requested-With',
      ],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      enabled: true,
      client: 'cookie',
      key: 'strapi.sid',
      httpOnly: true,
      maxAge: 86400000,
      overwrite: true,
      signed: true,
      rolling: false,
      renew: false,
      secure: false, // Set to false because proxy (Render) handles HTTPS
      sameSite: 'lax',
    },
  },
  'strapi::favicon',
  'strapi::public',
];
