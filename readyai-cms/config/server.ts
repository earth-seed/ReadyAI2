export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', env('STRAPI_URL', '')),
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: {
    enabled: true,
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    secure: false, // Render uses HTTPS proxy but internal connection is HTTP
  },
  cron: {
    enabled: false,
  },
  admin: {
    url: env('PUBLIC_ADMIN_URL', '/admin'),
    serveAdminPanel: env.bool('SERVE_ADMIN', true),
  },
});
