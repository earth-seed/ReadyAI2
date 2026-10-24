import { describe, it, expect, vi, afterEach } from 'vitest';
import { VIDEOS } from './VideosPage';

describe('VIDEOS', () => {
  afterEach(() => {
    vi.doUnmock('../data/youtubeShorts.json');
    vi.resetModules();
  });

  // Shorts get their ids from the YouTube sync, so a new short could collide with a
  // hand-written video. This runs before the sync workflow publishes anything.
  it('gives every video a unique /videos/<id> URL', () => {
    const ids = VIDEOS.map((video) => video.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it('lists each YouTube video once', () => {
    const youtubeIds = VIDEOS.flatMap((video) => (video.youtubeId ? [video.youtubeId] : []));
    expect(youtubeIds.filter((id, i) => youtubeIds.indexOf(id) !== i)).toEqual([]);
  });

  it('shows a synced short once when it is also hand-added', async () => {
    const handAdded = VIDEOS.find((video) => video.category !== 'shorts' && video.youtubeId)!;
    vi.resetModules();
    vi.doMock('../data/youtubeShorts.json', () => ({
      default: [
        { id: 'synced-copy', youtubeId: handAdded.youtubeId, title: 'Synced copy', publishedDate: '2026-10-01T20:00:00Z' },
      ],
    }));
    const { VIDEOS: videos } = await import('./VideosPage');
    expect(videos.filter((video) => video.youtubeId === handAdded.youtubeId)).toEqual([handAdded]);
  });
});
