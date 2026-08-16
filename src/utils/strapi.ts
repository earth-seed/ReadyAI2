/**
 * Strapi API utility functions
 */

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

export interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description?: string;
    content?: any[]; // Strapi blocks
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    metaDescription?: string;
    metaKeywords?: string;
    publicationDate?: string;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    category?: string;
  };
}

/**
 * Content category for an Article record.
 * "article" is the default; the other three power the Announcements & Events section.
 */
export type EngagementCategory = 'announcement' | 'event';
export type ArticleCategory = 'article' | EngagementCategory;

/** Categories that belong to the Announcements & Events section (i.e. NOT regular articles). */
export const ENGAGEMENT_CATEGORIES: EngagementCategory[] = ['announcement', 'event'];

/** Human-readable label for each category. */
export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  article: 'Article',
  announcement: 'Announcement',
  event: 'Event',
};

/** Article shape used by the UI after mapping from Strapi's response. */
export type MappedArticle = {
  id: number;
  title: string;
  slug: string;
  url: string;
  imgURL: string;
  description: string;
  metaKeywords: string;
  publicationDate: string;
  category: ArticleCategory;
  content?: any[];
};

/**
 * Map a raw Strapi article (flat or nested `attributes` shape) into the flat
 * `MappedArticle` used across the site. Records without a category are treated
 * as regular articles so pre-existing content keeps working.
 */
export const mapStrapiArticle = (article: any): MappedArticle => {
  const attrs = article.attributes || article;

  let imgURL = '';
  if (attrs.featuredImage) {
    if (attrs.featuredImage.url) {
      imgURL = ensureAbsoluteImageUrl(attrs.featuredImage.url);
    } else if (attrs.featuredImage.data?.attributes?.url) {
      imgURL = getImageUrl(attrs.featuredImage);
    } else if (attrs.featuredImage.data?.url) {
      imgURL = getImageUrl({ data: { attributes: { url: attrs.featuredImage.data.url } } });
    }
  }

  const category = (attrs.category as ArticleCategory) || 'article';

  return {
    id: article.id,
    title: attrs.title || 'Untitled',
    slug: attrs.slug || '',
    url: attrs.slug || '',
    imgURL,
    description: attrs.description || attrs.metaDescription || '',
    metaKeywords: attrs.metaKeywords || '',
    publicationDate: attrs.publicationDate || attrs.publishedAt || '',
    category,
    content: attrs.content,
  };
};

/**
 * Fetch all articles and return only the ones that belong to the
 * Announcements & Events section (announcements and events), newest first.
 */
export const fetchEngagements = async (): Promise<MappedArticle[]> => {
  const articles = await fetchArticles();
  return articles
    .filter((article: any) => article && (article.attributes || article.title))
    .map(mapStrapiArticle)
    .filter((a) => (ENGAGEMENT_CATEGORIES as string[]).includes(a.category));
};

export interface StrapiResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Fetch all published articles from Strapi
 * Follows Strapi 5 best practices:
 * - Uses specific populate (not *) for better performance
 * - Handles Strapi's standard response format { data: [...], meta: {...} }
 * - Proper error handling for network and API errors
 */
export const fetchArticles = async (): Promise<StrapiArticle[]> => {
  // Use populate=* which works reliably for all fields
  // Note: Media in dynamic zone components may not populate (known Strapi 5 limitation)
  const params = new URLSearchParams({
    'populate': '*',
    'sort[0]': 'publicationDate:desc',
    'publicationState': 'live',
  });
  
  const url = `${STRAPI_URL}/api/articles?${params.toString()}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Handle different error types
      if (response.status === 403) {
        throw new Error('API Permission Denied. Please enable "find" permission for Article in Strapi Settings → Users & Permissions → Roles → Public');
      }
      
      if (response.status === 404) {
        throw new Error('Articles API endpoint not found. Check Strapi configuration.');
      }
      
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}. ${errorText}`);
    }
    
    // Strapi 5 always returns { data: [...], meta: {...} } structure
    const result: any = await response.json();
    
    // Handle different possible response structures
    let articles: StrapiArticle[] = [];
    if (result.data && Array.isArray(result.data)) {
      articles = result.data;
    } else if (Array.isArray(result)) {
      articles = result;
    }
    
    return articles;
  } catch (error) {
    // Distinguish between network errors and API errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('[Strapi] Network error - check CORS and Strapi URL:', STRAPI_URL);
      throw new Error(`Cannot connect to Strapi API. Check that ${STRAPI_URL} is accessible and CORS is configured.`);
    }
    
    console.error('[Strapi] Error fetching articles:', error);
    throw error;
  }
};

/**
 * Fetch a single article by slug
 * Follows Strapi 5 best practices for filtering and population
 */
export const fetchArticleBySlug = async (slug: string): Promise<StrapiArticle | null> => {
  if (!slug) {
    throw new Error('Slug is required');
  }
  
  // Use populate=* which works reliably for all fields
  // Note: Media in dynamic zone components may not populate (known Strapi 5 limitation)
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate': '*',
    'publicationState': 'live',
  });
  
  const url = `${STRAPI_URL}/api/articles?${params.toString()}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Article not found is not an error
      }
      throw new Error(`Failed to fetch article: ${response.status} ${response.statusText}`);
    }
    
    const result: StrapiResponse<StrapiArticle> = await response.json();
    return result.data?.[0] || null;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('[Strapi] Network error fetching article:', slug);
      throw new Error(`Cannot connect to Strapi API. Check that ${STRAPI_URL} is accessible.`);
    }
    
    console.error(`[Strapi] Error fetching article with slug "${slug}":`, error);
    throw error;
  }
};

/**
 * Fetch a draft article for preview using preview token
 * Strapi 5 preview uses a token passed as a query parameter
 * The token is validated by Strapi's preview middleware
 */
export const fetchArticlePreview = async (id: string, token: string): Promise<StrapiArticle | null> => {
  if (!id || !token) {
    throw new Error('Article ID and preview token are required');
  }
  
  // Strapi 5 preview: token is passed as query param
  // Use populate=* which works reliably for all fields
  const params = new URLSearchParams({
    'populate': '*',
    'token': token,
  });
  
  const url = `${STRAPI_URL}/api/articles/${id}?${params.toString()}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid or expired preview token. Please generate a new preview link from Strapi.');
      }
      if (response.status === 404) {
        return null;
      }
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Failed to fetch preview: ${response.status} ${response.statusText}. ${errorText}`);
    }
    
    // Strapi 5 can return either nested (attributes) or flat structure with populate=*
    const result: any = await response.json();
    const article = result.data;
    
    if (!article) {
      return null;
    }
    
    // Return in consistent format (nested attributes structure)
    // If it's already flat, wrap it in attributes
    if (article.attributes) {
      return article as StrapiArticle;
    } else {
      // Convert flat structure to nested
      return {
        id: article.id,
        attributes: {
          title: article.title,
          slug: article.slug,
          description: article.description,
          content: article.content,
          featuredImage: article.featuredImage,
          metaDescription: article.metaDescription,
          metaKeywords: article.metaKeywords,
          publicationDate: article.publicationDate,
          publishedAt: article.publishedAt,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        },
      } as StrapiArticle;
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('[Strapi] Network error fetching preview:', id);
      throw new Error(`Cannot connect to Strapi API. Check that ${STRAPI_URL} is accessible.`);
    }
    
    console.error(`[Strapi] Error fetching preview for article ${id}:`, error);
    throw error;
  }
};

/**
 * Get full image URL from Strapi media object
 * Handles both Cloudinary URLs (full URLs) and local uploads (relative paths)
 */
export const getImageUrl = (image: StrapiArticle['attributes']['featuredImage']): string => {
  if (!image?.data?.attributes?.url) {
    return '';
  }
  
  const url = image.data.attributes.url;
  
  // If it's already a full URL (Cloudinary), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Otherwise, it's a relative path, prepend Strapi URL
  return `${STRAPI_URL}${url}`;
};

/**
 * Ensure an image URL is absolute (for social media sharing)
 * If the URL is relative, prepends the Strapi URL
 */
export const ensureAbsoluteImageUrl = (url: string): string => {
  if (!url) {
    return '';
  }
  
  // If it's already a full URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Otherwise, it's a relative path, prepend Strapi URL
  return `${STRAPI_URL}${url}`;
};


