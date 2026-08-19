import type { MappedArticle } from "../utils/strapi";

/**
 * Hardcoded OCBJ "Women in Business 2026" announcement (Carol Eastman).
 *
 * Unlike CMS engagements this isn't stored in Strapi, so it lives here and is
 * injected into the Announcements list. It has its own detail page (like every
 * other announcement) which hosts the link to download the OCBJ PDF supplement.
 */

// Deep-linked to physical page 66 (printed "B-78") — the ReadyAI / Carol Eastman writeup.
export const OCBJ_PDF_URL =
  "https://d27xrzeiyowx7g.cloudfront.net/wp-content/uploads/2026/08/WIB-2026-supplement.pdf#page=66";

export const OCBJ_SLUG = "ocbj-women-in-business-2026";
export const OCBJ_DETAIL_PATH = `/announcements/${OCBJ_SLUG}`;

export const OCBJ_TITLE = "CEO Carol Eastman Featured in OCBJ's 2026 Women in Business Issue";

export const OCBJ_SUMMARY =
  "ReadyAI.dev CEO Carol Eastman has been named to the Orange County Business Journal's prestigious 2026 Women in Business issue — a recognition reserved for Southern California's most exceptional women in business. A proven technology executive with two successful company exits, Carol brings rare depth, credibility, and vision to the enterprise AI space. This honor reflects the caliber of leadership driving ReadyAI forward.";

export const OCBJ_IMAGE = "/assets/images/carol-eastman.png";
export const OCBJ_DATE = "2026-08-17";

// Card model used by the Announcements list. `detailPath` routes the card to the
// dedicated detail page instead of the default /insights/{slug} route.
export const OCBJ_ANNOUNCEMENT: MappedArticle = {
  id: -1, // sentinel; hardcoded item, won't collide with Strapi ids
  title: OCBJ_TITLE,
  slug: OCBJ_SLUG,
  url: OCBJ_SLUG,
  imgURL: OCBJ_IMAGE,
  description: OCBJ_SUMMARY,
  metaKeywords: "",
  publicationDate: OCBJ_DATE,
  category: "announcement",
  detailPath: OCBJ_DETAIL_PATH,
};
