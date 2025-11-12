# Orthodox Church Library - Setup Guide

## Quick Setup Checklist

### ✅ Step 1: Google Drive
- [ ] Upload PDFs to Google Drive folder
- [ ] Make folder publicly accessible (Share → Anyone with link)
- [ ] Copy folder ID from URL
- [ ] Enable Google Drive API in Google Cloud Console
- [ ] Create API key

### ✅ Step 2: OpenAI
- [ ] Sign up at platform.openai.com
- [ ] Create API key
- [ ] Add billing method (pay-as-you-go)

### ✅ Step 3: Configure App
- [ ] Paste keys in `src/environments/environment.ts`
- [ ] Run `npm install`
- [ ] Run `npm start`

### ✅ Step 4: Test
- [ ] Open http://localhost:4200
- [ ] Try a search query
- [ ] Verify results appear

## Detailed Setup

See README.md for complete instructions.

## Costs Estimate

For ~500 PDFs with 50 searches per day:
- OpenAI (GPT-4): ~$1.50/day
- OpenAI (GPT-3.5): ~$0.05/day
- Google Drive API: Free

## Node.js Version

This project requires Node.js 20.19+ or 22.12+

If using NVM:
```bash
nvm use 22.12.0
# or
nvm use 20.13.1
```
