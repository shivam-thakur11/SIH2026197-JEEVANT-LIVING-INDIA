const Artisan = require('../models/Artisan');
const Product = require('../models/Product');
const Workshop = require('../models/Workshop');
const Tradition = require('../models/Tradition');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

/**
 * GET /api/search?q=
 * Real multi-entity search across Artisans, Products, Workshops, Traditions, and Stories
 */
const searchAll = async (req, res, next) => {
  try {
    const query = req.query.q || '';

    if (isDBConnected()) {
      const q = query.trim();
      const regex = new RegExp(q, 'i');

      const [artisans, products, workshops, traditions] = await Promise.all([
        Artisan.find({
          $or: [
            { name: regex },
            { craft: regex },
            { state: regex },
            { city: regex },
            { region: regex },
            { giTagNumber: regex },
          ],
        }).limit(8),
        Product.find({
          $or: [
            { name: regex },
            { description: regex },
            { category: regex },
            { state: regex },
            { artisanName: regex },
          ],
        }).limit(8),
        Workshop.find({
          $or: [
            { title: regex },
            { craft: regex },
            { artisanName: regex },
            { location: regex },
          ],
        }).limit(8),
        Tradition.find({
          $or: [
            { title: regex },
            { name: regex },
            { state: regex },
            { category: regex },
            { description: regex },
          ],
        }).limit(8),
      ]);

      return res.json({
        success: true,
        isLiveDatabase: true,
        data: {
          artisans,
          products,
          workshops,
          traditions,
          stories: [],
        },
      });
    }

    // Offline Demo Mode
    const results = demoStore.search(query);
    res.json({
      success: true,
      isLiveDatabase: false,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchAll,
};
