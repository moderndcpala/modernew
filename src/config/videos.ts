/**
 * Video URLs - use external base URL to stay under Vercel's 100MB limit.
 *
 * Setup:
 * - Set VITE_VIDEO_BASE_URL in Vercel env vars (e.g. Cloudinary base URL).
 * - Base URL must end with / (e.g. https://res.cloudinary.com/xxx/video/upload/).
 * - For local dev with videos in public/videos/, leave empty.
 *
 * Videos are used with <source src={url} type="video/mp4" /> so the browser
 * gets an explicit MIME type (fixes "no video with supported type and mime found").
 */
const raw = (import.meta.env.VITE_VIDEO_BASE_URL || '').trim();
const BASE = raw ? (raw.endsWith('/') ? raw : `${raw}/`) : '';

export const videoBaseUrl = BASE; // '' = local /videos/, else Cloudinary or other CDN

// Cloudinary folder uses "video 1.mp4" … "video 5.mp4" (space in name); local uses video1.mp4 etc.
export const videoUrls = {
  video1: BASE ? `${BASE}${encodeURIComponent('video 1.mp4')}` : '/videos/video1.mp4',
  video2: BASE ? `${BASE}${encodeURIComponent('video 2.mp4')}` : '/videos/video2.mp4',
  video3: BASE ? `${BASE}${encodeURIComponent('video 3.mp4')}` : '/videos/video3.mp4',
  video4: BASE ? `${BASE}${encodeURIComponent('video 4.mp4')}` : '/videos/video4.mp4',
  video5: BASE ? `${BASE}${encodeURIComponent('video 5.mp4')}` : '/videos/video5.mp4',
};
