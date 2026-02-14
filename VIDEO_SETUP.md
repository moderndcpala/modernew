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

**Important:** After adding or changing any env var in Vercel, you must **Redeploy** (Deployments → ⋮ → Redeploy). The build bakes in env values; old deployments won’t see new variables.

**Option A – Base URL (one variable)**  
If all videos share the same folder and naming:

1. Upload videos to [Cloudinary](https://cloudinary.com) (e.g. folder `mdc-videos`, files `video 1.mp4` … `video 5.mp4`).
2. In Vercel → Settings → Environment Variables add:
   - `VITE_VIDEO_BASE_URL` = `https://res.cloudinary.com/your-cloud/video/upload/v1234567890/mdc-videos/`  
   (use the full path from one asset’s URL, **must end with `/`**.)
3. **Redeploy.**

**Option B – Full URL per video (use if Option A doesn’t work)**  
Cloudinary gives each asset its own version in the URL. If videos still don’t load, use the exact URL for each file from the Cloudinary Media Library:

1. In Cloudinary, open each video and copy its **URL**.
2. In Vercel → Settings → Environment Variables add:
   - `VITE_VIDEO_1_URL` = (full URL for video 1)
   - `VITE_VIDEO_2_URL` = (full URL for video 2)
   - `VITE_VIDEO_3_URL` = (full URL for video 3)
   - `VITE_VIDEO_4_URL` = (full URL for video 4)
   - `VITE_VIDEO_5_URL` = (full URL for video 5)
3. **Redeploy.**

You can mix: e.g. set only `VITE_VIDEO_1_URL` and use `VITE_VIDEO_BASE_URL` for the rest.
