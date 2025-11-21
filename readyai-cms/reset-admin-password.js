/**
 * Script to reset admin password directly
 * Run: node reset-admin-password.js <email> <newPassword>
 */

const { execSync } = require('child_process');
const path = require('path');

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: node reset-admin-password.js <email> <newPassword>');
  console.error('Example: node reset-admin-password.js codeseedtech@gmail.com MyNewPassword123!');
  process.exit(1);
}

if (password.length < 6) {
  console.error('Error: Password must be at least 6 characters long');
  process.exit(1);
}

// This script will be run via Strapi console
const strapiScript = `
const email = '${email}';
const password = '${password}';

(async () => {
  try {
    const admins = await strapi.entityService.findMany('admin::user', {
      filters: { email },
      fields: ['id', 'email', 'isActive', 'blocked'],
    });

    if (admins.length === 0) {
      console.error('❌ No admin user found with email:', email);
      process.exit(1);
    }

    const admin = admins[0];
    console.log('Found admin:', admin.email);
    console.log('Current status - isActive:', admin.isActive, 'blocked:', admin.blocked);

    await strapi.admin.services.user.updateById(admin.id, {
      password: password,
      isActive: true,
      blocked: false,
    });

    console.log('✅ Password reset successfully for:', email);
    console.log('You can now log in with this email and password');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting password:', error.message);
    process.exit(1);
  }
})();
`;

// Write script to temp file
const fs = require('fs');
const tempFile = path.join(__dirname, '.temp-reset-password.js');
fs.writeFileSync(tempFile, strapiScript);

console.log('Running Strapi console to reset password...');
console.log('Email:', email);
console.log('');

try {
  execSync(`npx strapi console --file ${tempFile}`, {
    cwd: __dirname,
    stdio: 'inherit',
  });
} catch (error) {
  console.error('Failed to run script');
} finally {
  // Clean up temp file
  if (fs.existsSync(tempFile)) {
    fs.unlinkSync(tempFile);
  }
}

