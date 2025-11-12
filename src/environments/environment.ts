export const environment = {
  production: false,

  // ===== SEARCH ENGINE OPTION =====
  // Choose: 'openai' | 'gemini' | 'ollama' | 'huggingface'
  searchEngine: 'gemini', // Default to FREE Google Gemini

  // ===== GOOGLE GEMINI (FREE) ===== ⭐ RECOMMENDED
  // Get free API key: https://makersuite.google.com/app/apikey
  // Free tier: 60 requests per minute, no credit card needed
  geminiApiKey: 'YOUR_GEMINI_API_KEY_HERE',
  geminiModel: 'gemini-pro',
  useServerlessFunction: false, // Set to true when deployed to Netlify/Vercel

  // ===== OPENAI (PAID) =====
  // Only needed if searchEngine = 'openai'
  openaiApiKey: 'YOUR_OPENAI_API_KEY_HERE',
  openaiModel: 'gpt-3.5-turbo',

  // ===== OLLAMA (100% FREE - LOCAL) ===== ⭐ NO API KEY NEEDED
  // Install from: https://ollama.ai/download
  // Run in terminal: ollama run llama3.1
  // Completely free, runs on your computer
  ollamaBaseUrl: 'http://localhost:11434',
  ollamaModel: 'llama3.1',

  // ===== HUGGINGFACE (FREE TIER) =====
  // Get token: https://huggingface.co/settings/tokens
  // Free tier: 30,000 chars/month
  huggingfaceToken: 'YOUR_HUGGINGFACE_TOKEN_HERE',
  huggingfaceModel: 'mistralai/Mixtral-8x7B-Instruct-v0.1',

  // ===== GOOGLE DRIVE (ALWAYS FREE) =====
  googleDriveFolderId: 'YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE',
  googleApiKey: 'YOUR_GOOGLE_API_KEY_HERE'
};