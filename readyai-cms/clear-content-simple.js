// Script to clear article content using database service (bypasses validation)
// Copy and paste this into Strapi console (npm run console)

(async () => {
  try {
    // Use database service directly to avoid content field validation
    const db = strapi.db;
    
    // Get article IDs
    const articles = await db.query('api::article.article').findMany({
      select: ['id', 'title'],
    });
    
    console.log(`Found ${articles.length} articles`);
    
    // Clear content using database query builder (bypasses entity service validation)
    for (const article of articles) {
      try {
        // Delete any existing component entries for this article's content
        await db.query('api::article.article').update({
          where: { id: article.id },
          data: {},
        });
        
        // Clear the articles_cmps table entries for this article
        await db.connection('articles_cmps').where('entity_id', article.id).del();
        
        console.log(`✅ Cleared content for: ${article.title || article.id}`);
      } catch (error) {
        console.error(`❌ Error with ${article.id}:`, error.message);
      }
    }
    
    console.log('Done! Restart Strapi and articles should load.');
  } catch (error) {
    console.error('Fatal error:', error.message);
    console.error(error);
  }
})();

