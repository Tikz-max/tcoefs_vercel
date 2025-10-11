# TCoEFS Admin Dashboard Setup Guide

## 🎯 Purpose

This admin dashboard allows non-technical staff to manage the TCoEFS website without coding knowledge:
- ✅ Add new news articles
- ✅ Add spotlight cards to homepage
- ✅ Update upcoming events

## 📍 Accessing the Admin Dashboard

Visit: `https://your-website.com/admin`

Example: `https://www.tcoefs-unijos.org/admin`

## 🎨 How to Use

### 1. **Adding News**

1. Click the **"📰 Add News"** tab
2. Fill in the form:
   - **Title**: Full headline (e.g., "TCoEFS Hosts International Workshop")
   - **Category**: Select from News, Research, Partnership, Training, or Policy
   - **Date**: Write in format "September 25, 2025"
   - **Short Excerpt**: 1-2 sentence summary
   - **Full Content**: Complete article (use Enter key to separate paragraphs)
   - **Images**: Click "Choose Images" and select up to 10 photos
   - **Video ID** (optional): If you have a YouTube video, paste just the ID
     - Example: From `youtube.com/watch?v=zRMCLGrrsR0`, use only `zRMCLGrrsR0`

3. Click **"Add News to Pending Changes"**

### 2. **Adding Spotlight**

1. Click the **"⭐ Add Spotlight"** tab
2. Fill in the form:
   - **Title**: Spotlight headline
   - **Short Description**: What shows on the card preview
   - **Full Content**: Complete spotlight story
   - **Images**: Up to 10 images
   - **Video ID** (optional): YouTube video ID if needed

3. Click **"Add Spotlight to Pending Changes"**

### 3. **Updating Event**

1. Click the **"📅 Update Event"** tab
2. Fill in the form:
   - **Event Title**: Full event name
   - **Date**: When it happens (e.g., "October 2025")
   - **Location**: Where it takes place
   - **Short Description**: Brief preview
   - **Full Details**: Complete event information
   - **Image**: One event poster/image

3. Click **"Update Event in Pending Changes"**

### 4. **Publishing Changes**

1. Review your pending changes at the bottom of the page
2. Click **"Push All Changes to Website"**
3. Enter a description of what you changed (e.g., "Added workshop news and updated October event")
4. Click **"Push"**
5. Wait for confirmation

## 🖼️ Image Guidelines

### For News & Spotlights:
- **Format**: JPG or PNG
- **Size**: Keep under 2MB per image for faster loading
- **Quantity**: Maximum 10 images
- **Naming**: Use descriptive names (e.g., "workshop-day1.jpg")

### For Events:
- **Format**: JPG or PNG
- **Size**: Keep under 1MB
- **Quantity**: 1 image only
- **Best**: Use event posters or promotional graphics

## 📹 Adding Videos

You can add YouTube videos to news or spotlight items:

1. Go to your YouTube video
2. Copy the URL: `https://www.youtube.com/watch?v=zRMCLGrrsR0`
3. Extract only the ID part: `zRMCLGrrsR0`
4. Paste it in the "YouTube Video ID" field

**The video will auto-play (muted) when someone opens the news/spotlight!**

## 📝 Writing Tips

### For News Articles:
- Start with the most important information
- Use short paragraphs (2-3 sentences each)
- Press Enter twice to create a new paragraph
- Include dates, names, and specific details
- End with a quote or forward-looking statement

### For Spotlights:
- Focus on major achievements or milestones
- Keep it concise but informative
- Highlight the impact and significance

### For Events:
- Include all key details: date, time, location, purpose
- Mention who should attend
- Add registration or contact information if applicable

## ⚠️ Common Mistakes to Avoid

1. ❌ **Forgetting required fields** - All fields marked with * must be filled
2. ❌ **Wrong date format** - Use "Month DD, YYYY" format (e.g., "September 25, 2025")
3. ❌ **Too many images** - Maximum 10 for news/spotlight, 1 for events
4. ❌ **Uploading huge images** - Compress images to under 2MB before uploading
5. ❌ **No commit message** - Always describe what you changed when pushing
6. ❌ **Pasting full YouTube URL** - Only paste the video ID, not the full URL

## 🔐 Access Control

**Important**: This admin page should be password-protected or restricted to authorized users only.

Contact your web developer to set up:
- Password protection
- User authentication
- Role-based access control

## 🛠️ Technical Setup (For Developers)

### Backend API Needed

The current admin dashboard is a **frontend-only interface**. To make it functional, you need to create a backend API that:

1. **Receives form data** from the admin dashboard
2. **Uploads images** to storage (Vercel Blob, Cloudinary, or `/public`)
3. **Updates JSON files** (`news.generated.json`, spotlight data, event data)
4. **Commits changes** to Git repository
5. **Triggers deployment** (Vercel auto-deploys on git push)

### Suggested Backend Implementation

#### Option 1: Next.js API Routes (Recommended)
Create API endpoints in `app/api/admin/`:
- `POST /api/admin/news` - Add news
- `POST /api/admin/spotlight` - Add spotlight
- `POST /api/admin/event` - Update event
- `POST /api/admin/push` - Commit and deploy

#### Option 2: External Server
Set up a separate Node.js/Python server that:
- Accepts form data via REST API
- Handles file uploads
- Uses Git CLI to commit/push changes

### Required Packages

```bash
npm install formidable      # File upload handling
npm install simple-git      # Git operations
npm install sharp           # Image optimization
```

### Environment Variables Needed

```env
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO=username/repo-name
VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/...
```

### Example API Route Structure

```javascript
// app/api/admin/news/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import simpleGit from 'simple-git';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  
  // 1. Process form data
  // 2. Upload images
  // 3. Update news.generated.json
  // 4. Git commit and push
  // 5. Trigger Vercel deployment
  
  return NextResponse.json({ success: true });
}
```

## 📞 Support

If you encounter issues:
1. Check that all required fields are filled
2. Verify image sizes are under 2MB
3. Ensure you're connected to the internet
4. Contact your web developer if problems persist

## 🔄 Workflow Summary

```
1. Open /admin page
   ↓
2. Select tab (News/Spotlight/Event)
   ↓
3. Fill in form & upload images
   ↓
4. Click "Add to Pending Changes"
   ↓
5. Review changes
   ↓
6. Click "Push All Changes"
   ↓
7. Enter description
   ↓
8. Click "Push"
   ↓
9. Changes go live! ✨
```

## 📊 Version History

- **v1.0** - Initial admin dashboard created
- Frontend interface for news, spotlights, and events
- Pending changes review system
- Commit message workflow

---

**Note**: This dashboard is currently in **demo mode**. Contact your developer to connect it to the live website backend.