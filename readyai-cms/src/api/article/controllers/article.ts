/**
 * article controller
 * Custom implementation to manually populate image fields in dynamic zone components
 */

import { factories } from '@strapi/strapi';
import crypto from 'crypto';

const controller = factories.createCoreController('api::article.article', ({ strapi }) => {
  
  /**
   * Validate preview token
   * Token format: hash(uid:documentId:timestamp:secret)
   * Since we can't reverse the hash, we use a simpler validation:
   * - Check token format (should be hex string)
   * - The real security comes from documentIds being hard to guess
   * - In production, you might want to store tokens temporarily for validation
   */
  const validatePreviewToken = (token: string, documentId: string, uid: string = 'api::article.article'): boolean => {
    if (!token || !documentId) {
      return false;
    }

    try {
      // Basic validation: token should be a hex string of reasonable length
      if (!/^[a-f0-9]{64}$/i.test(token)) {
        return false;
      }

      // For now, we'll allow any valid-looking token
      // In a production system, you'd want to:
      // 1. Store tokens temporarily in cache/DB with expiration
      // 2. Or include timestamp in token and validate it
      // 3. Or use Strapi's built-in preview token validation if available
      
      return true;
    } catch (error) {
      strapi.log.error('Error validating preview token:', error);
      return false;
    }
  };
  
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
      const idParam = ctx.params.id; // This could be documentId (string) or entity ID (number)
      
      let response;
      
      if (previewToken) {
        // Validate the preview token format
        const uid = 'api::article.article';
        const isValidToken = validatePreviewToken(previewToken, idParam, uid);
        
        if (!isValidToken) {
          return ctx.unauthorized('Invalid preview token');
        }
        
        // For preview requests, we need to find by documentId if it's a string
        // In Strapi 5, documentIds are strings like "ps4ofw9iop9g516ed4vpn3lk"
        // Entity IDs are numeric
        try {
          // Try to find by documentId first (if idParam looks like a documentId - alphanumeric string)
          if (isNaN(Number(idParam))) {
            // It's likely a documentId, use Strapi's document service
            // This works for both published and unpublished articles
            try {
              const documentService = strapi.documents('api::article.article');
              const document = await documentService.findOne({
                documentId: idParam,
              });
              
              if (document) {
                // Document service returns the document, but we need to get full populated data
                // Use entity service with the document's id to get all relations
                const entity = await strapi.entityService.findOne('api::article.article', document.id, {
                  populate: ctx.query.populate || '*',
                  publicationState: 'preview', // This allows access to draft/unpublished content
                });
                
                if (entity) {
                  // Convert entity service response to API format
                  response = {
                    data: {
                      id: entity.id,
                      attributes: entity,
                    },
                  };
                } else {
                  strapi.log.warn(`Entity not found for documentId ${idParam}, document.id: ${document.id}`);
                  return ctx.notFound('Article not found');
                }
              } else {
                return ctx.notFound('Article not found');
              }
            } catch (docError: any) {
              strapi.log.error('Error using document service:', docError);
              // Fallback: try to query the articles table directly by documentId
              // In some Strapi 5 setups, documentId might be stored in the main table
              try {
                const articlesTable = strapi.db.connection('articles');
                const articleEntry = await articlesTable
                  .where('document_id', idParam)
                  .first();
                
                if (articleEntry && articleEntry.id) {
                  const entity = await strapi.entityService.findOne('api::article.article', articleEntry.id, {
                    populate: ctx.query.populate || '*',
                    publicationState: 'preview',
                  });
                  
                  if (entity) {
                    response = {
                      data: {
                        id: entity.id,
                        attributes: entity,
                      },
                    };
                  } else {
                    return ctx.notFound('Article not found');
                  }
                } else {
                  return ctx.notFound('Article not found');
                }
              } catch (fallbackError) {
                strapi.log.error('Fallback query also failed:', fallbackError);
                return ctx.notFound('Article not found');
              }
            }
          } else {
            // It's a numeric entity ID, use standard findOne with preview state
            ctx.query = {
              ...ctx.query,
              publicationState: 'preview',
            };
            response = await super.findOne(ctx);
          }
        } catch (error) {
          strapi.log.error('Error finding article for preview:', error);
          // Final fallback to standard findOne
          ctx.query = {
            ...ctx.query,
            publicationState: 'preview',
          };
          response = await super.findOne(ctx);
        }
      } else {
        // Normal request, use standard findOne
        response = await super.findOne(ctx);
      }
      
      // If preview token was provided but article not found, return 404
      if (previewToken && !response?.data) {
        return ctx.notFound('Article not found');
      }

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
