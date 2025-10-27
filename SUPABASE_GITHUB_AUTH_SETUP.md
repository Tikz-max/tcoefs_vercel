# Supabase GitHub Authentication Setup Guide

Complete guide to set up GitHub OAuth authentication for the TCoEFS Admin Dashboard with only 2 authorized administrators.

---

## 📋 Prerequisites

- GitHub account (for creating OAuth App)
- Supabase account (free tier works fine)
- The admin GitHub usernames you want to authorize

---

## Part 1: Create GitHub OAuth Application

### Step 1: Go to GitHub Developer Settings

1. Go to https://github.com/settings/developers
2. Click on **"OAuth Apps"** in the left sidebar
3. Click **"New OAuth App"** button

### Step 2: Fill in OAuth App Details

**Application name:** `TCoEFS Admin Dashboard`

**Homepage URL:** 
- For development: `http://localhost:3000`
- For production: `https://your-domain.com`

**Application description:** (Optional)
```
Admin authentication for TCoEFS website management
```

**Authorization callback URL:** 
- For development: `http://localhost:3000/auth/callback`
- For production: `https://your-domain.com/auth/callback`

### Step 3: Generate Client Secret

1. After creating the app, you'll see your **Client ID**
2. Click **"Generate a new client secret"**
3. **IMPORTANT:** Copy both the **Client ID** and **Client Secret** - you won't be able to see the secret again!

```
✅ Client ID: Ghp_xxxxxxxxxxxx
✅ Client Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Part 2: Create & Configure Supabase Project

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click **"Start your project"** or **"New Project"**
3. Choose your organization (or create one)
4. Fill in project details:
   - **Name:** `tcoefs-admin`
   - **Database Password:** (create a strong password - save it!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free tier is fine
5. Click **"Create new project"**
6. Wait 2-3 minutes for project to be set up

### Step 2: Enable GitHub Authentication

1. In your Supabase project, go to **Authentication** (left sidebar)
2. Click on **"Providers"** tab
3. Find **"GitHub"** in the list
4. Toggle it to **"Enabled"**
5. Enter the credentials from GitHub:
   - **Client ID:** (paste from GitHub OAuth App)
   - **Client Secret:** (paste from GitHub OAuth App)
6. Click **"Save"**

### Step 3: Get Supabase Project Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **"API"** tab
3. Copy these values:

```
✅ Project URL: https://xxxxxxxxxxxxx.supabase.co
✅ anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Part 3: Configure Your Local Project

### Step 1: Update Environment Variables

Open `.env.local` file in your project root and add:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Authorized Admin GitHub Usernames (comma-separated, NO SPACES)
NEXT_PUBLIC_AUTHORIZED_ADMINS=github-username-1,github-username-2
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk...
NEXT_PUBLIC_AUTHORIZED_ADMINS=maziki,john-admin
```

⚠️ **IMPORTANT:** 
- Use exact GitHub usernames (case-sensitive)
- NO spaces between usernames
- Comma-separated only

### Step 2: Verify Installation

Check that packages are installed:
```bash
npm list @supabase/supabase-js @supabase/ssr
```

If not installed, run:
```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## Part 4: Test the Authentication Flow

### Step 1: Start Development Server

```bash
npm run dev
```

### Step 2: Test Login Flow

1. Open browser to `http://localhost:3000/login`
2. Click **"Sign in with GitHub"**
3. GitHub will ask you to authorize the app
4. Click **"Authorize [your-app-name]"**
5. You should be redirected to `/admin` if your username is authorized
6. If not authorized, you'll see the "Access Denied" page

### Step 3: Verify Admin Access

- Try accessing `http://localhost:3000/admin` directly
- You should be redirected to login if not authenticated
- After login with authorized account, you should see the admin dashboard

### Step 4: Test Logout

- Click the **"Logout"** button in the admin dashboard
- You should be redirected to the login page
- Try accessing `/admin` again - should redirect to login

---

## Part 5: Production Deployment (Vercel)

### Step 1: Update GitHub OAuth App for Production

1. Go back to GitHub OAuth App settings
2. Update or add production URLs:
   - **Homepage URL:** `https://your-production-domain.com`
   - **Authorization callback URL:** `https://your-production-domain.com/auth/callback`

💡 **Tip:** You can have multiple callback URLs by creating separate OAuth apps for dev and production

### Step 2: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in sidebar
4. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_AUTHORIZED_ADMINS = username1,username2
```

5. Make sure to select **all environments** (Production, Preview, Development)
6. Click **"Save"**

### Step 3: Redeploy

1. Go to **"Deployments"** tab
2. Click the **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Or just push a new commit to trigger deployment

### Step 4: Update Supabase Redirect URLs

1. In Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Add your production domain to **"Site URL"**:
   ```
   https://your-production-domain.com
   ```
3. Add to **"Redirect URLs"**:
   ```
   https://your-production-domain.com/auth/callback
   ```

---

## 🔒 Security Checklist

- [ ] `.env.local` is in `.gitignore` (never commit it!)
- [ ] GitHub OAuth Client Secret is kept secure
- [ ] Only authorized GitHub usernames are in `NEXT_PUBLIC_AUTHORIZED_ADMINS`
- [ ] Production environment variables are set in Vercel
- [ ] Supabase project has proper redirect URLs configured
- [ ] Test login/logout flow in production

---

## 🧪 Testing Different Scenarios

### Scenario 1: Authorized Admin Login
1. Navigate to `/admin`
2. Redirect to `/login`
3. Click "Sign in with GitHub"
4. Authorize on GitHub
5. Redirect to `/admin` ✅

### Scenario 2: Unauthorized User Login
1. Navigate to `/admin`
2. Redirect to `/login`
3. Click "Sign in with GitHub"
4. Authorize on GitHub
5. Redirect to `/unauthorized` ⛔
6. User is automatically signed out

### Scenario 3: Direct Admin Access (Not Logged In)
1. Navigate to `/admin` directly
2. Middleware catches unauthenticated request
3. Redirect to `/login` 🔒

### Scenario 4: Direct Admin Access (Logged In)
1. Already logged in as authorized user
2. Navigate to `/admin` directly
3. Admin dashboard loads ✅

---

## 🛠️ Troubleshooting

### Issue: "Error signing in with GitHub"

**Solutions:**
- Check that GitHub OAuth Client ID and Secret are correct in Supabase
- Verify callback URL matches exactly in GitHub OAuth App settings
- Make sure Supabase GitHub provider is enabled

### Issue: "Access Denied" for authorized user

**Solutions:**
- Check GitHub username spelling in `.env.local`
- Verify `NEXT_PUBLIC_AUTHORIZED_ADMINS` has no spaces
- Check username case (it's case-sensitive)
- Look at user metadata: Go to Supabase → Authentication → Users → click user → check `user_name` field

### Issue: Redirect loop or infinite redirects

**Solutions:**
- Clear browser cookies and cache
- Check middleware.ts is not conflicting
- Verify all redirect URLs in Supabase match your domain
- Check for multiple middleware files

### Issue: "User already registered" on GitHub

**Solutions:**
- This is normal - it means GitHub remembers the authorization
- You won't be asked to authorize again unless you revoke access
- To test fresh: Go to GitHub Settings → Applications → Authorized OAuth Apps → Revoke

### Issue: Environment variables not working

**Solutions:**
- Restart Next.js dev server after changing `.env.local`
- In Vercel, make sure variables are saved for all environments
- Redeploy after adding environment variables

---

## 📝 How to Add/Remove Admins

### Add a New Admin

1. Get their GitHub username (case-sensitive)
2. Update `.env.local`:
   ```env
   NEXT_PUBLIC_AUTHORIZED_ADMINS=existing-admin,new-admin
   ```
3. For production, update Vercel environment variable
4. Restart dev server (local) or redeploy (production)

### Remove an Admin

1. Remove username from `.env.local`:
   ```env
   NEXT_PUBLIC_AUTHORIZED_ADMINS=remaining-admin
   ```
2. Update Vercel environment variable for production
3. Restart/redeploy

---

## 🔑 Important Files Reference

```
/home/maziki/Desktop/tcoefs_vercel/
├── .env.local                          # Your credentials (DON'T COMMIT!)
├── middleware.ts                       # Route protection
├── lib/
│   └── supabase/
│       ├── client.ts                   # Browser Supabase client
│       └── middleware.ts               # Auth middleware logic
├── app/
│   ├── login/
│   │   └── page.tsx                    # Login page
│   ├── admin/
│   │   └── page.tsx                    # Protected admin dashboard
│   ├── unauthorized/
│   │   └── page.tsx                    # Access denied page
│   └── auth/
│       └── callback/
│           └── route.ts                # OAuth callback handler
```

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Check Supabase logs: Project → Logs → Auth
3. Verify all URLs match exactly (no trailing slashes)
4. Test in incognito mode to rule out cookie issues

---

## ✅ Quick Start Checklist

- [ ] Created GitHub OAuth App
- [ ] Created Supabase project
- [ ] Enabled GitHub provider in Supabase
- [ ] Copied Supabase URL and anon key
- [ ] Updated `.env.local` with all credentials
- [ ] Added authorized GitHub usernames
- [ ] Tested login flow locally
- [ ] Tested logout functionality
- [ ] Set up Vercel environment variables (for production)
- [ ] Updated GitHub OAuth callback for production domain

---

**🎉 You're all set!** Your admin dashboard is now protected with GitHub OAuth and only authorized users can access it.