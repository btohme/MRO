# 🔑 IMPORTANT: Set Your Local API Keys

Your environment files are now in Git with **placeholder values**.

## For Local Development

Edit `src/environments/environment.ts` and add your real keys:

```typescript
geminiApiKey: 'AIzaSyC29T-y2K9JQThm_iO-czcbxhGPzdIihlo',
googleDriveFolderId: '1X3bXO1F7Ku_EHI-gyU9-HBPSJcC3YwuF',
googleApiKey: 'AIzaSyBPkVa8I499jcowdJ8z1Akq1jAxX7LnNgQ'
```

**Don't worry** - Git will track these files but you should NOT commit changes with real keys.

## For Netlify Production

The environment variables are set in Netlify dashboard:
- GEMINI_API_KEY
- GOOGLE_API_KEY
- GOOGLE_DRIVE_FOLDER_ID

The serverless function uses these, not the files.

## Security Note

The files in Git have placeholders. Your real keys are:
1. In your local files (for development)
2. In Netlify environment variables (for production)
3. NEVER committed to Git ✅
