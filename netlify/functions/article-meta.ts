import { Handler, HandlerResponse } from '@netlify/functions';

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
  'Yahoo',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Sogou',
  'Exabot',
  'facebot',
  'ia_archiver',
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some(crawler => ua.includes(crawler.toLowerCase()));
}

function getImageUrl(url: string, strapiUrl: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${strapiUrl}${url}`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const handler: Handler = async (event): Promise<HandlerResponse> => {
  // Only handle GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    } as HandlerResponse;
  }

  // Extract article slug from path or query parameter first
  // Path can be: /.netlify/functions/article-meta?slug=article-slug
  // Or from path: /insights/article-slug (if routed here)
  let slug = event.queryStringParameters?.slug;
  
  // If slug is not in query params, try to extract from path
  if (!slug && event.path) {
    const pathMatch = event.path.match(/\/insights\/([^\/\?]+)/);
    if (pathMatch) {
      slug = pathMatch[1];
    }
  }
  
  if (!slug) {
    // No slug found, redirect to insights page
    return {
      statusCode: 302,
      headers: {
        Location: '/insights',
      },
    } as HandlerResponse;
  }

  const userAgent = event.headers['user-agent'] || event.headers['User-Agent'] || '';
  
  // Only process for crawlers - redirect non-crawlers to the actual page
  if (!isCrawler(userAgent)) {
    return {
      statusCode: 302,
      headers: {
        Location: `/insights/${slug}`,
      },
    } as HandlerResponse;
  }

  try {
    // Fetch article from Strapi
    // Note: In Netlify Functions, VITE_ prefixed vars are available at runtime
    const strapiUrl = process.env.VITE_STRAPI_URL || process.env.STRAPI_URL || 'https://readyai-strapi-cms.onrender.com';
    const apiUrl = `${strapiUrl}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&publicationState=live`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Article not found' }),
      } as HandlerResponse;
    }

    const result = await response.json();
    const articleData = result.data?.[0];
    
    if (!articleData) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Article not found' }),
      } as HandlerResponse;
    }

    // Extract article data (handle both flat and nested structures)
    const attrs = articleData.attributes || articleData;
    const title = attrs.title || 'ReadyAI Insights';
    const description = attrs.description || attrs.metaDescription || '';
    const publicationDate = attrs.publicationDate || attrs.publishedAt || '';
    
    // Get featured image URL
    // Note: featuredImage is required in Strapi schema, so it should always exist
    let imageUrl = '';
    if (attrs.featuredImage) {
      const featuredImg = attrs.featuredImage;
      if (featuredImg.url) {
        imageUrl = getImageUrl(featuredImg.url, strapiUrl);
      } else if (featuredImg.data?.attributes?.url) {
        imageUrl = getImageUrl(featuredImg.data.attributes.url, strapiUrl);
      } else if (featuredImg.data?.url) {
        imageUrl = getImageUrl(featuredImg.data.url, strapiUrl);
      }
    }

    // Log for debugging (will appear in Netlify function logs)
    console.log('Article meta generation:', {
      slug,
      title,
      hasImage: !!imageUrl,
      imageUrl: imageUrl ? imageUrl.substring(0, 100) : 'MISSING - featuredImage should always exist!',
      userAgent: event.headers['user-agent'] || event.headers['User-Agent'] || 'unknown',
    });

    const articleUrl = `https://readyai.dev/insights/${slug}`;
    const siteName = 'ReadyAI';

    // CRITICAL: Always include og:image tag - LinkedIn requires it
    // Since featuredImage is required in Strapi, imageUrl should always be set
    // Fallback is defensive programming in case of API structure issues
    const defaultImage = 'https://readyai.dev/favicon.png'; // Fallback (shouldn't be needed)
    const finalImageUrl = imageUrl || defaultImage;

    // Generate HTML with meta tags
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
    <meta property="og:site_name" content="${escapeHtml(siteName)}" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description.substring(0, 200))}" />
    <meta name="twitter:image" content="${escapeHtml(finalImageUrl)}" />
    
    <!-- LinkedIn specific -->
    ${publicationDate ? `<meta property="article:published_time" content="${escapeHtml(publicationDate)}" />` : ''}
    
    <!-- Standard meta -->
    <meta name="description" content="${escapeHtml(description.substring(0, 160))}" />
    <title>${escapeHtml(title)} - ${escapeHtml(siteName)}</title>
    
    <!-- Redirect to actual page -->
    <meta http-equiv="refresh" content="0;url=${escapeHtml(articleUrl)}" />
    <script>window.location.href = "${escapeHtml(articleUrl)}";</script>
</head>
<body>
    <p>Redirecting to <a href="${escapeHtml(articleUrl)}">${escapeHtml(articleUrl)}</a>...</p>
</body>
</html>`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
      body: html,
    } as HandlerResponse;
  } catch (error) {
    console.error('Error generating article meta HTML:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Internal server error' }),
    } as HandlerResponse;
  }
};

