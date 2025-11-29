import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Linkedin, Calendar, ArrowRight, BookOpen, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Strapi imports
import { fetchArticles, fetchArticleBySlug, getImageUrl } from "../utils/strapi";
import StrapiBlocksRenderer from "../components/sections/StrapiBlocksRenderer";

// Article type for display (mapped from Strapi)
type Article = {
  id: number;
  title: string;
  slug: string;
  url: string; // For routing compatibility
  imgURL: string;
  description: string;
  metaKeywords: string;
  publicationDate: string;
  content?: any[];
};

const InsightsPage: React.FC = () => {
  const { articleName } = useParams<{ articleName: string }>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles from Strapi
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const strapiArticles = await fetchArticles();
        
        // Map Strapi articles to display format
        // Handle both flat structure (Strapi 5 with populate) ssand nested attributes structure
        const mappedArticles: Article[] = strapiArticles
          .filter((article: any) => article && (article.attributes || article.title))
          .map((article: any) => {
            // Handle flat structure (direct properties) vs nested structure (attributes)
            const attrs = article.attributes || article;
            
            // Handle featuredImage - can be flat or nested
            let imgURL = '';
            if (attrs.featuredImage) {
              if (attrs.featuredImage.url) {
                // Flat structure: featuredImage.url
                imgURL = attrs.featuredImage.url;
              } else if (attrs.featuredImage.data?.attributes?.url) {
                // Nested structure: featuredImage.data.attributes.url
                imgURL = getImageUrl(attrs.featuredImage);
              } else if (attrs.featuredImage.data?.url) {
                // Alternative nested structure
                imgURL = getImageUrl({ data: { attributes: { url: attrs.featuredImage.data.url } } });
              }
            }
            
            return {
              id: article.id,
              title: attrs.title || 'Untitled',
              slug: attrs.slug || '',
              url: attrs.slug || '', // Use slug for routing
              imgURL: imgURL,
              description: attrs.description || attrs.metaDescription || '',
              metaKeywords: attrs.metaKeywords || '',
              publicationDate: attrs.publicationDate || attrs.publishedAt || '',
              content: attrs.content,
            };
          });
        
        setArticles(mappedArticles);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch articles from Strapi:", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, []);

  // Fetch single article if viewing individual article
  const [currArticle, setCurrArticle] = useState<Article | null>(null);
  
  useEffect(() => {
    if (articleName) {
      const foundArticle = articles.find((a) => a.slug === articleName || a.url === articleName);
      if (foundArticle) {
        setCurrArticle(foundArticle);
      } else {
        // Try to fetch directly from Strapi if not in list
        const loadArticle = async () => {
          try {
            const strapiArticle = await fetchArticleBySlug(articleName);
            if (strapiArticle) {
              // Handle both flat structure (direct properties) and nested structure (attributes)
              const attrs = strapiArticle.attributes || strapiArticle;
              
              // Handle featuredImage - can be flat or nested
              let imgURL = '';
              if (attrs.featuredImage) {
                const featuredImg = attrs.featuredImage as any;
                if (featuredImg.url) {
                  imgURL = featuredImg.url;
                } else if (featuredImg.data?.attributes?.url) {
                  imgURL = getImageUrl(featuredImg);
                } else if (featuredImg.data?.url) {
                  imgURL = getImageUrl({ data: { attributes: { url: featuredImg.data.url } } });
                }
              }
              
              setCurrArticle({
                id: strapiArticle.id,
                title: attrs.title || 'Untitled',
                slug: attrs.slug || '',
                url: attrs.slug || '',
                imgURL: imgURL,
                description: attrs.description || attrs.metaDescription || '',
                metaKeywords: attrs.metaKeywords || '',
                publicationDate: attrs.publicationDate || attrs.publishedAt || '',
                content: attrs.content,
              });
            }
          } catch (err) {
            console.error('Failed to fetch article:', err);
          }
        };
        loadArticle();
      }
    } else {
      setCurrArticle(null);
    }
  }, [articleName, articles]);

  // LinkedIn share
  const shareLinkedInUrl = `https://readyai.dev/insights/${currArticle?.slug || currArticle?.url}`;

  const onSelect = (slug: string) => {
    navigate(`/insights/${slug}`);
  };

  function formatTimestamp(dateString: string): string {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short", // Tue
        month: "short",   // Sep
        day: "numeric",   // 2
        year: "numeric",  // 2025
      });
    } catch (err) {
      return dateString;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Open Graph Meta */}
      {currArticle?.title ? (
        <Helmet>
          <title>ReadyAI - {currArticle.title}</title>
          <meta name="description" content={currArticle.description} />
          <meta name="keywords" content={currArticle.metaKeywords} />
          <meta property="og:title" content={currArticle.title} />
          <meta property="og:image" content={currArticle.imgURL} />
          <meta property="og:description" content={currArticle.description} />
          <meta property="og:url" content={shareLinkedInUrl} />
          <meta property="og:type" content="article" />
        </Helmet>
      ) : (
        <Helmet>
          <title>ReadyAI - Insights</title>
        </Helmet>
      )}

      {/* Modern Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-28 pb-20 md:pt-36 md:pb-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-8">
                AI Insights & <span className="text-accent">Trends</span>
              </h1>
              
              <p className="text-lg text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto">
                Expert analysis, industry trends, and strategic insights for enterprise AI adoption
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {!articleName && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading articles...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles found.</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, idx) => (
              <article
                key={article.id}
                className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                  idx === 0 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >

                {/* Article Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={article.imgURL}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatTimestamp(article.publicationDate)}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  <button
                    onClick={() => onSelect(article.slug)}
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors duration-200 group/btn"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </article>
            ))}
            </div>
          )}
        </div>
      )}

      {/* Single Article View */}
      {currArticle && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Calendar className="w-4 h-4" />
              <span>{formatTimestamp(currArticle.publicationDate)}</span>
              <span className="mx-2">•</span>
              <span>ReadyAI Insights</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {currArticle.title}
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {currArticle.description}
            </p>

            {/* Share Button */}
            <div className="flex items-center gap-4">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLinkedInUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
                Share on LinkedIn
              </a>
            </div>
          </div>

          {/* Article Image */}
          <div className="mb-12">
            <img
              src={currArticle.imgURL}
              alt={currArticle.title}
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Article Content */}
          {currArticle.content && currArticle.content.length > 0 ? (
            <StrapiBlocksRenderer content={currArticle.content} />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 italic">Content coming soon...</p>
            </div>
          )}

          {/* Back to Insights */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <button
              onClick={() => navigate('/insights')}
              className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors duration-200"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to All Insights
            </button>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-white mb-6">
            Ready to Transform Your AI Strategy?
          </h2>
          <p className="font-sans text-lg text-white/90 mb-8 leading-relaxed">
            Whether you're exploring LLM integration, AI-powered workflows, or organizational AI governance, 
            our platform can help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-sans font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl">
                Contact Our Team
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <a href="https://devs.ai/signup?ref=sales%40readyai.dev" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl">
                Explore Platform
                <ArrowRight className="w-5 h-5" />
              </button>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default InsightsPage;