/**
 * Video URLs - use external base URL or full URLs per video (Vercel 100MB limit).
 *
 * Option A – Base URL (one env var):
 *   VITE_VIDEO_BASE_URL = https://res.cloudinary.com/xxx/video/upload/v1234567890/mdc-videos/
 *   (must end with /). Each video = base + "video 1.mp4" … "video 5.mp4".
 *
 * Option B – Full URL per video (use if base URL doesn’t work; Cloudinary version is per-asset):
 *   VITE_VIDEO_1_URL, VITE_VIDEO_2_URL, … VITE_VIDEO_5_URL = full Cloudinary URL for each file.
 *
 * Local: leave all empty → uses public/videos/video1.mp4 … video5.mp4.
 * After changing env vars in Vercel you must redeploy (build bakes in the values).
 */
const rawBase = (import.meta.env.VITE_VIDEO_BASE_URL || '').trim();
const BASE = rawBase ? (rawBase.endsWith('/') ? rawBase : `${rawBase}/`) : '';

// Per-video full URLs (reference each so Vite inlines them at build time)
const url1 = (import.meta.env.VITE_VIDEO_1_URL || '').trim();
const url2 = (import.meta.env.VITE_VIDEO_2_URL || '').trim();
const url3 = (import.meta.env.VITE_VIDEO_3_URL || '').trim();
const url4 = (import.meta.env.VITE_VIDEO_4_URL || '').trim();
const url5 = (import.meta.env.VITE_VIDEO_5_URL || '').trim();

export const videoBaseUrl = BASE;

const cloudFile = (name: string) => `${BASE}${encodeURIComponent(name)}`;

export const videoUrls = {
  video1: url1 || (BASE ? cloudFile('video 1.mp4') : '/videos/video1.mp4'),
  video2: url2 || (BASE ? cloudFile('video 2.mp4') : '/videos/video2.mp4'),
  video3: url3 || (BASE ? cloudFile('video 3.mp4') : '/videos/video3.mp4'),
  video4: url4 || (BASE ? cloudFile('video 4.mp4') : '/videos/video4.mp4'),
  video5: url5 || (BASE ? cloudFile('video 5.mp4') : '/videos/video5.mp4'),
};
