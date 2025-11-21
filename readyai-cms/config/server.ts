export default ({ env }) => {
  const port = env.int('PORT', 1337);
  const isDevelopment = env('NODE_ENV') !== 'production';
  const defaultUrl = isDevelopment 
    ? `http://localhost:${port}` 
    : 'https://readyai-strapi-cms.onrender.com';
  
  return {
    host: env('HOST', '0.0.0.0'),
    port,
    url: env('PUBLIC_URL', env('STRAPI_URL', defaultUrl)),
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: {
    koa: true, // Trust proxy headers (required for Render/Heroku/etc)
  },
  cron: {
    enabled: false,
  },
  admin: {
    url: '/admin',
    serveAdminPanel: true,
  },
  };
};
