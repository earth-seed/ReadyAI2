import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FloatingButton from "../utils/FloatingButton";
import { Helmet } from "react-helmet";
import WordDocViewer from "../components/sections/WordDocParser";
import { Linkedin, Sparkles } from "lucide-react";

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
    <div>
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

      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-10 md:pt-24 md:pb-14">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Insights</span>
                <span className="block text-2xl mt-4 text-accent">
                  Industry insights and trends
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Articles list OR single article */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-left">
          {!articleName && (
            <div className="text-center">
              <h2 className="inline-block text-4xl text-gray-700 mb-20 mt-20 tracking-widest border-b-2 border-dotted border-gray-400 pb-2">
                Latest Posts
              </h2>
            </div>

          )}

          {/* List view */}
          {!articleName && (
            <ul className="text-xl mb-20">
              {articles.map((article, idx) => (
                <li
                  key={article.id}
                  className={`p-10 mb-10 ${
                    idx === 0 ? "shadow-lg rounded- mb-20" : ""
                  }`}
                >
                  {/* Badge row */}
                  {idx === 0 && (
                    <div className="mb-12">
                      <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full shadow text-xs font-bold">
                        <Sparkles className="w-4 h-4 text-white" />
                        Latest
                      </span>
                    </div>
                  )}

                  {/* Content row (image + text) */}
                  <div className="flex items-start space-x-4">
                    <img
                      src={article.imgURL}
                      alt={article.title}
                      className="w-40 h-20 object-cover rounded flex-shrink-0"
                    />
                    <div>
                      <button
                        className="text-blue-600 underline hover:text-blue-800 block text-left"
                        onClick={() => onSelect(article.url)}
                      >
                        {article.title}
                      </button>
                      <p className="text-gray-600 text-base mt-4 mb-1 italic">
                        {formatTimestamp(article.timestamp)}
                      </p>
                      <p className="text-gray-600 text-base mt-1">{article.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

          )}

          {/* Single article view */}
          {currArticle && (
            <>
              <WordDocViewer docPath={currArticle.doc} />
              <h2 className="text-4xl text-gray-700 mb-16 text-center">
                {currArticle.title}
              </h2>

              <div className="flex flex-col min-h-screen text-xl leading-loose tracking-widest">
                <img
                  src={currArticle.imgURL}
                  alt={currArticle.title}
                  className="object-cover w-full h-64 mb-2 rounded-lg mx-auto flex-shrink-0"
                />

                <div className="grid grid-cols-2 gap-2 mb-20">
                  <p className="text-sm md:text-base leading-none">
                    {formatTimestamp(currArticle.timestamp)}
                  </p>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLinkedInUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 text-sm md:text-base leading-none justify-end"
                  >
                    <span>Share:</span>
                    <Linkedin color="#0077b5" className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                </div>

                {/* Parse and display Word doc from Firebase Storage */}
                <WordDocParser docPath={currArticle.docURL} />
              </div>
            </>
          )}
        </div>
      </div>

      <FloatingButton
        url="https://devs.ai/signup?ref=sales%40readyai.dev"
        label="Explore Platform"
      />
    </div>
  );
};

export default InsightsPage;