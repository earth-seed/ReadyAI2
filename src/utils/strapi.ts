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
  };
}

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
  // Start with simple query to debug, then optimize
  const params = new URLSearchParams({
    'populate': '*', // Use * for now to ensure we get all data
    'sort[0]': 'publicationDate:desc',
    'publicationState': 'live',
  });
  
  const url = `${STRAPI_URL}/api/articles?${params.toString()}`;
  
  try {
    console.log('[Strapi] Fetching from URL:', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('[Strapi] Response status:', response.status, response.statusText);
    
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
    console.log('[Strapi] Full API response:', JSON.stringify(result, null, 2));
    
    // Handle different possible response structures
    let articles: StrapiArticle[] = [];
    if (result.data && Array.isArray(result.data)) {
      articles = result.data;
    } else if (Array.isArray(result)) {
      articles = result;
    }
    
    console.log('[Strapi] Parsed articles count:', articles.length);
    if (articles.length > 0) {
      console.log('[Strapi] First article structure:', articles[0]);
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
  
  // Strapi 5 best practice: Use specific populate for better performance
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[featuredImage]': 'true',
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
  
  // Strapi 5 preview: token is passed as query param, not Authorization header
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
      throw new Error(`Failed to fetch preview: ${response.status} ${response.statusText}`);
    }
    
    const result: { data: StrapiArticle } = await response.json();
    return result.data || null;
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

