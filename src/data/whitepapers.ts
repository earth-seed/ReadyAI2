// Whitepapers are hardcoded gated-content landing pages (not managed in Strapi).
// This list drives the "Whitepapers" callout section on the Insights page so the
// content is discoverable. Add a new entry here when a new whitepaper page ships.

export type Whitepaper = {
  /** Stable key for React lists */
  id: string;
  /** Title shown on the callout card (matches the landing page headline) */
  title: string;
  /** Short blurb for the callout card */
  description: string;
  /** Descriptive landing-page URL */
  url: string;
};

export const whitepapers: Whitepaper[] = [
  {
    id: 'ai-readiness-are-you-prepared',
    title: 'AI Readiness: Are You Prepared?',
    description:
      'Authored by Ashwin Rangan, this whitepaper helps enterprise leaders rethink what true AI readiness means — with a practical framework for moving from experimentation to disciplined adoption.',
    url: '/whitepapers/ai-readiness-are-you-prepared',
  },
  {
    id: 'seven-steps-to-successful-ai',
    title: 'Practical Guidance for Enterprise AI Leaders',
    description:
      'Practical insights for CIOs, CISOs, and technology leaders on adopting AI securely, meeting compliance obligations, and scaling with confidence.',
    url: '/whitepapers/seven-steps-to-successful-ai',
  },
];
