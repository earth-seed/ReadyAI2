export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {
    console.log('📝 Register function called');
  },

  async bootstrap({ strapi }) {
    console.log('🚀 Bootstrap function STARTED - checking for admin user setup...');
    strapi.log.info('🚀 Bootstrap function started - checking for admin user setup...');
    
    try {
      // Check if we should create an admin user
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      console.log(`📧 ADMIN_EMAIL: ${adminEmail ? 'SET' : 'NOT SET'}`);
      console.log(`🔑 ADMIN_PASSWORD: ${adminPassword ? 'SET' : 'NOT SET'}`);
      strapi.log.info(`📧 ADMIN_EMAIL: ${adminEmail ? 'SET' : 'NOT SET'}`);
      strapi.log.info(`🔑 ADMIN_PASSWORD: ${adminPassword ? 'SET' : 'NOT SET'}`);
      
      if (!adminEmail || !adminPassword) {
        strapi.log.info('ℹ️  ADMIN_EMAIL and ADMIN_PASSWORD not set - skipping admin creation');
        console.log('ℹ️  ADMIN_EMAIL and ADMIN_PASSWORD not set - skipping admin creation');
        return;
      }
      
      // Wait a bit for services to be ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const adminUsers = await strapi.admin.services.user.count();
      
      if (adminUsers > 0) {
        strapi.log.info(`ℹ️  Admin user(s) already exist (${adminUsers} found) - skipping creation`);
        console.log(`ℹ️  Admin user(s) already exist (${adminUsers} found) - skipping creation`);
        // Log existing admin emails for reference
        const existingAdmins = await strapi.admin.services.user.findAll();
        existingAdmins.forEach((admin: any) => {
          strapi.log.info(`   - Existing admin: ${admin.email}`);
          console.log(`   - Existing admin: ${admin.email}`);
        });
        return;
      }
      
      strapi.log.info(`🔧 No admin users found. Creating admin user: ${adminEmail}`);
      console.log(`🔧 No admin users found. Creating admin user: ${adminEmail}`);
      
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
      console.log(`✅ Admin user successfully created: ${adminEmail}`);
    } catch (error: any) {
      strapi.log.error('❌ Failed to create admin user:', error);
      console.error('❌ Failed to create admin user:', error);
      console.error('Error stack:', error?.stack);
    }
    
    console.log('🏁 Bootstrap function COMPLETED');
  },
};
