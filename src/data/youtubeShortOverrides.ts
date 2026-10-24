// Shorts are synced daily from the ReadyAI YouTube channel into youtubeShorts.json
// (scripts/sync-youtube-shorts.mjs) and show on the Videos page exactly as titled on
// YouTube. Add an entry here, keyed by YouTube video ID, to change that on the site.
// Don't edit youtubeShorts.json by hand; the next sync overwrites it.

export type YoutubeShortOverride = {
  /** Title shown on the site instead of the YouTube title */
  title?: string;
  /** Keep this short off the site */
  hidden?: boolean;
};

export const youtubeShortOverrides: Record<string, YoutubeShortOverride> = {
  "MCVAaSfJimw": { title: "AI Governance: The Brutal Truth Boards Ignore" },
  "xGi1AbQiI2g": { title: "Is Legacy Inertia an Asset or Detriment in AI?" },
  "OyR3kxV005w": { title: "Well Nobody Told Me, That's Not an Excuse" },
  "8_XGffXPpOY": { title: "You Have No Choice but to Pay the Bill - Unmonitored Token Usage" },
  "ggYt0Ew940Y": { title: "AI Starts at the Top — It's a Strategy, Not a Technology" },
  "DLdSwfch57E": { title: "The Board's Role in AI Strategy — Strategy Crafted with the Board" },
  "VwSaNldQVN4": { title: "90% of AI Projects Fail Today — Ashwin's Striking Stat" },
  "PftZZVGfWDo": { title: "90 Days Is Enough to Run a Measured AI Pilot" },
  "qRNeNNpGqFU": { title: "CEOs Are Reacting — Broadsword Layoffs Without Formal ROI Reporting" },
};
