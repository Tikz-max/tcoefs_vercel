# Quick Authentication Setup Reference

## 🚀 5-Minute Setup Guide

### 1️⃣ Create GitHub OAuth App
- Go to: https://github.com/settings/developers
- Click: **OAuth Apps** → **New OAuth App**
- Fill in:
  - **Name:** TCoEFS Admin Dashboard
  - **Homepage:** `http://localhost:3000`
  - **Callback:** `http://localhost:3000/auth/callback`
- Click **Register application**
- **Generate a new client secret**
- **SAVE:** Client ID and Client Secret

### 2️⃣ Create Supabase Project
- Go to: https://supabase.com
- Click: **New Project**
- Fill in project details, wait 2-3 minutes
- Go to: **Authentication** → **Providers** → **GitHub**
- Toggle **Enabled**
- Paste: GitHub Client ID and Client Secret
- Click **Save**

### 3️⃣ Get Supabase Credentials
- Go to: **Project Settings** → **API**
- Copy:
  - **Project URL**
  - **anon public key**

### 4️⃣ Update .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_AUTHORIZED_ADMINS=github-username1,github-username2
```

### 5️⃣ Test It
```bash
npm run dev
```
- Visit: `http://localhost:3000/login`
- Click: **Sign in with GitHub**
- Should redirect to `/admin` if authorized ✅

---

## 📌 Your Credentials Checklist

```
GitHub OAuth App:
├─ Client ID: ________________
└─ Client Secret: ________________

Supabase:
├─ Project URL: ________________
└─ Anon Key: ________________

Authorized Admins:
├─ Admin 1 GitHub Username: ________________
└─ Admin 2 GitHub Username: ________________
```

---

## 🔄 Production Deployment (Vercel)

1. **Update GitHub OAuth App:**
   - Add production callback: `https://yourdomain.com/auth/callback`

2. **Add Vercel Environment Variables:**
   - Go to: Project → Settings → Environment Variables
   - Add all 3 variables from `.env.local`
   - Select: All environments
   - Save and redeploy

3. **Update Supabase:**
   - Go to: Authentication → URL Configuration
   - Add production domain to Site URL and Redirect URLs

---

## ⚡ Common Commands

```bash
# Start development
npm run dev

# Check installed packages
npm list @supabase/supabase-js @supabase/ssr

# Install if missing
npm install @supabase/supabase-js @supabase/ssr
```

---

## 🔍 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login | Check GitHub OAuth credentials in Supabase |
| Access Denied | Verify GitHub username in `AUTHORIZED_ADMINS` |
| Redirect loop | Clear browser cookies, restart dev server |
| Changes not working | Restart dev server after editing `.env.local` |

---

## 📁 Important URLs

- **Login:** `/login`
- **Admin Dashboard:** `/admin`
- **Access Denied:** `/unauthorized`
- **Auth Callback:** `/auth/callback`

---

## 🎯 How It Works

```
User visits /admin
    ↓
Not logged in?
    ↓
Redirect to /login
    ↓
Click "Sign in with GitHub"
    ↓
GitHub OAuth authorization
    ↓
Callback to /auth/callback
    ↓
Check if username in AUTHORIZED_ADMINS
    ↓
YES → /admin ✅
NO → /unauthorized ⛔
```

---

**Need detailed instructions?** See `SUPABASE_GITHUB_AUTH_SETUP.md`
