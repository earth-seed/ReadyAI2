import React, { useState } from 'react';
import { PopupButton } from 'react-calendly';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import Button from './Button';

interface BookDemoCTAProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
  text?: string;
  utm?: Record<string, string>;
  prefill?: Record<string, any>;
  onTrack?: (action: string) => void;
}

const BookDemoCTA: React.FC<BookDemoCTAProps> = ({
  variant = 'primary',
  size = 'lg',
  showIcon = true,
  className = '',
  text = 'Book a Demo',
  utm,
  prefill,
  onTrack
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onTrack?.('demo_booking_clicked');
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200';
      case 'secondary':
        return 'bg-gradient-to-r from-accent to-accent-dark text-white hover:from-accent-dark hover:to-accent shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200';
      case 'outline':
        return 'border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200';
      default:
        return 'bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg font-semibold';
      default:
        return 'px-8 py-4 text-lg font-semibold';
    }
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';

  return (
    <div className="relative group">
      <PopupButton
        url="https://calendly.com/readyai-sales"
        rootElement={document.getElementById("root") as HTMLElement}
        text={text}
        className={`
          ${getVariantStyles()}
          ${getSizeStyles()}
          inline-flex items-center justify-center gap-3 rounded-lg font-medium
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        pageSettings={{
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
        }}
        utm={utm}
        prefill={prefill}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showIcon && (
          <div className="flex items-center gap-2">
            <Calendar className={`${iconSize} transition-transform duration-200 ${isHovered ? 'rotate-12' : ''}`} />
            {variant === 'primary' && (
              <Sparkles className={`${iconSize} opacity-80 animate-pulse`} />
            )}
          </div>
        )}
        <span className="flex items-center gap-2">
          {text}
          <ArrowRight className={`${iconSize} transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
        </span>
      </PopupButton>
      
      {/* Subtle glow effect for primary variant */}
      {variant === 'primary' && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-primary-dark opacity-20 blur-lg -z-10 group-hover:opacity-30 transition-opacity duration-200" />
      )}
    </div>
  );
};

export default BookDemoCTA;
