// Vercel Serverless Function - Gemini API Proxy
// This runs on Vercel's servers, so NO CORS issues!

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Get Gemini API key from environment variable (set in Vercel dashboard)
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    // Parse request body
    const { model = 'gemini-pro', body } = req.body;

    // Call Gemini API from server-side (no CORS!)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Return response to Angular app
    return res.status(response.ok ? 200 : response.status).json(data);

  } catch (error) {
    console.error('Gemini proxy error:', error);

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({
      error: 'Failed to call Gemini API',
      details: error.message
    });
  }
};
