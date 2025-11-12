# Orthodox Church Library - AI-Powered Document Search

An Angular application that uses AI to help users search through Orthodox Church documents, Byzantine musical notations, and liturgical texts stored in Google Drive.

## Features

- 🤖 **AI-Powered Search**: Uses OpenAI to understand natural language queries
- ☦️ **Orthodox-Themed UI**: Beautiful Byzantine aesthetic design
- 📁 **Google Drive Integration**: Dynamically reads PDFs from your Google Drive folder
- 🔍 **Smart Matching**: AI analyzes file names, folder structures, and optionally PDF contents
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js (v20.19+ or v22.12+)
- npm or yarn
- Google Cloud Platform account
- OpenAI API account

## Setup Instructions

### 1. Google Drive Setup

1. **Upload your PDFs to Google Drive**
   - Create a folder in your Google Drive
   - Upload all PDF files (can be in subfolders)
   - Right-click the main folder → Share → "Anyone with the link can view"

2. **Get the Folder ID**
   - Open the folder in Google Drive
   - Copy the folder ID from the URL: `https://drive.google.com/drive/folders/[FOLDER_ID]`

3. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable "Google Drive API"
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Copy the API key

### 2. OpenAI Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Go to API keys section
4. Create a new API key
5. Copy the key (it starts with `sk-...`)

### 3. Configure the Application

1. Open `src/environments/environment.ts`
2. Replace the placeholders:

\`\`\`typescript
export const environment = {
  production: false,

  // Paste your OpenAI API key
  openaiApiKey: 'sk-your-api-key-here',
  openaiModel: 'gpt-4-turbo-preview', // or 'gpt-3.5-turbo' for lower cost

  // Paste your Google Drive folder ID
  googleDriveFolderId: 'your-folder-id-here',

  // Paste your Google API key
  googleApiKey: 'your-google-api-key-here',

  // Optional: for OAuth (advanced)
  googleClientId: ''
};
\`\`\`

3. Do the same for `src/environments/environment.prod.ts`

### 4. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 5. Run the Application

\`\`\`bash
npm start
\`\`\`

The app will open at `http://localhost:4200`

## PDF Naming Best Practices

For best AI search results, name your PDFs descriptively:

✅ **Good examples:**
- `Saint_John_Chrysostom_Feast_November_13_Hymns.pdf`
- `Nativity_Christmas_Byzantine_Chant_Notation.pdf`
- `Great_Lent_First_Sunday_Orthros_Service.pdf`
- `Theotokos_Hymns_Collection_Byzantine.pdf`

❌ **Avoid:**
- `doc1.pdf`
- `scan_20231015.pdf`
- `file.pdf`

## Folder Structure Recommendations

Organize your Google Drive like this:

```
📁 Orthodox Library (shared folder)
  📁 Saints
    📁 Saint John Chrysostom
      📄 Feast Day Hymns.pdf
      📄 Byzantine Notation.pdf
    📁 Saint Nicholas
      📄 December 6 Services.pdf
  📁 Liturgical Seasons
    📁 Great Lent
      📄 Week 1 Orthros.pdf
      📄 Week 1 Vespers.pdf
    📁 Nativity
      📄 Christmas Eve Services.pdf
  📁 Byzantine Music
    📄 Notation Guide.pdf
    📄 Eight Tones Explained.pdf
```

## Usage Examples

Try searching for:
- "Saint John Chrysostom hymns"
- "Christmas Byzantine chant"
- "Great Lent first week"
- "Theotokos hymns"
- "Orthros service notation"

## API Costs

- **OpenAI**: ~$0.01-0.03 per search (GPT-4) or ~$0.001 per search (GPT-3.5)
- **Google Drive API**: Free (up to 1 billion requests/day)

## Troubleshooting

### "Search failed" error
- Check that your API keys are correct in `environment.ts`
- Verify your Google Drive folder is publicly accessible
- Check browser console for detailed error messages

### No results found
- Ensure PDFs are in the specified Google Drive folder
- Check that the folder ID is correct
- Try more descriptive search terms

### Slow searches
- Reduce the number of PDFs (or organize into sub-searches)
- Use GPT-3.5 instead of GPT-4 for faster responses
- The first search may be slower due to initialization

## Building for Production

\`\`\`bash
npm run build
\`\`\`

Deploy the `dist/orthodox-library` folder to:
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- Any static hosting service

## Security Notes

⚠️ **Important**:
- Never commit your API keys to GitHub
- For production, consider using a backend proxy to hide API keys
- Regularly rotate your API keys
- Monitor API usage to prevent unexpected costs

## Technology Stack

- **Angular 17+**: Modern standalone components
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming
- **OpenAI API**: AI-powered search
- **Google Drive API**: Cloud storage
- **PDF.js**: PDF text extraction
- **SCSS**: Styled with Byzantine theme

## License

MIT License - Feel free to use and modify for your Orthodox community!

## Support

For issues or questions, please check:
- OpenAI API documentation
- Google Drive API documentation
- Angular documentation

---

Made with ☦️ for the Orthodox Church community
