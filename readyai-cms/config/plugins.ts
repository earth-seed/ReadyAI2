export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
        secure: true,
      },
      actionOptions: {
        upload: {
          folder: 'readyai-cms',
          use_filename: true,
          unique_filename: true,
          resource_type: 'auto',
        },
        uploadStream: {
          folder: 'readyai-cms',
          resource_type: 'auto',
        },
        delete: {},
      },
      sizeLimit: 10000000, // 10MB
    },
  },
});
