export const environment = {
  production: true,

  // ===== SEARCH ENGINE OPTION =====
  searchEngine: 'gemini', // Use free Gemini in production

  // ===== GOOGLE GEMINI (FREE) =====
  geminiApiKey: '', // Not used - serverless function reads from hosting env vars
  geminiModel: 'gemini-pro',
  useServerlessFunction: true, // Use /api/gemini-proxy or /.netlify/functions/gemini-proxy

  // ===== OPENAI (PAID) =====
  openaiApiKey: '',
  openaiModel: 'gpt-3.5-turbo',

  // ===== OLLAMA (100% FREE - LOCAL) =====
  ollamaBaseUrl: 'http://localhost:11434',
  ollamaModel: 'llama3.1',

  // ===== HUGGINGFACE (FREE TIER) =====
  huggingfaceToken: '',
  huggingfaceModel: 'mistralai/Mixtral-8x7B-Instruct-v0.1',

  // ===== GOOGLE DRIVE (ALWAYS FREE) =====
  googleDriveFolderId: 'YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE',
  googleApiKey: 'YOUR_GOOGLE_API_KEY_HERE'
};
