// @vitest-environment node
import { describe, it, expect } from "vitest";
import { slugify, buildShorts } from "./sync-youtube-shorts.mjs";

function item(videoId, title, videoPublishedAt, privacyStatus = "public") {
  return { snippet: { title }, contentDetails: { videoId, videoPublishedAt }, status: { privacyStatus } };
}

describe("slugify", () => {
  it("lowercases, drops apostrophes and joins words with hyphens", () => {
    expect(slugify("CEO's are reacting — broad sword layoffs!")).toBe("ceos-are-reacting-broad-sword-layoffs");
  });

  it("strips accents", () => {
    expect(slugify("Café Données")).toBe("cafe-donnees");
  });

  it("cuts long titles at a word boundary", () => {
    const slug = slugify("word ".repeat(40));
    expect(slug.length).toBeLessThanOrEqual(80);
    expect(slug.endsWith("word")).toBe(true);
  });

  it("returns an empty string when nothing usable is left", () => {
    expect(slugify("🔥🔥🔥")).toBe("");
  });
});

describe("buildShorts", () => {
  it("keeps a short's existing id even when its title changes", () => {
    const shorts = buildShorts(
      [item("abc", "A brand new title", "2026-10-01T20:00:00Z")],
      [{ id: "original-slug", youtubeId: "abc", title: "Old title", publishedDate: "2026-10-01T20:00:00Z" }]
    );
    expect(shorts).toEqual([
      { id: "original-slug", youtubeId: "abc", title: "A brand new title", publishedDate: "2026-10-01T20:00:00Z" },
    ]);
  });

  it("slugifies new shorts and collapses whitespace in titles", () => {
    const [short] = buildShorts([item("abc", "  Data   don't lie ", "2026-10-01T20:00:00Z")], []);
    expect(short).toMatchObject({ id: "data-dont-lie", title: "Data don't lie" });
  });

  it("suffixes a new slug that collides with one already in use", () => {
    const shorts = buildShorts(
      [item("new", "Token Maxing", "2026-10-02T20:00:00Z"), item("old", "Renamed", "2026-10-01T20:00:00Z")],
      [{ id: "token-maxing", youtubeId: "old", title: "Token Maxing", publishedDate: "2026-10-01T20:00:00Z" }]
    );
    expect(shorts.map((s) => s.id)).toEqual(["token-maxing-2", "token-maxing"]);
  });

  it("falls back to the video ID when the title has no usable characters", () => {
    expect(buildShorts([item("Ab-C_1", "🔥", "2026-10-01T20:00:00Z")], [])[0].id).toBe("short-ab-c_1");
  });

  it("drops private, unlisted and not-yet-published videos", () => {
    const shorts = buildShorts(
      [
        item("pub", "Public", "2026-10-01T20:00:00Z"),
        item("priv", "Private video", undefined, "private"),
        item("unl", "Unlisted", "2026-10-01T20:00:00Z", "unlisted"),
        item("sched", "Scheduled", undefined),
      ],
      []
    );
    expect(shorts.map((s) => s.youtubeId)).toEqual(["pub"]);
  });

  it("lists a video once when the API returns it on two pages", () => {
    const shorts = buildShorts(
      [item("a", "Same short", "2026-10-01T20:00:00Z"), item("a", "Same short", "2026-10-01T20:00:00Z")],
      []
    );
    expect(shorts).toHaveLength(1);
  });

  it("drops shorts that are no longer on the channel and sorts newest first", () => {
    const shorts = buildShorts(
      [item("a", "Older", "2026-10-01T20:00:00Z"), item("b", "Newer", "2026-10-02T20:00:00Z")],
      [{ id: "gone", youtubeId: "gone", title: "Deleted", publishedDate: "2026-09-01T20:00:00Z" }]
    );
    expect(shorts.map((s) => s.youtubeId)).toEqual(["b", "a"]);
  });
});
