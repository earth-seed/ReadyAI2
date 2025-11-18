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
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?populate=*&sort=publicationDate:desc&publicationState=live`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    
    const data: StrapiResponse<StrapiArticle> = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching articles from Strapi:', error);
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

