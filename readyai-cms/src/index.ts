export default {
  register() {},

  async bootstrap({ strapi }) {
    // Simple test first - does bootstrap run at all?
    console.log('=== BOOTSTRAP RUNNING ===');
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminEmail || !adminPassword) {
      console.log('ADMIN_EMAIL or ADMIN_PASSWORD not set - skipping');
      return;
    }
    
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
      
      if (count === 0) {
        const role = await strapi.admin.services.role.findSuperAdmin();
        await strapi.admin.services.user.create({
          email: adminEmail,
          password: adminPassword,
          firstname: process.env.ADMIN_FIRSTNAME || 'Admin',
          lastname: process.env.ADMIN_LASTNAME || 'User',
          isActive: true,
          roles: [role.id],
        });
        console.log(`Admin created: ${adminEmail}`);
      }
    } catch (error) {
      console.error('Bootstrap error:', error);
    }
  },
};
