import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BEN_MARSHALL_ARTICLE_HTML, BEN_MARSHALL_ATTRIBUTION } from '../../data/benMarshallArticle';

interface BenMarshallArticleOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const BenMarshallArticleOverlay: React.FC<BenMarshallArticleOverlayProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Enterprise Internal AI Licensing in Focus"
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <p className="font-sans text-sm text-primary-light">
            By {BEN_MARSHALL_ATTRIBUTION}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Article body */}
        <div className="px-4 sm:px-6 py-6 pb-12 max-h-[calc(100vh-12rem)] overflow-y-auto">
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: BEN_MARSHALL_ARTICLE_HTML }}
          />
        </div>
      </div>
    </div>
  );
};

export default BenMarshallArticleOverlay;
