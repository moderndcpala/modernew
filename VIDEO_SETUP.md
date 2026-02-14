# Video Setup for Vercel Deployment

## Problem
Vercel's Hobby plan has a **100 MB deployment limit**. The videos (~150 MB) exceeded this, causing the site to fail to load.

## Solution Applied
Videos are now **excluded from the deployment**. The build is ~10 MB and will deploy successfully.

## Getting Videos to Work

### Option 1: Local Development
Copy your videos to `public/videos/` with these names:
- `video1.mp4` (main/facility tour)
- `video2.mp4` through `video5.mp4`

### Option 2: Vercel (Production)
Host videos on a free CDN, then set the base URL in Vercel:

1. **Upload videos** to [Cloudinary](https://cloudinary.com) or [Bunny.net](https://bunny.net) (free tiers available)
2. Get the base URL (e.g. `https://res.cloudinary.com/your-cloud/video/upload/`)
3. In **Vercel Dashboard** → Your Project → Settings → Environment Variables:
   - Add `VITE_VIDEO_BASE_URL` = `https://your-cdn-url/` (must end with `/`)
4. Redeploy

Video files must be named: `video1.mp4`, `video2.mp4`, etc.
