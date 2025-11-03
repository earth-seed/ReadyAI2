export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:1337',
        'http://localhost:3000',
        'https://res.cloudinary.com',
        env('FRONTEND_URL', 'http://localhost:3000'),
        // Add your production frontend URL here or via env variable
      ].filter(Boolean),
      headers: ['Content-Type', 'Authorization', 'X-Frame-Options'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      secure: false, // Render proxy handles HTTPS
      httpOnly: true,
      sameSite: 'lax',
    },
  },
  'strapi::favicon',
  'strapi::public',
];
