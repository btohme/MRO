# Environment Configuration Template

Copy this to your `src/environments/environment.ts` and `environment.prod.ts` files.

## Required Configuration

### 1. OpenAI API Key
```typescript
openaiApiKey: 'sk-...'  // Your OpenAI API key
openaiModel: 'gpt-4-turbo-preview'  // or 'gpt-3.5-turbo' for lower cost
```

**Get it here:** https://platform.openai.com/api-keys

### 2. Google Drive Folder ID
```typescript
googleDriveFolderId: '1abc...xyz'  // From your Drive folder URL
```

**How to get it:**
1. Open your Google Drive folder
2. Look at the URL: `https://drive.google.com/drive/folders/[THIS_IS_YOUR_FOLDER_ID]`
3. Copy the folder ID part
4. Make sure the folder is shared publicly (Anyone with link can view)

### 3. Google API Key
```typescript
googleApiKey: 'AIza...'  // Your Google Cloud API key
```

**How to get it:**
1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable "Google Drive API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the key

## Optional: OAuth Client ID
```typescript
googleClientId: 'your-client-id.apps.googleusercontent.com'
```

Only needed if you want users to authenticate with their Google accounts (advanced).

## Security Notes

⚠️ **IMPORTANT:**
- Never commit real API keys to Git!
- The `.gitignore` is configured to ignore environment files
- For production, use environment variables or secret management
- Rotate API keys regularly
- Monitor usage in OpenAI and Google Cloud dashboards

## Cost Estimates

### OpenAI (per search):
- GPT-4: ~$0.01-0.03
- GPT-3.5-Turbo: ~$0.001

### Google Drive API:
- FREE (up to 1 billion requests/day)

### Total monthly cost estimate:
- Light use (10 searches/day): ~$3-9/month (GPT-4) or ~$0.30/month (GPT-3.5)
- Moderate use (50 searches/day): ~$15-45/month (GPT-4) or ~$1.50/month (GPT-3.5)
