const express = require('express');
const { protect } = require('../middleware/auth');
const aiService = require('../services/aiService');

const router = express.Router();

/**
 * POST /api/ai/translate
 * Translates text between languages.
 * Body: { text: string, targetLanguage: string }
 */
router.post('/translate', protect, async (req, res, next) => {
  try {
    const { text, targetLanguage } = req.body;
    if (!text) return res.status(400).json({ success: false, message: 'Text is required.' });

    const result = await aiService.translateText(text, targetLanguage || 'en');
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/ai/structure
 * Structures raw text into content fields using LLM.
 * Body: { text: string }
 */
router.post('/structure', protect, async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: 'Text is required.' });

    const result = await aiService.structureContent(text);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ai/search
 * Semantic search across cultural content.
 * Query params: ?q=query&type=artisans|traditions|workshops
 */
router.get('/search', async (req, res, next) => {
  try {
    const { q, type } = req.query;
    if (!q) return res.status(400).json({ success: false, message: 'Search query (q) is required.' });

    const result = await aiService.semanticSearch(q, type || 'artisans');
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
