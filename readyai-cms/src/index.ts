export default {
  register() {},

  async bootstrap({ strapi }) {
    // Wait for admin services to be ready
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const count = await strapi.admin.services.user.count();
      strapi.log.info(`[Bootstrap] Admin users count: ${count}`);

      if (count > 0) {
        const existingAdmins = await strapi.entityService.findMany('admin::user', {
          fields: ['email', 'firstname', 'lastname'],
        });
        strapi.log.info('[Bootstrap] Existing admin users:');
        existingAdmins.forEach((admin: any) => {
          strapi.log.info(`  - ${admin.email} (${admin.firstname} ${admin.lastname})`);
        });
      }

      // Only reset/create admin if ADMIN_PASSWORD is set
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        strapi.log.info('[Bootstrap] ADMIN_PASSWORD not set - skipping admin operations');
        return;
      }

      const adminEmail = process.env.ADMIN_EMAIL || 'codeseedreadyai@gmail.com';
      strapi.log.info(`[Bootstrap] Attempting to reset password for: ${adminEmail}`);
      strapi.log.info(`[Bootstrap] Password length: ${adminPassword.length} characters`);

      // Find existing admin with this email
      const matchingAdmins = await strapi.entityService.findMany('admin::user', {
        filters: { email: adminEmail },
        fields: ['id', 'email'],
      });

      if (matchingAdmins.length > 0) {
        const admin = matchingAdmins[0];
        strapi.log.info(`[Bootstrap] Found admin user: ${admin.email}`);
        strapi.log.info('[Bootstrap] Resetting password and ensuring user is active...');

        // Update the password and ensure user is active and not blocked
        await strapi.admin.services.user.updateById(admin.id, {
          password: adminPassword,
          isActive: true,
          blocked: false,
        });

        strapi.log.info(`[Bootstrap] ✅ Password reset for ${adminEmail}`);
        strapi.log.info(`[Bootstrap] You can now log in with email: ${adminEmail}`);
      } else {
        strapi.log.info(`[Bootstrap] No admin found with email: ${adminEmail}`);
        strapi.log.info('[Bootstrap] Creating new admin user...');

        // Find super admin role by code
        const superAdminRole = await strapi.entityService.findMany('admin::role', {
          filters: { code: 'strapi-super-admin' },
          fields: ['id'],
        });

        if (!superAdminRole || superAdminRole.length === 0) {
          throw new Error('[Bootstrap] Super admin role not found');
        }

        // Create admin using admin service
        await strapi.admin.services.user.create({
          email: adminEmail,
          password: adminPassword,
          firstname: process.env.ADMIN_FIRSTNAME || 'Admin',
          lastname: process.env.ADMIN_LASTNAME || 'User',
          isActive: true,
          roles: [superAdminRole[0].id],
        });

        strapi.log.info(`[Bootstrap] ✅ Admin created: ${adminEmail}`);
      }
    } catch (error) {
      strapi.log.error('[Bootstrap] Error:', error);
      throw error;
    }
  },
};
