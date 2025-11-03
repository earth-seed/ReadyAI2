#!/usr/bin/env node

// Environment Switcher for ReadyAI Strapi CMS
// Usage: node switch-env.js [local|staging|production]

const fs = require('fs');
const path = require('path');

const environment = process.argv[2] || 'local';

const configs = {
  local: {
    DATABASE_CLIENT: 'sqlite',
    NODE_ENV: 'development',
    HOST: '0.0.0.0',
    PORT: '1337'
  },
  staging: {
    DATABASE_CLIENT: 'postgres',
    NODE_ENV: 'production',
    HOST: '0.0.0.0',
    PORT: '10000'
  },
  production: {
    DATABASE_CLIENT: 'postgres',
    NODE_ENV: 'production',
    HOST: '0.0.0.0',
    PORT: '10000'
  }
};

const config = configs[environment];

if (!config) {
  console.error('❌ Invalid environment. Use: local, staging, or production');
  process.exit(1);
}

console.log(`🔄 Switching to ${environment} environment...`);

// Update database.ts
const databasePath = path.join(__dirname, 'config', 'database.ts');
let databaseContent = fs.readFileSync(databasePath, 'utf8');

databaseContent = databaseContent.replace(
  /const client = env\('DATABASE_CLIENT', '[^']+'\);/,
  `const client = env('DATABASE_CLIENT', '${config.DATABASE_CLIENT}');`
);

fs.writeFileSync(databasePath, databaseContent);

console.log(`✅ Switched to ${environment} environment`);
console.log(`📊 Database: ${config.DATABASE_CLIENT}`);
console.log(`🌍 Environment: ${config.NODE_ENV}`);
console.log(`🚀 Port: ${config.PORT}`);

if (environment === 'local') {
  console.log('\n💡 To start development:');
  console.log('   npm run develop');
} else {
  console.log('\n💡 To deploy:');
  console.log('   git add .');
  console.log('   git commit -m "Switch to ' + environment + ' config"');
  console.log('   git push');
}
