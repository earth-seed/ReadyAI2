# YouTube Shorts sync

The "Strategic Summaries" section of `/videos` lists every public Short on the
[@readyaidev](https://www.youtube.com/@readyaidev) channel. Nobody adds them by hand.

## How it works

1. `.github/workflows/sync-youtube-shorts.yml` runs daily at 22:17 UTC (and on demand).
2. It runs `scripts/sync-youtube-shorts.mjs`, which reads the channel's Shorts playlist from the
   YouTube Data API and rewrites `src/data/youtubeShorts.json`:
   - new public Shorts are added, with a URL slug made from the title (`/videos/<slug>`)
   - deleted or private Shorts are removed
   - titles and dates follow YouTube, but a slug never changes once assigned
3. If the file changed, the workflow runs the tests and the build, then commits to `master` as
   `github-actions[bot]`. Netlify deploys that push like any other.

## Changing how a Short appears on the site

Edit `src/data/youtubeShortOverrides.ts` (keyed by YouTube video ID) to show a different title or to
hide a Short. Don't edit `youtubeShorts.json` by hand, because the next sync overwrites it. The one
exception is a Short's `id`: the sync keeps whatever is there, so you can change a slug in place.

Fixing a title on YouTube itself also works; the site picks it up on the next sync.

## One-time setup

1. In [Google Cloud Console](https://console.cloud.google.com/), pick or create a project and
   enable **YouTube Data API v3** (APIs & Services → Library).
2. APIs & Services → Credentials → **Create credentials → API key**. Under API restrictions, limit it
   to YouTube Data API v3. Leave application restrictions off, because GitHub runners have no fixed IP.
3. Add it to the repo as an Actions secret named `YOUTUBE_API_KEY`
   (Settings → Secrets and variables → Actions, or `gh secret set YOUTUBE_API_KEY`).
4. Actions → **Sync YouTube Shorts** → **Run workflow** to run it once without waiting for the schedule.

A sync uses about one unit of the API's free 10,000-unit daily quota per 50 Shorts.

## Running it locally

```sh
YOUTUBE_API_KEY=... npm run sync:shorts
```

## When it fails

When a scheduled run fails, GitHub emails the person who last changed the workflow's `cron` line.
Common causes:

- **`YouTube API responded 400/403`**: the key is missing, invalid, or not allowed to use the
  YouTube Data API.
- **`YouTube API responded 404`**: YouTube stopped serving the Shorts playlist (`UUSH…`), which is
  undocumented. The site keeps its current list until the script is updated.
- **Tests fail on a duplicate id**: a new Short's slug matches a hand-written video in
  `VideosPage.tsx`. Change the Short's `id` in `youtubeShorts.json` and push.

GitHub disables scheduled workflows in public repos after 60 days without repository activity. If
that happens, re-enable it from the Actions tab.
