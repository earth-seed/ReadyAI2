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
  // Strapi 5 best practice: Use specific populate instead of * for better performance
  // Format: populate[fieldName]=true or populate[fieldName][fields][0]=field
  const params = new URLSearchParams({
    'populate[featuredImage]': 'true',
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
    const result: StrapiResponse<StrapiArticle> = await response.json();
    
    if (!result.data || !Array.isArray(result.data)) {
      console.warn('[Strapi] Unexpected response structure:', result);
      return [];
    }
    
    return result.data;
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

