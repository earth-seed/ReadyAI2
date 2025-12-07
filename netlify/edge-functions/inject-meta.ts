// Netlify Edge Function to intercept /insights/* requests and inject meta tags for crawlers

// Social media crawler user agents
const CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'LinkedInBot',
  'Twitterbot',
  'WhatsApp',
  'Slackbot',
  'Applebot',
  'bingbot',
  'Googlebot',
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some(crawler => ua.includes(crawler.toLowerCase()));
}

export default async (request: Request) => {
  const url = new URL(request.url);
  
  // Only handle /insights/* routes
  if (!url.pathname.startsWith('/insights/')) {
    return;
  }

  const userAgent = request.headers.get('user-agent') || '';
  
  // Only process for crawlers - let regular users through to SPA
  if (!isCrawler(userAgent)) {
    return;
  }

  // Extract article slug
  const slug = url.pathname.split('/insights/')[1]?.split('?')[0];
  if (!slug) {
    return;
  }

  try {
    // Fetch article from Strapi
    const strapiUrl = Deno.env.get('VITE_STRAPI_URL') || Deno.env.get('STRAPI_URL') || 'https://readyai-strapi-cms.onrender.com';
    const apiUrl = `${strapiUrl}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&publicationState=live`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return; // Let it fall through to SPA
    }

    const result = await response.json();
    const articleData = result.data?.[0];
    
    if (!articleData) {
      return; // Let it fall through to SPA
    }

    // Extract article data
    const attrs = articleData.attributes || articleData;
    const title = attrs.title || 'ReadyAI Insights';
    const description = attrs.description || attrs.metaDescription || '';
    
    // Get featured image URL
    // Note: featuredImage is required in Strapi schema, so it should always exist
    let imageUrl = '';
    if (attrs.featuredImage) {
      const featuredImg = attrs.featuredImage;
      if (featuredImg.url) {
        imageUrl = featuredImg.url.startsWith('http') ? featuredImg.url : `${strapiUrl}${featuredImg.url}`;
      } else if (featuredImg.data?.attributes?.url) {
        const url = featuredImg.data.attributes.url;
        imageUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
      } else if (featuredImg.data?.url) {
        const url = featuredImg.data.url;
        imageUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
      }
    }

    const articleUrl = `https://readyai.dev${url.pathname}`;
    // Since featuredImage is required in Strapi, imageUrl should always be set
    // Fallback is defensive programming in case of API structure issues
    const defaultImage = 'https://readyai.dev/favicon.png';
    const finalImageUrl = imageUrl || defaultImage;
    const publicationDate = attrs.publicationDate || attrs.publishedAt || '';

    // Escape HTML for meta tags
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    // Generate complete HTML with meta tags (crawlers don't need the full SPA)
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${escapeHtml(articleUrl)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description.substring(0, 200))}" />
    <meta property="og:image" content="${escapeHtml(finalImageUrl)}" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    <meta property="og:site_name" content="ReadyAI" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description.substring(0, 200))}" />
    <meta name="twitter:image" content="${escapeHtml(finalImageUrl)}" />
    
    <!-- LinkedIn specific -->
    ${publicationDate ? `<meta property="article:published_time" content="${escapeHtml(publicationDate)}" />` : ''}
    
    <!-- Standard meta -->
    <meta name="description" content="${escapeHtml(description.substring(0, 160))}" />
    <title>${escapeHtml(title)} - ReadyAI</title>
    
    <!-- Redirect to actual page for browsers -->
    <meta http-equiv="refresh" content="0;url=${escapeHtml(articleUrl)}" />
    <script>window.location.href = "${escapeHtml(articleUrl)}";</script>
</head>
<body>
    <p>Redirecting to <a href="${escapeHtml(articleUrl)}">${escapeHtml(articleUrl)}</a>...</p>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error in edge function:', error);
    // Return original response on error
    return;
  }
};

