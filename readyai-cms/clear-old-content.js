/**
 * Script to clear old blocks-format content from articles
 * This allows articles to work with the new dynamiczone schema
 * 
 * Run via Strapi Console:
 *   npx strapi console --file clear-old-content.js
 * 
 * Or copy-paste the code below into Strapi console:
 *   npm run console
 * 
 * WARNING: This will clear the content field of all articles!
 * Make sure you have backups or are okay with recreating content.
 */

async function clearOldContent() {

  try {
    console.log('🔍 Finding all articles...');
    
    const articles = await strapi.entityService.findMany('api::article.article', {
      fields: ['id', 'title'],
    });

    console.log(`📝 Found ${articles.length} articles`);

    if (articles.length === 0) {
      console.log('✅ No articles to process');
      return;
    }

    let cleared = 0;
    let errors = 0;

    for (const article of articles) {
      try {
        // Get the full article to check content format
        const fullArticle = await strapi.entityService.findOne('api::article.article', article.id, {
          populate: ['content'],
        });

        // Check if content exists and is in old blocks format (array of blocks)
        if (fullArticle.content && Array.isArray(fullArticle.content)) {
          const firstItem = fullArticle.content[0];
          // Old format: blocks have 'type' field, dynamic zones have '__component' field
          if (firstItem && firstItem.type && !firstItem.__component) {
            console.log(`🧹 Clearing old content from: ${article.title || article.id}`);
            
            // Clear the content field (set to null/empty)
            await strapi.entityService.update('api::article.article', article.id, {
              data: {
                content: null, // or [] for empty dynamic zone
              },
            });
            
            cleared++;
          } else {
            console.log(`✅ Article "${article.title || article.id}" already in correct format`);
          }
        } else {
          console.log(`✅ Article "${article.title || article.id}" has no content or already migrated`);
        }
      } catch (error) {
        console.error(`❌ Error processing article ${article.id}:`, error.message);
        errors++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Cleared: ${cleared} articles`);
    console.log(`   ⚠️  Errors: ${errors} articles`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Articles should now load in admin panel`);
    console.log(`   2. Edit articles to add new content using Dynamic Zone`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

// Run the script (when used in Strapi console, strapi is already available)
clearOldContent();

