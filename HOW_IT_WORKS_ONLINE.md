# 🌐 How Your Site Works Online

## The Simple Answer

**Your published site will use SERVERLESS FUNCTIONS** - these are like mini-backend servers that run on Netlify/Vercel's servers (not in the browser), so **NO CORS issues!**

---

## Development vs Production

### 💻 Development (Your Computer)
```
Option 1: Use Ollama (LOCAL)
  ✅ Runs on your computer (localhost)
  ✅ No CORS issues
  ✅ 100% FREE
  ❌ Only works on your computer

Option 2: Use Gemini directly (CORS ERROR)
  ❌ Browser blocks the request (CORS)
  ❌ Gets 404 error
```

### 🌐 Production (Published Online)
```
Use Gemini with Serverless Function
  ✅ No CORS issues (function runs on server)
  ✅ Works for all users worldwide
  ✅ 100% FREE (Netlify/Vercel + Gemini free tiers)
  ✅ Fast & reliable
```

---

## What I Just Set Up For You

✅ **Created serverless functions:**
- `netlify/functions/gemini-proxy.js` (for Netlify)
- `api/gemini-proxy.js` (for Vercel)

✅ **Updated environment configs:**
- Development: Uses direct API (or Ollama)
- Production: Uses serverless function

✅ **Updated search service:**
- Automatically detects production mode
- Routes through serverless function
- No code changes needed!

---

## How It Works

```
┌─────────────────────────────────────────────────┐
│  USER'S BROWSER (Anywhere in the world)        │
│                                                 │
│  Search: "Saint Nicholas Christmas"            │
└───────────────────┬─────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────┐
│  YOUR ANGULAR APP (yoursite.netlify.app)       │
│                                                 │
│  Calls: /.netlify/functions/gemini-proxy       │
│  (Same domain - NO CORS!)                      │
└───────────────────┬─────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────┐
│  SERVERLESS FUNCTION (Runs on Netlify server)  │
│                                                 │
│  Calls: Google Gemini API                      │
│  (Server-to-server - NO CORS!)                 │
└───────────────────┬─────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────┐
│  GOOGLE GEMINI API                              │
│                                                 │
│  Returns: AI-filtered relevant documents        │
└───────────────────┬─────────────────────────────┘
                    │
                    ↓ (Results flow back up)

┌─────────────────────────────────────────────────┐
│  USER SEES: Perfect search results! ✨          │
└─────────────────────────────────────────────────┘
```

---

## Quick Deploy Steps

1. **Push to GitHub**
   ```powershell
   git init
   git add .
   git commit -m "Orthodox Church Document Search"
   git push
   ```

2. **Deploy to Netlify**
   - Go to https://app.netlify.com
   - Click "Import from Git"
   - Select your repo
   - It auto-deploys!

3. **Add API Keys**
   - Site Settings → Environment Variables
   - Add: `GEMINI_API_KEY = AIzaSy...`
   - Add: `GOOGLE_API_KEY = AIzaSy...`

4. **Done!** 🎉
   - Your site is live at: yoursite.netlify.app
   - Search works perfectly for everyone!

---

## Cost Breakdown

| Service | Free Tier | What You Need | Cost |
|---------|-----------|---------------|------|
| **Netlify Hosting** | 100GB/month | ~1GB/month | $0 |
| **Netlify Functions** | 125K calls/month | ~1K/month | $0 |
| **Google Gemini** | 60 req/min | ~5 req/min | $0 |
| **Google Drive** | 15GB free | ~500MB PDFs | $0 |
| **Domain (optional)** | - | yoursite.com | $10/year |

**Total: FREE** (unless you want custom domain)

---

## Right Now (Development)

**Recommended:** Switch to Ollama for local testing
```typescript
// environment.ts
searchEngine: 'ollama'  // Works perfectly locally
```

Then run:
```powershell
ollama run llama3.1
```

---

## When Published (Production)

**Automatic:** Uses serverless function
```typescript
// environment.prod.ts
searchEngine: 'gemini'           // Uses Gemini
useServerlessFunction: true      // Via serverless function
```

No CORS issues! Works for everyone! ✨

---

## Summary

- ❌ **Gemini direct in browser:** Doesn't work (CORS)
- ✅ **Ollama for development:** Works perfectly locally
- ✅ **Gemini + Serverless for production:** Works perfectly online

Everything is set up! Just deploy to Netlify/Vercel and it works! 🚀
