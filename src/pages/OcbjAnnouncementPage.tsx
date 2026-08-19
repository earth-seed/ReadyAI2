import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, ArrowRight, Linkedin, Download } from "lucide-react";

import {
  OCBJ_PDF_URL,
  OCBJ_TITLE,
  OCBJ_SUMMARY,
  OCBJ_IMAGE,
  OCBJ_DATE,
  OCBJ_DETAIL_PATH,
} from "../data/ocbjAnnouncement";

function formatTimestamp(dateString: string): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

const OcbjAnnouncementPage: React.FC = () => {
  const navigate = useNavigate();
  const shareUrl = `https://readyai.dev${OCBJ_DETAIL_PATH}`;

  useEffect(() => {
    document.title = `ReadyAI - ${OCBJ_TITLE}`;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>ReadyAI - {OCBJ_TITLE}</title>
        <meta name="description" content={OCBJ_SUMMARY} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={OCBJ_TITLE} />
        <meta property="og:description" content={OCBJ_SUMMARY} />
        <meta property="og:image" content={OCBJ_IMAGE} />
        <meta property="og:site_name" content="ReadyAI" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={OCBJ_TITLE} />
        <meta name="twitter:description" content={OCBJ_SUMMARY} />
        <meta name="twitter:image" content={OCBJ_IMAGE} />
        <meta property="article:published_time" content={OCBJ_DATE} />
      </Helmet>

      {/* Hero */}
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
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6">
                Announcements &amp; <span className="text-accent">Events</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Calendar className="w-4 h-4" />
            <span>{formatTimestamp(OCBJ_DATE)}</span>
            <span className="mx-2">•</span>
            <span>ReadyAI Announcements</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {OCBJ_TITLE}
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{OCBJ_SUMMARY}</p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
              Share on LinkedIn
            </a>
          </div>
        </div>

        {/* Read the full feature */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-center">
          <h2 className="font-heading text-2xl font-normal text-primary mb-3">
            Read the full feature
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Carol Eastman's recognition appears in the OCBJ 2026 Women in Business supplement.
            Download the PDF to read it in full.
          </p>
          <a
            href={OCBJ_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all shadow-sm hover:shadow-md"
          >
            <Download className="w-5 h-5" />
            Download the PDF
          </a>
        </div>

        {/* Back to Announcements */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <button
            onClick={() => navigate("/announcements")}
            className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors duration-200"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Announcements &amp; Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default OcbjAnnouncementPage;
