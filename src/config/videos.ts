/**
 * Video URLs - use external base URL to stay under Vercel's 100MB limit.
 * Set VITE_VIDEO_BASE_URL in Vercel env vars (e.g. Cloudinary/Bunny CDN URL).
 * For local dev with videos in public/videos/, leave empty.
 */
const BASE = import.meta.env.VITE_VIDEO_BASE_URL || '';

export const videoUrls = {
  video1: BASE ? `${BASE}video1.mp4` : '/videos/video1.mp4',
  video2: BASE ? `${BASE}video2.mp4` : '/videos/video2.mp4',
  video3: BASE ? `${BASE}video3.mp4` : '/videos/video3.mp4',
  video4: BASE ? `${BASE}video4.mp4` : '/videos/video4.mp4',
  video5: BASE ? `${BASE}video5.mp4` : '/videos/video5.mp4',
};
