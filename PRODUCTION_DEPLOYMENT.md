# 🚀 Production Deployment Guide

## How It Works in Production

When you publish your site online, here's what happens:

```
User Browser
    ↓ (search query)
Your Angular App (on Netlify/Vercel)
    ↓ (sends to YOUR serverless function - same domain, no CORS!)
Serverless Function (runs on server, not browser)
    ↓ (calls Gemini API - server to server, no CORS!)
Google Gemini API
    ↓ (returns AI results)
Serverless Function
    ↓ (sends results back)
Your Angular App
    ↓ (displays results)
User Browser ✨
```

**Key Point:** The serverless function acts as a "middleman" that runs on the server (not browser), so there are NO CORS issues!

---

## ✅ Option 1: Deploy to Netlify (EASIEST)

### Step 1: Prepare Your Code
Already done! ✅ Files created:
- `netlify.toml` - Netlify configuration
- `netlify/functions/gemini-proxy.js` - Serverless function

### Step 2: Push to GitHub
```powershell
cd c:\WS\MRO
git init
git add .
git commit -m "Initial commit - Orthodox Church Document Search"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3: Deploy to Netlify
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Netlify auto-detects settings (because of `netlify.toml`)
5. Click "Deploy site"

### Step 4: Add Environment Variables
1. In Netlify dashboard, go to "Site settings" → "Environment variables"
2. Add these variables:
   ```
   GEMINI_API_KEY = your-gemini-api-key-here
   GOOGLE_API_KEY = your-google-api-key-here
   GOOGLE_DRIVE_FOLDER_ID = your-folder-id-here
   ```
3. Redeploy: "Deploys" → "Trigger deploy" → "Deploy site"

### Step 5: Test Your Site!
Your site will be at: `https://YOUR_SITE_NAME.netlify.app`

Test search:
- Search for: "Saint Nicholas Christmas"
- Should work perfectly! ✨

---

## ✅ Option 2: Deploy to Vercel

### Step 1: Prepare Your Code
Already done! ✅ Files created:
- `vercel.json` - Vercel configuration
- `api/gemini-proxy.js` - Serverless function

### Step 2: Push to GitHub
Same as Netlify (see above)

### Step 3: Deploy to Vercel
1. Go to https://vercel.com/
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel auto-detects Angular
5. Click "Deploy"

### Step 4: Add Environment Variables
1. In Vercel dashboard, go to "Settings" → "Environment Variables"
2. Add these variables (for all environments):
   ```
   GEMINI_API_KEY = your-gemini-api-key-here
   GOOGLE_API_KEY = your-google-api-key-here
   GOOGLE_DRIVE_FOLDER_ID = your-folder-id-here
   ```
3. Redeploy: "Deployments" → "..." → "Redeploy"

### Step 5: Test Your Site!
Your site will be at: `https://YOUR_PROJECT.vercel.app`

---

## ✅ Option 3: GitHub Pages + Backend (Advanced)

GitHub Pages only serves static files, so you need a separate backend:

### Option A: Railway.app (Free tier)
1. Create account at https://railway.app
2. Deploy Node.js Express server with Gemini proxy
3. Update Angular to call Railway backend URL

### Option B: Render.com (Free tier)
1. Create account at https://render.com
2. Deploy Web Service with Node.js
3. Update Angular to call Render backend URL

---

## 🔧 Development vs Production

### Development (localhost:4200)
```typescript
// environment.ts
useServerlessFunction: false  // Direct API call (CORS issues)
searchEngine: 'ollama'        // Use local Ollama (no CORS)
```

### Production (yoursite.netlify.app)
```typescript
// environment.prod.ts
useServerlessFunction: true   // Use serverless function (no CORS!)
searchEngine: 'gemini'        // Use Gemini via serverless
```

---

## 📊 Cost Comparison for Published Sites

| Platform | Free Tier | Functions | Best For |
|----------|-----------|-----------|----------|
| **Netlify** | 100GB bandwidth<br>125K function calls/month | ✅ Yes | **RECOMMENDED** |
| **Vercel** | 100GB bandwidth<br>100K function calls/month | ✅ Yes | Angular apps |
| **GitHub Pages** | 100GB bandwidth | ❌ No | Static only (need separate backend) |
| **Railway** | $5 credit/month | ✅ Yes | Backend services |
| **Render** | 750 hours/month | ✅ Yes | Full-stack apps |

---

## 🎯 Recommended Approach

**For Your Site:**
1. **Deploy to Netlify** (easiest, 5 minutes)
2. **Use Gemini via serverless function** (free, no CORS)
3. **Google Drive for storage** (free, unlimited with personal account)

**Total Cost: $0/month** ✅

---

## 🧪 Testing Production Locally

Before deploying, test the production build locally:

```powershell
# Build production version
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Test locally with functions
netlify dev

# Or just serve the build
cd dist/mro/browser
npx http-server
```

---

## 🔐 Security Notes

1. **API Keys in Environment Variables** ✅
   - Never commit API keys to Git
   - Always use hosting platform's environment variables
   - Keys are secure server-side

2. **Google Drive Permissions**
   - Make sure folder is publicly shared
   - Or restrict API key to specific domains

3. **Rate Limiting**
   - Gemini: 60 requests/minute (free tier)
   - If exceeded, responses will queue or fail gracefully

---

## 📝 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Netlify/Vercel account created
- [ ] Repository imported to hosting platform
- [ ] Environment variables added (GEMINI_API_KEY, GOOGLE_API_KEY)
- [ ] Site deployed successfully
- [ ] Search functionality tested
- [ ] PDF viewing tested
- [ ] Custom domain configured (optional)

---

## 🆘 Troubleshooting Production

### Search not working on published site?
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Check Netlify/Vercel function logs
4. Ensure `useServerlessFunction: true` in `environment.prod.ts`

### "Function not found" error?
- Netlify: Function should be at `/.netlify/functions/gemini-proxy`
- Vercel: Function should be at `/api/gemini-proxy`
- Check deployment logs

### Google Drive files not loading?
1. Verify folder is publicly shared
2. Check GOOGLE_API_KEY in environment variables
3. Verify API key has Drive API enabled

---

## 🎉 You're Ready!

Your site will work perfectly online with:
- ✅ **No CORS issues** (serverless function handles it)
- ✅ **Free hosting** (Netlify/Vercel free tier)
- ✅ **Free AI** (Google Gemini free tier)
- ✅ **Free storage** (Google Drive)
- ✅ **Fast & scalable** (CDN-distributed)

Deploy and enjoy! 🚀
