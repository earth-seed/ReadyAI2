export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }) {
    // Check if we should create an admin user
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminEmail || !adminPassword) {
      strapi.log.info('ℹ️  ADMIN_EMAIL and ADMIN_PASSWORD not set - skipping admin creation');
      return;
    }
    
    try {
      const adminUsers = await strapi.admin.services.user.count();
      
      if (adminUsers > 0) {
        strapi.log.info(`ℹ️  Admin user(s) already exist (${adminUsers} found) - skipping creation`);
        // Log existing admin emails for reference
        const existingAdmins = await strapi.admin.services.user.findAll();
        existingAdmins.forEach((admin: any) => {
          strapi.log.info(`   - Existing admin: ${admin.email}`);
        });
        return;
      }
      
      strapi.log.info(`🔧 No admin users found. Creating admin user: ${adminEmail}`);
      
      // Get Super Admin role
      const superAdminRole = await strapi.admin.services.role.findSuperAdmin();
      
      // Create admin user
      await strapi.admin.services.user.create({
        email: adminEmail,
        password: adminPassword,
        firstname: process.env.ADMIN_FIRSTNAME || 'Admin',
        lastname: process.env.ADMIN_LASTNAME || 'User',
        registrationToken: null,
        isActive: true,
        blocked: false,
        roles: [superAdminRole.id],
      });
      
      strapi.log.info(`✅ Admin user successfully created: ${adminEmail}`);
    } catch (error) {
      strapi.log.error('❌ Failed to create admin user:', error);
    }
  },
};
