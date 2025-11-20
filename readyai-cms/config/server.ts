export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', env('STRAPI_URL', 'https://readyai-strapi-cms.onrender.com')),
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
});
