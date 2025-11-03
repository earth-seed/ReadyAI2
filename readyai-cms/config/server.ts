export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: {
    enabled: true,
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
  },
  cron: {
    enabled: false,
  },
  admin: {
    url: env('PUBLIC_ADMIN_URL', '/admin'),
    serveAdminPanel: env.bool('SERVE_ADMIN', true),
  },
  cookie: {
    secure: env.bool('COOKIE_SECURE', false), // Set to true only if using HTTPS
    sameSite: 'lax',
  },
});
