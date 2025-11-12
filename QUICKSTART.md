# Orthodox Church Library - Quick Start 🚀

## ✅ Project Created Successfully!

Your AI-powered Orthodox Church document search application is ready.

## � **NEW: 100% FREE OPTIONS AVAILABLE!**

**You can run this app completely FREE using Google Gemini!**
See `FREE_ALTERNATIVES.md` for details.

## �📋 Next Steps

### 1. Configure API Keys (REQUIRED)

Edit these files and add your API keys:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

**FREE OPTION (Recommended):**
- ✅ **Google Gemini API Key** (FREE): https://makersuite.google.com/app/apikey
- ✅ **Google Drive Folder ID**: From your shared folder URL
- ✅ **Google API Key**: From Google Cloud Console (Enable Drive API)

**OR Use Paid Option:**
- **OpenAI API Key** (Paid): https://platform.openai.com/

### 2. Run the Application

```bash
npm start
```

The app will open at http://localhost:4200

### 3. Test Your Setup

1. Enter a search query like "Saint John Chrysostom"
2. The AI will search your Google Drive for matching PDFs
3. Click results to view or download

## 🎨 What's Included

✅ **Angular 17** with standalone components
✅ **Byzantine/Orthodox themed UI** with gold & burgundy colors
✅ **Google Drive API integration** - reads PDFs dynamically
✅ **OpenAI GPT integration** - intelligent search
✅ **PDF.js** - optional text extraction
✅ **Responsive design** - works on mobile & desktop
✅ **Complete documentation** in README.md

## 📁 Project Structure

```
c:\WS\MRO\
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── search/          # Search UI
│   │   ├── services/
│   │   │   ├── google-drive.service.ts    # Drive API
│   │   │   ├── openai-search.service.ts   # AI Search
│   │   │   └── pdf-extractor.service.ts   # PDF parsing
│   │   └── models/
│   │       └── pdf-document.model.ts      # Data types
│   ├── environments/
│   │   ├── environment.ts       # Development config
│   │   └── environment.prod.ts  # Production config
│   └── styles.scss              # Byzantine theme
├── README.md                    # Full documentation
├── SETUP.md                     # Setup checklist
└── package.json                 # Dependencies

```

## 🔧 Troubleshooting

**Error: "Cannot find module @angular/..."**
- Run: `npm install`

**Node.js version warnings**
- Use Node.js 20.19+ or 22.12+
- Run: `nvm use 22.12.0` (if you have NVM)

**Search not working**
- Check API keys in `src/environments/environment.ts`
- Verify Google Drive folder is publicly accessible
- Check browser console for errors

## 📚 Documentation

- **README.md** - Complete setup and usage guide
- **SETUP.md** - Quick setup checklist
- **Environment files** - API configuration

## 🎯 Features

- Natural language search ("Show me Christmas hymns")
- AI understands Orthodox terminology
- Searches by saint names, feast days, liturgical seasons
- Analyzes folder structure and filenames
- Optional PDF content search for better accuracy

## 🌐 Deployment

To build for production:

```bash
npm run build
```

Deploy the `dist/orthodox-library` folder to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting

## 💡 Tips

1. **Name PDFs descriptively** for better AI matching
2. **Organize in folders** by saint, season, or type
3. **Use GPT-3.5** for faster/cheaper searches
4. **Monitor API costs** in OpenAI dashboard

## ☦️ Made for the Orthodox Church Community

This tool helps make liturgical resources more accessible through AI.

---

**Ready to start?** Edit the environment files and run `npm start`!
