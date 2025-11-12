export const environment = {
  production: true,

  // ===== SEARCH ENGINE OPTION =====
  searchEngine: 'gemini', // Use free Gemini in production

  // ===== GOOGLE GEMINI (FREE) =====
  geminiApiKey: '', // Not used - serverless function reads from hosting env vars
  geminiModel: 'gemini-pro',
  useServerlessFunction: true, // Use /api/gemini-proxy or /.netlify/functions/gemini-proxy

  // ===== OPENAI (PAID) =====
  openaiApiKey: 'YOUR_OPENAI_API_KEY_HERE',
  openaiModel: 'gpt-3.5-turbo',

  // ===== OLLAMA (100% FREE - LOCAL) =====
  ollamaBaseUrl: 'http://localhost:11434',
  ollamaModel: 'llama3.1',

  // ===== HUGGINGFACE (FREE TIER) =====
  huggingfaceToken: 'YOUR_HUGGINGFACE_TOKEN_HERE',
  huggingfaceModel: 'mistralai/Mixtral-8x7B-Instruct-v0.1',

  // ===== GOOGLE DRIVE (ALWAYS FREE) =====
  googleDriveFolderId: '1X3bXO1F7Ku_EHI-gyU9-HBPSJcC3YwuF',
  googleApiKey: 'AIzaSyBPkVa8I499jcowdJ8z1Akq1jAxX7LnNgQ'
};