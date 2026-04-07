import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Play, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type Video = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  publishedDate: string;
  thumbnail?: string;
};

// Videos can be managed here - add new videos to this array
const VIDEOS: Video[] = [
  // Example format:
  // {
  //   id: "1",
  //   title: "Getting Started with ReadyAI",
  //   description: "Learn how to set up and configure your AI workspace.",
  //   youtubeId: "dQw4w9WgXcQ",
  //   publishedDate: "2026-04-01",
  // },
];

const VideosPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

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
      <Helmet>
        <title>ReadyAI - Videos</title>
        <meta
          name="description"
          content="Watch videos on AI strategy, enterprise adoption, and platform demos from ReadyAI."
        />
      </Helmet>

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
                AI Insights & <span className="text-accent">Videos</span>
              </h1>

              <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
                Watch expert discussions, platform demos, and strategic insights
                for enterprise AI adoption
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Video Player */}
      {activeVideo && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{formatTimestamp(activeVideo.publishedDate)}</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {activeVideo.title}
              </h2>
              <p className="text-gray-600">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {VIDEOS.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-accent" />
            </div>
            <p className="text-gray-600 text-lg">
              Videos coming soon. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEOS.map((video) => (
              <article
                key={video.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => {
                  setActiveVideo(video);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {/* Video Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      video.thumbnail ||
                      `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                    }
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary ml-1" />
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
                    <Play className="w-4 h-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

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
