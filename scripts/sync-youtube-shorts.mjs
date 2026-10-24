// Syncs src/data/youtubeShorts.json with the Shorts on the ReadyAI YouTube channel.
// Runs daily via .github/workflows/sync-youtube-shorts.yml; locally:
//   YOUTUBE_API_KEY=... npm run sync:shorts
//
// The file mirrors the channel: new public shorts are added, deleted or private ones
// dropped, and titles/dates follow YouTube. A short's `id` (its /videos/<id> URL) never
// changes once assigned, so links survive a retitle. To retitle or hide a short on the
// site, edit src/data/youtubeShortOverrides.ts rather than the JSON.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const CHANNEL_ID = "UCu7g7nkwjQQQjjX9OVLKzrw"; // youtube.com/@readyaidev
// YouTube's Shorts-only uploads playlist: the channel ID with "UC" swapped for "UUSH".
// Undocumented but stable; if it ever 404s the sync fails loudly instead of emptying the list.
const SHORTS_PLAYLIST_ID = `UUSH${CHANNEL_ID.slice(2)}`;
const OUTPUT_PATH = fileURLToPath(new URL("../src/data/youtubeShorts.json", import.meta.url));
const MAX_SLUG_LENGTH = 80;

export function slugify(title) {
  const slug = title
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (slug.length <= MAX_SLUG_LENGTH) return slug;
  const cut = slug.slice(0, MAX_SLUG_LENGTH + 1);
  return cut.slice(0, cut.lastIndexOf("-")) || slug.slice(0, MAX_SLUG_LENGTH);
}

// Turns playlistItems resources into the site's shorts list, keeping each short's
// previously assigned id. Sorted newest first.
export function buildShorts(items, previous) {
  const previousIds = new Map(previous.map((short) => [short.youtubeId, short.id]));
  // An upload landing mid-pagination shifts the pages, so the API can return a video twice.
  const seen = new Set();
  const published = items.filter((item) => {
    const { videoId, videoPublishedAt } = item.contentDetails ?? {};
    if (item.status?.privacyStatus !== "public" || !videoPublishedAt || seen.has(videoId)) return false;
    seen.add(videoId);
    return true;
  });
  const taken = new Set(
    published.map((item) => previousIds.get(item.contentDetails.videoId)).filter(Boolean)
  );

  return published
    .map((item) => {
      const youtubeId = item.contentDetails.videoId;
      const title = item.snippet.title.replace(/\s+/g, " ").trim();
      let id = previousIds.get(youtubeId);
      if (!id) {
        const base = slugify(title) || `short-${youtubeId.toLowerCase()}`;
        id = base;
        for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
        taken.add(id);
      }
      return { id, youtubeId, title, publishedDate: item.contentDetails.videoPublishedAt };
    })
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate) || a.youtubeId.localeCompare(b.youtubeId));
}

async function fetchPlaylistItems(apiKey) {
  const items = [];
  let pageToken;
  do {
    const params = new URLSearchParams({
      part: "snippet,contentDetails,status",
      playlistId: SHORTS_PLAYLIST_ID,
      maxResults: "50",
      key: apiKey,
    });
    if (pageToken) params.set("pageToken", pageToken);
    const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`);
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`YouTube API responded ${res.status}: ${body.error?.message ?? res.statusText}`);
    }
    items.push(...body.items);
    pageToken = body.nextPageToken;
  } while (pageToken);
  return items;
}

async function main() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error("YOUTUBE_API_KEY is not set.");

  const previous = JSON.parse(readFileSync(OUTPUT_PATH, "utf8"));
  const shorts = buildShorts(await fetchPlaylistItems(apiKey), previous);
  if (shorts.length === 0 && previous.length > 0) {
    throw new Error(`YouTube returned no public shorts (had ${previous.length}); leaving the list untouched.`);
  }

  writeFileSync(OUTPUT_PATH, `${JSON.stringify(shorts, null, 2)}\n`);

  const before = new Set(previous.map((short) => short.youtubeId));
  const after = new Set(shorts.map((short) => short.youtubeId));
  for (const short of shorts) if (!before.has(short.youtubeId)) console.log(`+ ${short.title}`);
  for (const short of previous) if (!after.has(short.youtubeId)) console.log(`- ${short.title}`);
  console.log(`${shorts.length} shorts in ${OUTPUT_PATH}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
