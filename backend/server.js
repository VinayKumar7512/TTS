const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// TTS endpoint (Google TTS only)
app.post('/api/tts', async (req, res) => {
  try {
    const { text, lang, slow } = req.body || {};

    if (!text || !String(text).trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const language = (lang || 'en').trim();
    const isSlow = Boolean(slow);

    console.log('Generating TTS (google-tts-api) for:', String(text).substring(0, 50) + '...');

    const gtts = require('google-tts-api');
    const url = gtts.getAudioUrl(String(text), {
      lang: language,
      slow: isSlow,
      host: 'https://translate.google.com'
    });

    const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000 });
    const audioBase64 = Buffer.from(response.data).toString('base64');
    const audioDataUri = `data:audio/mpeg;base64,${audioBase64}`;

    return res.json({ success: true, audio: audioDataUri, provider: 'google-tts', lang: language, slow: isSlow });
  } catch (error) {
    const errorData = error.response?.data;
    let errorMessage = 'Failed to generate speech';

    if (Buffer.isBuffer(errorData)) {
      errorMessage = errorData.toString();
    } else if (errorData) {
      errorMessage = JSON.stringify(errorData);
    } else if (error?.message) {
      errorMessage = error.message;
    }

    console.error('TTS Error (google-tts-api):', errorMessage);
    
    res.status(500).json({ 
      error: errorMessage,
      suggestions: [
        'Ensure outbound internet access to translate.google.com',
        'Use supported language codes (e.g., en, es, fr, de)'
      ]
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});