import React from 'react';

// Platform certifications, shown as circular seal badges in both the footer
// and the hero at the top of the home page. Single source of truth so the two
// stay in sync. Keep aligned with the compliance claims made elsewhere on the
// site (SolutionsPage, Banner3, FAQ).
export const CERTIFICATIONS: { label: string; lines: { text: string; big: boolean }[] }[] = [
  { label: 'SOC 2 Type II', lines: [{ text: 'SOC 2', big: true }, { text: 'Type II', big: false }] },
  { label: 'ISO 27001', lines: [{ text: 'ISO', big: false }, { text: '27001', big: true }] },
  { label: 'GDPR', lines: [{ text: 'GDPR', big: true }] },
  { label: 'HIPAA', lines: [{ text: 'HIPAA', big: true }] },
];

type Size = 'sm' | 'md';

const SIZES: Record<Size, { circle: string; big: string; small: string; gap: string }> = {
  md: {
    circle: 'h-24 w-24',
    big: 'text-lg',
    small: 'text-[11px]',
    gap: 'gap-6 sm:gap-10',
  },
  sm: {
    circle: 'h-16 w-16',
    big: 'text-sm',
    small: 'text-[9px]',
    gap: 'gap-4 sm:gap-6',
  },
};

interface CertificationBadgesProps {
  size?: Size;
  /** Overrides flex alignment/justify; defaults to centered. */
  className?: string;
}

const CertificationBadges: React.FC<CertificationBadgesProps> = ({
  size = 'md',
  className = 'justify-center',
}) => {
  const s = SIZES[size];
  return (
    <div className={`flex flex-wrap items-center ${s.gap} ${className}`}>
      {CERTIFICATIONS.map((cert) => (
        <div
          key={cert.label}
          role="img"
          aria-label={`${cert.label} certified`}
          className={`relative flex ${s.circle} flex-col items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary-dark text-center shadow-sm`}
        >
          {/* Gold arc across the top, echoing a certification seal */}
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full text-accent"
            aria-hidden="true"
          >
            {/* 150°-wide arc centered on the top of the circle */}
            <path
              d="M6.54 38.35 A45 45 0 0 1 93.46 38.35"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
          {cert.lines.map((line) => (
            <span
              key={line.text}
              className={
                line.big
                  ? `font-heading text-white ${s.big} font-semibold leading-none`
                  : `font-sans text-white/80 ${s.small} uppercase tracking-wide leading-tight`
              }
            >
              {line.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CertificationBadges;
