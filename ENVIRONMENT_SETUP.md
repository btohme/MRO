# ⚠️ IMPORTANT: Environment Setup

## For New Contributors / After Cloning

The actual `environment.ts` and `environment.prod.ts` files are **NOT included** in Git for security reasons.

### Quick Setup:

1. **Copy template files:**
   ```powershell
   # Copy development template
   copy src\environments\environment.template.ts src\environments\environment.ts

   # Copy production template
   copy src\environments\environment.prod.template.ts src\environments\environment.prod.ts
   ```

2. **Edit `src/environments/environment.ts`** and add your API keys:
   ```typescript
   geminiApiKey: 'AIzaSy...',           // Your actual Gemini key
   googleDriveFolderId: '1X3bX...',     // Your folder ID
   googleApiKey: 'AIzaSy...',           // Your Google API key
   ```

3. **For local development**, use Ollama (no API keys needed):
   ```typescript
   searchEngine: 'ollama',  // Change this line
   ```

## Files Included in Git

✅ **These ARE committed:**
- `environment.template.ts` - Development template with placeholders
- `environment.prod.template.ts` - Production template with placeholders
- All serverless functions (`netlify/functions/`, `api/`)
- All configuration files (`netlify.toml`, `vercel.json`)
- All source code and components

❌ **These are NOT committed (your local only):**
- `environment.ts` - Your actual dev config with real API keys
- `environment.prod.ts` - Your actual prod config
- `node_modules/`
- `dist/`
- `.angular/`

## For Production Deployment

When deploying to Netlify/Vercel:
1. Push code to GitHub (templates go, real keys don't)
2. Set environment variables in hosting dashboard:
   - `GEMINI_API_KEY`
   - `GOOGLE_API_KEY`
3. Deploy!

The serverless functions read from hosting environment variables, NOT from the files.
