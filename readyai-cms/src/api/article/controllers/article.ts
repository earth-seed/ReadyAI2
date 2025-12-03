/**
 * article controller
 * Custom implementation to manually populate image fields in dynamic zone components
 */

import { factories } from '@strapi/strapi';

const controller = factories.createCoreController('api::article.article', ({ strapi }) => {
  
  /**
   * Helper function to populate image field in image-block components
   */
  const populateImageBlocks = async (content: any[], articleId: number) => {
    if (!content || !Array.isArray(content)) return content;

    return Promise.all(
      content.map(async (component: any) => {
        // Check if this is an image-block component without image
        if (component.__component === 'image-block.schema' && component.id && !component.image) {
          try {
            // Query via junction table to find the component entry for this article
            // In Strapi 5, the junction table uses 'cmp_id' not 'component_id'
            const junctionEntries = await strapi.db.connection('articles_cmps')
              .where('entity_id', articleId)
              .where('cmp_id', component.id)
              .select('*');

            if (junctionEntries && junctionEntries.length > 0) {
              // Query the image relation from files_related_mph table
              // In Strapi 5, media fields in components are stored in morph relation table
              const imageRelation = await strapi.db.connection('files_related_mph')
                .where('related_id', component.id)
                .where('related_type', 'image-block.schema')
                .where('field', 'image')
                .first();

              if (imageRelation?.file_id) {
                // Query the image from files table
                const imageData = await strapi.db.connection('files')
                  .where('id', imageRelation.file_id)
                  .first();

                if (imageData) {
                  // Format the image data to match Strapi's API response structure
                  component.image = {
                    data: {
                      id: imageData.id,
                      attributes: {
                        url: imageData.url,
                        alternativeText: imageData.alternativeText,
                        caption: imageData.caption,
                        width: imageData.width,
                        height: imageData.height,
                        formats: imageData.formats,
                        hash: imageData.hash,
                        ext: imageData.ext,
                        mime: imageData.mime,
                        size: imageData.size,
                        previewUrl: imageData.previewUrl,
                        provider: imageData.provider,
                        provider_metadata: imageData.provider_metadata,
                      },
                    },
                  };
                }
              }
            }
          } catch (error) {
            strapi.log.debug('Failed to populate image block:', error);
          }
        }
        return component;
      })
    );
  };

  return {
    /**
     * Override find to populate image blocks
     */
    async find(ctx: any) {
      const { data, meta } = await super.find(ctx);

      if (data && Array.isArray(data)) {
        const populatedData = await Promise.all(
          data.map(async (article: any) => {
            // Handle both flat structure (Strapi 5 with populate) and nested structure
            const content = article.attributes?.content || article.content;
            const articleId = article.id;
            
            if (content && articleId) {
              const populatedContent = await populateImageBlocks(content, articleId);
              
              // Update the content in the appropriate location
              if (article.attributes) {
                article.attributes.content = populatedContent;
              } else {
                article.content = populatedContent;
              }
            }
            return article;
          })
        );
        return { data: populatedData, meta };
      }

      return { data, meta };
    },

    /**
     * Override findOne to populate image blocks and handle preview tokens
     */
    async findOne(ctx: any) {
      // Check if this is a preview request (has token in query)
      const previewToken = ctx.query?.token;
      
      if (previewToken) {
        // For preview requests, allow access to draft content
        // Set publicationState to 'preview' to get draft content
        ctx.query = {
          ...ctx.query,
          publicationState: 'preview',
        };
      }
      
      const response = await super.findOne(ctx);

      if (response?.data) {
        const article = response.data;
        // Handle both flat structure (Strapi 5 with populate) and nested structure
        const content = article.attributes?.content || article.content;
        const articleId = article.id;
        
        if (content && articleId) {
          const populatedContent = await populateImageBlocks(content, articleId);
          
          // Update the content in the appropriate location
          if (article.attributes) {
            article.attributes.content = populatedContent;
          } else {
            article.content = populatedContent;
          }
        }
      }

      return response;
    },
  };
});

export default controller;
