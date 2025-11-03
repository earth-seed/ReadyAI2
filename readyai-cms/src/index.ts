export default {
  register() {},

  async bootstrap({ strapi }) {
    console.log('=== BOOTSTRAP RUNNING ===');
    
    // Wait for admin services to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const count = await strapi.admin.services.user.count();
      console.log(`Current admin users: ${count}`);
      
      if (count > 0) {
        const existingAdmins = await strapi.entityService.findMany('admin::user', {
          fields: ['email', 'firstname', 'lastname'],
        });
        console.log('=== EXISTING ADMIN USERS ===');
        existingAdmins.forEach((admin: any) => {
          console.log(`Email: ${admin.email}, Firstname: ${admin.firstname}, Lastname: ${admin.lastname}`);
        });
        console.log('============================');
      }
      
      // Only reset/create admin if ADMIN_PASSWORD is set
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        console.log('ADMIN_PASSWORD not set - skipping password reset/admin creation');
        return;
      }
      
      const adminEmail = process.env.ADMIN_EMAIL || 'codeseedreadyai@gmail.com';
      
      // Find existing admin with this email
      const existingAdmins = await strapi.entityService.findMany('admin::user', {
        filters: { email: adminEmail },
        fields: ['id', 'email'],
      });
      
      if (existingAdmins.length > 0) {
        const admin = existingAdmins[0];
        console.log(`Found admin user: ${admin.email}`);
        console.log('Resetting password...');
        
        // Update the password
        await strapi.admin.services.user.updateById(admin.id, {
          password: adminPassword,
        });
        
        console.log(`✅ Password reset for ${adminEmail}`);
      } else {
        console.log(`No admin found with email: ${adminEmail}`);
        console.log('Creating new admin user...');
        
        // Create new admin if doesn't exist
        const role = await strapi.admin.services.role.findSuperAdmin();
        await strapi.admin.services.user.create({
          email: adminEmail,
          password: adminPassword,
          firstname: process.env.ADMIN_FIRSTNAME || 'Admin',
          lastname: process.env.ADMIN_LASTNAME || 'User',
          isActive: true,
          roles: [role.id],
        });
        console.log(`✅ Admin created: ${adminEmail}`);
      }
    } catch (error) {
      console.error('Bootstrap error:', error);
    }
  },
};
