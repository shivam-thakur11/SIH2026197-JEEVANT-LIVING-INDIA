/**
 * JEEVANT AI Services
 * =====================================================
 * These are clean service interfaces for AI capabilities.
 * Each function has:
 *   - A real implementation section (TODO — add API keys)
 *   - A mock/demo fallback that runs when keys are not configured
 *
 * AI-generated content is ASSISTIVE only and should go through
 * human/admin verification before being published on the platform.
 * =====================================================
 */

/**
 * Speech-to-Text
 * Converts audio to text — useful for artisans who prefer speaking in their language.
 *
 * TODO: Integrate Google Cloud Speech-to-Text API
 *   - Requires: GOOGLE_SPEECH_API_KEY in .env
 *   - Supports Indian languages: Hindi, Tamil, Marathi, Bengali, etc.
 *
 * @param {Buffer} audioBuffer - Audio file buffer
 * @param {string} languageCode - BCP-47 language code (e.g., 'hi-IN', 'ta-IN')
 * @returns {Promise<{text: string, isDemoMode: boolean}>}
 */
const speechToText = async (audioBuffer, languageCode = 'hi-IN') => {
  // TODO: Replace this block with actual Google Speech-to-Text API call
  // const speech = require('@google-cloud/speech');
  // const client = new speech.SpeechClient({ keyFilename: process.env.GOOGLE_CREDENTIALS_FILE });
  // const [response] = await client.recognize({ audio: { content: audioBuffer }, config: { languageCode } });
  // return { text: response.results[0].alternatives[0].transcript, isDemoMode: false };

  // Demo fallback — clearly labeled, not presented as real output
  console.log('[AI SERVICE] speechToText: Running in DEMO MODE (no API key configured)');
  return {
    text: '[DEMO] यह एक डेमो ट्रांसक्रिप्शन है। वास्तविक Speech-to-Text के लिए API key कॉन्फ़िगर करें।',
    isDemoMode: true,
    note: 'Configure GOOGLE_SPEECH_API_KEY in .env to enable real transcription.',
  };
};

/**
 * Text Translation
 * Translates cultural content between Indian languages and English.
 *
 * TODO: Integrate Google Translate API
 *   - Requires: GOOGLE_TRANSLATE_API_KEY in .env
 *
 * @param {string} text - Text to translate
 * @param {string} targetLanguage - Target language code (e.g., 'en', 'hi', 'ta')
 * @returns {Promise<{translatedText: string, isDemoMode: boolean}>}
 */
const translateText = async (text, targetLanguage = 'en') => {
  // TODO: Replace with actual Google Translate API call
  // const { Translate } = require('@google-cloud/translate').v2;
  // const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });
  // const [translation] = await translate.translate(text, targetLanguage);
  // return { translatedText: translation, isDemoMode: false };

  console.log('[AI SERVICE] translateText: Running in DEMO MODE (no API key configured)');
  return {
    translatedText: `[DEMO TRANSLATION → ${targetLanguage}]: ${text}`,
    isDemoMode: true,
    note: 'Configure GOOGLE_TRANSLATE_API_KEY in .env to enable real translation.',
  };
};

/**
 * LLM-Based Content Structuring
 * Takes raw artisan-provided text and structures it into proper fields.
 * For example: converts a long description into name, bio, craft details, etc.
 *
 * TODO: Integrate Gemini API or OpenAI
 *   - Requires: GEMINI_API_KEY or OPENAI_API_KEY in .env
 *   - All LLM output must go through admin verification before publishing
 *
 * @param {string} rawText - Raw unstructured text from artisan
 * @returns {Promise<{structured: object, isDemoMode: boolean}>}
 */
const structureContent = async (rawText) => {
  // TODO: Replace with actual LLM call
  // const { GoogleGenerativeAI } = require('@google/generative-ai');
  // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  // const result = await model.generateContent(`Extract structured fields from: ${rawText}`);
  // return { structured: JSON.parse(result.response.text()), isDemoMode: false };

  console.log('[AI SERVICE] structureContent: Running in DEMO MODE (no API key configured)');
  return {
    structured: {
      name: '[DEMO - requires human review]',
      craft: '[DEMO - requires human review]',
      description: rawText,
      note: 'This is demo structured output. Admin must verify before publishing.',
    },
    isDemoMode: true,
    note: 'Configure GEMINI_API_KEY in .env to enable real content structuring.',
  };
};

/**
 * Semantic Search
 * Searches for culturally relevant artisans, traditions, or workshops
 * based on meaning — not just exact keywords.
 *
 * TODO: Integrate vector database + embeddings
 *   - Options: Google Vertex AI Matching Engine, Pinecone, Weaviate
 *   - Requires embedding model + vector store setup
 *
 * @param {string} query - Search query (e.g., "blue pottery from Rajasthan")
 * @param {string} type - What to search: 'artisans' | 'traditions' | 'workshops'
 * @returns {Promise<{results: Array, isDemoMode: boolean}>}
 */
const semanticSearch = async (query, type = 'artisans') => {
  // TODO: Replace with actual vector search
  // Use embeddings to find semantically similar documents

  console.log('[AI SERVICE] semanticSearch: Running in DEMO MODE (basic text filter)');
  // Demo: basic case-insensitive text match as a placeholder
  return {
    results: [],
    query,
    type,
    isDemoMode: true,
    note: 'Configure vector search integration to enable semantic search.',
  };
};

/**
 * Image Classification / Auto-Tagging
 * Analyzes craft images and suggests relevant tags (craft type, colors, style).
 *
 * TODO: Integrate Google Cloud Vision API
 *   - Requires: GOOGLE_VISION_API_KEY in .env
 *
 * @param {Buffer} imageBuffer - Image file buffer
 * @returns {Promise<{tags: string[], isDemoMode: boolean}>}
 */
const classifyImage = async (imageBuffer) => {
  // TODO: Replace with actual Vision API call
  // const vision = require('@google-cloud/vision');
  // const client = new vision.ImageAnnotatorClient();
  // const [result] = await client.labelDetection({ image: { content: imageBuffer } });
  // const tags = result.labelAnnotations.map(label => label.description);
  // return { tags, isDemoMode: false };

  console.log('[AI SERVICE] classifyImage: Running in DEMO MODE (no API key configured)');
  return {
    tags: ['[DEMO]', 'traditional-craft', 'indian-art', 'handmade'],
    isDemoMode: true,
    note: 'Configure GOOGLE_VISION_API_KEY in .env to enable real image classification.',
  };
};

module.exports = {
  speechToText,
  translateText,
  structureContent,
  semanticSearch,
  classifyImage,
};
