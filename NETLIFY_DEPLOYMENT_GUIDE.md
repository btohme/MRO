# 🚀 Complete Netlify Deployment Guide

## Step-by-Step: Deploy Your Site to Netlify

---

## Part 1: Push to GitHub

### Step 1: Commit Your Code

```powershell
# You already have files staged, just commit:
git commit -m "Orthodox Church Document Search - Ready for deployment"

# Push to GitHub
git push origin main
```

✅ **Verify on GitHub:**
- Go to https://github.com/btohme/MRO
- Refresh the page
- You should see all your files (except the real environment files with API keys)

---

## Part 2: Deploy to Netlify

### Step 2: Create Netlify Account

1. Go to https://www.netlify.com/
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** (easiest option)
4. Authorize Netlify to access your GitHub account

### Step 3: Create New Site

1. Click **"Add new site"** button (top right)
2. Select **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify if prompted
5. Search for **"MRO"** in the repository list
6. Click on **"btohme/MRO"**

### Step 4: Configure Build Settings

Netlify will auto-detect your settings from `netlify.toml`, but verify:

```
Build command: npm run build
Publish directory: dist/mro/browser
Functions directory: netlify/functions
```

**Don't change anything** - just click **"Deploy MRO"** button at the bottom!

### Step 5: Wait for Deployment

You'll see a deployment log:
```
[Build started]
[Installing dependencies...]
[Building application...]
[Deploying to Netlify...]
✓ Site is live!
```

This takes **2-5 minutes** the first time.

---

## Part 3: Configure Environment Variables (CRITICAL!)

Your site is deployed, but **AI search won't work yet** because the API keys aren't set!

### Step 6: Add Environment Variables

1. In Netlify dashboard, click on your site name
2. Go to **"Site configuration"** → **"Environment variables"**
3. Click **"Add a variable"** → **"Add a single variable"**

**Add these 3 variables:**

#### Variable 1: GEMINI_API_KEY
- **Key:** `GEMINI_API_KEY`
- **Value:** `your-gemini-api-key-here`
- **Scopes:** Check all (Production, Deploy Previews, Branch deploys)
- Click **"Create variable"**

#### Variable 2: GOOGLE_API_KEY
- **Key:** `GOOGLE_API_KEY`
- **Value:** `your-google-api-key-here`
- **Scopes:** Check all
- Click **"Create variable"**

#### Variable 3: GOOGLE_DRIVE_FOLDER_ID (Optional but recommended)
- **Key:** `GOOGLE_DRIVE_FOLDER_ID`
- **Value:** `your-google-drive-folder-id`
- **Scopes:** Check all
- Click **"Create variable"**

### Step 7: Redeploy

After adding environment variables, you MUST redeploy:

1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** dropdown
3. Select **"Deploy site"**
4. Wait 2-3 minutes for rebuild

---

## Part 4: Test Your Live Site!

### Step 8: Get Your Site URL

Your site will be at:
```
https://YOUR-SITE-NAME.netlify.app
```

Example: `https://orthodox-church-search-12345.netlify.app`

**Find it:**
- Top of Netlify dashboard shows your URL
- Or go to **"Site configuration"** → **"Domain management"**

### Step 9: Test the Search

1. **Open your site URL** in browser
2. You should see the Byzantine-themed homepage with search box
3. **Try a test search:**
   - Type: `Saint Nicholas Christmas`
   - Press Enter
   - AI should analyze your Google Drive PDFs
   - Results should appear in ~3-5 seconds

✅ **If you see results:** SUCCESS! Your site is working perfectly! 🎉

❌ **If you see errors:** Jump to "Troubleshooting" section below

---

## Part 5: Using Your Site

### How to Search

Your site supports natural language queries for Orthodox content:

**Examples of good searches:**
```
Saint Nicholas feast day
Christmas Byzantine chant
Great Lent Orthros service
Theotokos hymns
Nativity Divine Liturgy
Pascha Resurrection troparia
Saint John Chrysostom homilies
Byzantine notation Cherubic Hymn
```

**How it works:**
1. Type your query in the search box
2. AI (Google Gemini) analyzes your entire Google Drive folder
3. AI reads PDF filenames, folder structure, and optionally content
4. AI ranks documents by relevance
5. Results appear with preview and download options

### View a PDF

1. Click on any result card
2. PDF opens in Google Drive viewer
3. You can read online or download

### Download a PDF

1. Click the **"⬇️ Download"** button on any result
2. PDF downloads to your computer

---

## Part 6: Share Your Site

### Share with Others

Simply share your Netlify URL:
```
https://your-site-name.netlify.app
```

**Anyone can:**
- Search through your documents
- View PDFs online
- Download PDFs
- Access from any device

**They cannot:**
- See your API keys (secure on server)
- Edit your Google Drive
- Access your code

### Custom Domain (Optional)

Want `orthodoxlibrary.com` instead of `.netlify.app`?

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Netlify: **"Domain management"** → **"Add custom domain"**
3. Follow instructions to point DNS to Netlify
4. Free SSL certificate included!

---

## 📊 Usage Limits (Free Tier)

Your site on Netlify free tier includes:

| Service | Free Tier | Typical Usage | Status |
|---------|-----------|---------------|--------|
| **Netlify Bandwidth** | 100 GB/month | ~2 GB/month | ✅ Plenty |
| **Netlify Functions** | 125K calls/month | ~1K/month | ✅ Plenty |
| **Google Gemini** | 60 requests/min | ~5/min | ✅ Plenty |
| **Google Drive** | 15 GB storage | Your PDFs | ✅ OK |

**Estimated traffic:** ~3,000-5,000 searches per month (free)

If you exceed limits, Netlify will email you with upgrade options.

---

## 🔧 Troubleshooting

### Error: "Search failed"

**Check:**
1. Browser console (F12) for errors
2. Netlify Functions log:
   - Go to Netlify dashboard
   - Click **"Functions"** tab
   - Click **"gemini-proxy"**
   - Check logs for errors

**Common fix:**
- Verify environment variables are set (Step 6)
- Redeploy after setting variables (Step 7)

### Error: "No documents found"

**Check:**
1. Google Drive folder is publicly shared
2. Folder ID is correct in environment variables
3. PDFs are actually in the folder

**Test:**
- Visit: `https://drive.google.com/drive/folders/1X3bXO1F7Ku_EHI-gyU9-HBPSJcC3YwuF`
- Make sure you can see files

### Serverless function not found

**URL should be:**
```
https://your-site.netlify.app/.netlify/functions/gemini-proxy
```

**Check:**
1. `netlify.toml` is in repository root ✅ (it is)
2. `netlify/functions/gemini-proxy.js` exists ✅ (it does)
3. Redeploy the site

### API Key errors

**Check in Netlify:**
1. **"Site configuration"** → **"Environment variables"**
2. Verify all 3 keys are there
3. No typos in key names (case-sensitive!)
4. Redeploy after changes

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Site loads at your Netlify URL
- [ ] Byzantine theme displays correctly (gold/burgundy colors)
- [ ] Search box is visible
- [ ] Can type in search box
- [ ] Search returns results (try "Saint Nicholas")
- [ ] Can click to view PDF in Google Drive
- [ ] Can download PDFs
- [ ] Works on mobile browser
- [ ] No console errors (F12 to check)

---

## 📱 Using the Site - Quick Reference

### Search Tips

**Be specific:**
- ✅ "Saint John Chrysostom Divine Liturgy"
- ❌ "church stuff"

**Use Orthodox terminology:**
- Feast names: "Nativity", "Pascha", "Theophany"
- Service names: "Orthros", "Vespers", "Divine Liturgy"
- Saint names: "Theotokos", "Saint Nicholas", "Saint Basil"

**Combine terms:**
- "Christmas Byzantine chant notation"
- "Great Lent troparia Greek"

### Navigation

```
┌────────────────────────────────────┐
│  Orthodox Church Library Search    │  ← Header
├────────────────────────────────────┤
│  [Search box]                      │  ← Type here
│  [Search with AI button]           │  ← Click or press Enter
├────────────────────────────────────┤
│  Results:                          │
│  ┌──────────────────────────────┐ │
│  │ 1. Saint Nicholas Hymns.pdf  │ │  ← Click to view
│  │    📁 Saints/December         │ │
│  │    [View] [Download]         │ │  ← Action buttons
│  └──────────────────────────────┘ │
│  ┌──────────────────────────────┐ │
│  │ 2. Christmas Chant.pdf       │ │
│  │    📁 Feasts/Nativity        │ │
│  │    [View] [Download]         │ │
│  └──────────────────────────────┘ │
└────────────────────────────────────┘
```

---

## 🔄 Updating Your Site

### Add New PDFs

1. Upload to your Google Drive folder
2. No need to redeploy!
3. New PDFs appear in search immediately ✨

### Update Code

```powershell
# Make changes locally
# Test with: npm start

# Commit and push
git add .
git commit -m "Updated feature X"
git push origin main

# Netlify auto-deploys in ~2 minutes!
```

---

## 🎯 Your Site is Live!

**Your URL:** https://[your-site-name].netlify.app

**Share it with:**
- Your church community
- Fellow Orthodox Christians
- Choirs and chanters
- Theology students
- Anyone searching for Orthodox resources

**Features for users:**
- AI-powered natural language search
- Instant results from your entire library
- View PDFs online (no download needed)
- Download for offline use
- Works on phone, tablet, desktop
- Beautiful Byzantine-themed interface
- Fast global CDN delivery
- Always up-to-date with your Drive folder

---

## 📞 Need Help?

**Netlify Support:**
- https://docs.netlify.com/
- https://answers.netlify.com/

**Check logs:**
- Netlify Dashboard → Deploys → [Latest deploy] → View logs
- Netlify Dashboard → Functions → gemini-proxy → Logs

**Test API keys:**
- Make sure Google API key has "Google Drive API" enabled
- Test Gemini key at: https://aistudio.google.com/

---

## 🎊 You're Done!

Your Orthodox Church library is now:
- ✅ Live on the internet
- ✅ Searchable with AI
- ✅ Accessible worldwide
- ✅ Free to host
- ✅ Automatically updated
- ✅ Fast and secure

**Congratulations!** 🎉☦️
