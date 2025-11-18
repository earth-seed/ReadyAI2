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
 */
export const fetchArticles = async (): Promise<StrapiArticle[]> => {
  const url = `${STRAPI_URL}/api/articles?populate=*&sort=publicationDate:desc&publicationState=live`;
  
  try {
    console.log('[Strapi] Fetching articles from:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Strapi] API Error:', {
        status: response.status,
        statusText: response.statusText,
        url,
        error: errorText
      });
      
      if (response.status === 403) {
        throw new Error('API Permission Denied. Please enable "find" permission for Article in Strapi Settings → Users & Permissions → Roles → Public');
      }
      
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
    }
    
    const data: StrapiResponse<StrapiArticle> = await response.json();
    console.log('[Strapi] Received articles:', data.data?.length || 0);
    return data.data || [];
  } catch (error) {
    console.error('[Strapi] Error fetching articles:', error);
    console.error('[Strapi] Strapi URL:', STRAPI_URL);
    throw error;
  }
};

/**
 * Fetch a single article by slug
 */
export const fetchArticleBySlug = async (slug: string): Promise<StrapiArticle | null> => {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*&publicationState=live`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }
    
    const data: StrapiResponse<StrapiArticle> = await response.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}":`, error);
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

