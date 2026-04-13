import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Play, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

type Video = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  publishedDate: string;
};

export const VIDEOS: Video[] = [
  {
    id: "implementing-ai-securely",
    title: "How to Implement AI Securely Inside Your Organization",
    description:
      "Learn strategies for deploying artificial intelligence systems within your organization while maintaining robust security protocols and governance frameworks. This video covers the ReadyAI Enterprise Platform and how it helps teams adopt AI with confidence, compliance, and control.",
    youtubeId: "kE-lmHTwRJI",
    publishedDate: "2026-04-01",
  },
];

const VideosPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();

  const currVideo = videoId ? VIDEOS.find((v) => v.id === videoId) : null;

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
    } catch {
      return dateString;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Meta */}
      {currVideo ? (
        <Helmet>
          <title>ReadyAI - {currVideo.title}</title>
          <meta name="description" content={currVideo.description} />
          <meta property="og:type" content="video" />
          <meta property="og:url" content={`https://readyai.dev/videos/${currVideo.id}`} />
          <meta property="og:title" content={currVideo.title} />
          <meta property="og:description" content={currVideo.description} />
          <meta property="og:image" content={`https://img.youtube.com/vi/${currVideo.youtubeId}/maxresdefault.jpg`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={currVideo.title} />
          <meta name="twitter:description" content={currVideo.description} />
          <meta name="twitter:image" content={`https://img.youtube.com/vi/${currVideo.youtubeId}/maxresdefault.jpg`} />
        </Helmet>
      ) : (
        <Helmet>
          <title>ReadyAI - Videos</title>
          <meta
            name="description"
            content="Watch videos on enterprise AI adoption, security, and strategy from the ReadyAI team."
          />
        </Helmet>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-28 pb-14 md:pt-36 md:pb-18">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-6">
                AI Videos & <span className="text-accent">Demos</span>
              </h1>
              <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
                Watch expert walkthroughs, platform demos, and strategic insights
                for enterprise AI adoption
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Grid (list view) */}
      {!videoId && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {VIDEOS.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No videos found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VIDEOS.map((video) => (
                <article
                  key={video.id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                  onClick={() => navigate(`/videos/${video.id}`)}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Video Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{formatTimestamp(video.publishedDate)}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                      {video.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {video.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-accent font-semibold group-hover:text-accent-dark transition-colors duration-200">
                      Watch Video
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Single Video View */}
      {currVideo && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Video Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Calendar className="w-4 h-4" />
              <span>{formatTimestamp(currVideo.publishedDate)}</span>
              <span className="mx-2">•</span>
              <span>ReadyAI Videos</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {currVideo.title}
            </h1>
          </div>

          {/* Video Player */}
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${currVideo.youtubeId}?rel=0&modestbranding=1`}
                title={currVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-gray-600 leading-relaxed">
              {currVideo.description}
            </p>
          </div>

          {/* Back to Videos */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <button
              onClick={() => navigate("/videos")}
              className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors duration-200"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to All Videos
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
            Whether you're exploring LLM integration, AI-powered workflows, or
            organizational AI governance, our platform can help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-sans font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl">
                Contact Our Team
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <a
              href="https://devs.ai/signup?ref=sales%40readyai.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
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

export default VideosPage;
