import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import WordDocViewer from "../components/sections/WordDocParser";
import { Linkedin, Sparkles, Calendar, ArrowRight, TrendingUp, BookOpen, Users, Clock } from "lucide-react";

// Firebase imports
import { getFirestore, collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { app } from "../middleware/firebase"; // your initialized firebase app
import WordDocParser from "../components/sections/WordDocParser";

const db = getFirestore(app);

type Article = {
  id: string;
  title: string;
  url: string;
  imgURL: string; // Firebase Storage URL
  docURL: string;   // Firebase Storage URL
  timestamp: Timestamp;
  description: string;
  metaKeywords: string;
};

const InsightsPage: React.FC = () => {
  const { articleName } = useParams<{ articleName: string }>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);

  // fetch metadata from Firestore
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(collection(db, "articles"), orderBy("timestamp", "desc")); 
        const snapshot = await getDocs(q);
        const docs: Article[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Article[];
        setArticles(docs);
      } catch (err) {
        console.error("Failed to fetch articles from Firestore:", err);
      }
    };
    fetchArticles();
  }, []);

  // current article from URL
  const currArticle = articles.find((a) => a.url === articleName);

  // LinkedIn share
  const shareLinkedInUrl = `https://readyai.dev/insights/${currArticle?.url}`;

  const onSelect = (path: string) => {
    navigate(path);
  };

  function formatTimestamp(ts: Timestamp | string): string {
    if (!ts) return "";

    if (ts instanceof Timestamp) {
      return ts.toDate().toLocaleDateString("en-US", {
        weekday: "short", // Tue
        month: "short",   // Sep
        day: "numeric",   // 2
        year: "numeric",  // 2025
      });
    }

    // If it's already a string, just return it
    return ts;
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
          <div className="pt-24 pb-20 md:pt-32 md:pb-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-8">
                AI Insights & <span className="text-accent">Trends</span>
              </h1>
              
              <p className="text-lg text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto">
                Expert analysis, industry trends, and strategic insights for enterprise AI adoption
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="flex items-center gap-2 text-gray-300">
                  <BookOpen className="w-5 h-5" />
                  <span>{articles.length} Articles</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-5 h-5" />
                  <span>Expert Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span>Updated Weekly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {!articleName && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

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
                    <span>{formatTimestamp(article.timestamp)}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  <button
                    onClick={() => onSelect(article.url)}
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors duration-200 group/btn"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Single Article View */}
      {currArticle && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Calendar className="w-4 h-4" />
              <span>{formatTimestamp(currArticle.timestamp)}</span>
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
          <div className="prose prose-lg max-w-none">
            <WordDocParser docPath={currArticle.docURL} />
          </div>

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

    </div>
  );
};

export default InsightsPage;