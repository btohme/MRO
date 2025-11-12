# ⚠️ Gemini API CORS Issue

## Problem
The Google Gemini API doesn't support direct browser calls due to CORS (Cross-Origin Resource Sharing) restrictions. This is a security feature that prevents browser-based apps from calling the API directly.

## Solutions

### ✅ Solution 1: Use Ollama (RECOMMENDED - 100% FREE & LOCAL)
Ollama runs on your computer, so there are NO CORS issues!

1. **Download Ollama**: https://ollama.ai/download
2. **Install** it on your computer
3. **Open PowerShell/Terminal** and run:
   ```powershell
   ollama run llama3.1
   ```
4. **Update environment.ts**:
   ```typescript
   searchEngine: 'ollama',  // Change from 'gemini' to 'ollama'
   ```
5. **Refresh browser** - searches will now work!

**Benefits:**
- ✅ 100% FREE forever
- ✅ No API keys needed
- ✅ No CORS issues
- ✅ Works offline
- ✅ Unlimited requests
- ✅ Privacy (data stays on your computer)

---

### 🔧 Solution 2: Use a Simple Proxy (for Gemini)
If you really want to use Gemini, you need a backend proxy:

1. **Create a simple Node.js proxy** (5 minute setup):

**File: `proxy-server.js`** (create in project root)
```javascript
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = 'AIzaSyC29T-y2K9JQThm_iO-czcbxhGPzdIihlo';

app.post('/api/gemini', async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
```

2. **Install dependencies:**
   ```powershell
   npm install express cors node-fetch
   ```

3. **Run proxy:**
   ```powershell
   node proxy-server.js
   ```

4. **Update `openai-search.service.ts`** line 20:
   ```typescript
   private readonly GEMINI_API_URL = 'http://localhost:3000/api/gemini';
   ```

---

### 📱 Solution 3: Deploy with Backend (Production)
For production deployment:

**Option A: Netlify Functions**
- Free tier includes serverless functions
- No CORS issues
- Documentation: https://docs.netlify.com/functions/overview/

**Option B: Vercel Serverless Functions**
- Similar to Netlify
- Free tier available
- Documentation: https://vercel.com/docs/functions

---

## Current Behavior
When Gemini fails due to CORS, the app will:
✅ Show ALL documents from your Google Drive folder
✅ User can still browse and download PDFs
✅ Search box will show a message about the issue

## Quick Test
To verify everything else works:
1. Change `searchEngine: 'ollama'` in `environment.ts`
2. Run `ollama run llama3.1` in terminal
3. Refresh browser and try searching!

---

## Recommendation
**Use Ollama for development** - it's the easiest, fastest, and completely free solution with no limitations!
