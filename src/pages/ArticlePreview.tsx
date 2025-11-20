import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Linkedin, Calendar, ArrowRight } from "lucide-react";
import { fetchArticlePreview, getImageUrl, type StrapiArticle } from "../utils/strapi";
import StrapiBlocksRenderer from "../components/sections/StrapiBlocksRenderer";

type Article = {
  id: number;
  title: string;
  slug: string;
  url: string;
  imgURL: string;
  description: string;
  metaKeywords: string;
  publicationDate: string;
  content?: any[];
};

const ArticlePreview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreview = async () => {
      const token = searchParams.get('token');
      const contentType = searchParams.get('contentType');
      const id = searchParams.get('id');

      if (!token || !contentType || !id) {
        setError('Missing preview parameters. Please use the preview button in Strapi admin.');
        setLoading(false);
        return;
      }

      // Verify it's an article preview
      if (contentType !== 'api::article.article') {
        setError('Invalid content type for preview.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const strapiArticle = await fetchArticlePreview(id, token);
        
        if (!strapiArticle) {
          setError('Article not found or preview token is invalid.');
          setLoading(false);
          return;
        }

        setArticle({
          id: strapiArticle.id,
          title: strapiArticle.attributes.title,
          slug: strapiArticle.attributes.slug,
          url: strapiArticle.attributes.slug,
          imgURL: getImageUrl(strapiArticle.attributes.featuredImage),
          description: strapiArticle.attributes.description || strapiArticle.attributes.metaDescription || '',
          metaKeywords: strapiArticle.attributes.metaKeywords || '',
          publicationDate: strapiArticle.attributes.publicationDate || strapiArticle.attributes.publishedAt || '',
          content: strapiArticle.attributes.content,
        });
        setError(null);
      } catch (err: any) {
        console.error('Failed to load preview:', err);
        setError(err.message || 'Failed to load article preview.');
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, [searchParams]);

  const shareLinkedInUrl = article ? `https://readyai.dev/insights/${article.slug}` : '';

  function formatTimestamp(dateString: string): string {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (err) {
      return dateString;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/insights')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Back to Insights
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Banner */}
      <div className="bg-yellow-500 text-white text-center py-2 px-4">
        <p className="text-sm font-semibold">
          🔍 PREVIEW MODE - This is a draft article. Changes are not yet published.
        </p>
      </div>

      {/* Open Graph Meta */}
      <Helmet>
        <title>ReadyAI - {article.title} (Preview)</title>
        <meta name="description" content={article.description} />
        <meta name="keywords" content={article.metaKeywords} />
        <meta property="og:title" content={article.title} />
        <meta property="og:image" content={article.imgURL} />
        <meta property="og:description" content={article.description} />
        <meta property="og:url" content={shareLinkedInUrl} />
        <meta property="og:type" content="article" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Article Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Calendar className="w-4 h-4" />
            <span>{formatTimestamp(article.publicationDate)}</span>
            <span className="mx-2">•</span>
            <span>ReadyAI Insights</span>
            <span className="mx-2">•</span>
            <span className="text-yellow-600 font-semibold">DRAFT</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {article.description}
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
        {article.imgURL && (
          <div className="mb-12">
            <img
              src={article.imgURL}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        {article.content && article.content.length > 0 ? (
          <StrapiBlocksRenderer blocks={article.content} />
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
    </div>
  );
};

export default ArticlePreview;

