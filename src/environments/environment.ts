export const environment = {
  production: false,

  // ===== SEARCH ENGINE OPTION =====
  // Choose: 'openai' | 'gemini' | 'ollama' | 'huggingface'
  searchEngine: 'gemini', // Default to FREE Google Gemini

  // ===== GOOGLE GEMINI (FREE) ===== ⭐ RECOMMENDED
  // Get free API key: https://makersuite.google.com/app/apikey
  // Free tier: 60 requests per minute, no credit card needed
  geminiApiKey: 'AIzaSyC29T-y2K9JQThm_iO-czcbxhGPzdIihlo',
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
  googleDriveFolderId: '1X3bXO1F7Ku_EHI-gyU9-HBPSJcC3YwuF',
  googleApiKey: 'AIzaSyBPkVa8I499jcowdJ8z1Akq1jAxX7LnNgQ'
};