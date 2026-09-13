const Region = require('../models/Region');
const Tradition = require('../models/Tradition');
const Artisan = require('../models/Artisan');
const connectDB = require('../config/db');
const demoStore = require('../utils/demoStore');

/**
 * @desc    Get all Indian States & Union Territories with real calculated counts
 * @route   GET /api/regions
 * @access  Public
 */
exports.getRegions = async (req, res) => {
  try {
    const isLive = connectDB.isDBConnected ? connectDB.isDBConnected() : false;
    const { type, zone, search } = req.query;

    if (!isLive) {
      // Offline / Demo store fallback
      let results = [...(demoStore.regions || [])];
      if (type) {
        results = results.filter((r) => r.type.toUpperCase() === type.toUpperCase());
      }
      if (zone && zone !== 'All') {
        results = results.filter((r) => r.zone.toLowerCase() === zone.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        results = results.filter(
          (r) =>
            r.name.toLowerCase().includes(s) ||
            r.capital.toLowerCase().includes(s) ||
            (r.majorCrafts && r.majorCrafts.some((c) => c.toLowerCase().includes(s)))
        );
      }

      // Calculate craft counts from demoStore traditions
      results = results.map((r) => {
        const traditionsForState = (demoStore.traditions || []).filter(
          (t) => t.state && t.state.toLowerCase() === r.name.toLowerCase()
        );
        const artisansForState = (demoStore.artisans || []).filter(
          (a) => a.state && a.state.toLowerCase() === r.name.toLowerCase()
        );
        return {
          ...r,
          craftCount: traditionsForState.length,
          artisanCount: artisansForState.length,
        };
      });

      return res.status(200).json({
        success: true,
        count: results.length,
        isLiveDatabase: false,
        data: results,
      });
    }

    // Live MongoDB Query
    const query = {};
    if (type) {
      query.type = type.toUpperCase();
    }
    if (zone && zone !== 'All') {
      query.zone = zone;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { capital: { $regex: search, $options: 'i' } },
        { majorCrafts: { $regex: search, $options: 'i' } },
      ];
    }

    // Fetch regions sorted by type (STATES first, then UTS) and then name alphabetically
    const regions = await Region.find(query).sort({ type: 1, name: 1 }).lean();

    // Dynamically calculate craft and artisan counts from MongoDB
    const enrichedRegions = await Promise.all(
      regions.map(async (reg) => {
        const stateRegex = new RegExp(`^${reg.name.trim()}$`, 'i');
        const [craftCount, artisanCount] = await Promise.all([
          Tradition.countDocuments({ state: stateRegex }),
          Artisan.countDocuments({ state: stateRegex }),
        ]);

        return {
          ...reg,
          craftCount,
          artisanCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: enrichedRegions.length,
      isLiveDatabase: true,
      data: enrichedRegions,
    });
  } catch (err) {
    console.error('Error in getRegions:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve regions from database',
      error: err.message,
    });
  }
};

/**
 * @desc    Get single region by slug, code, name, or ID with real associated traditions
 * @route   GET /api/regions/:identifier
 * @access  Public
 */
exports.getRegionByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    const isLive = connectDB.isDBConnected ? connectDB.isDBConnected() : false;

    if (!isLive) {
      const region = (demoStore.regions || []).find((r) => {
        const cleanId = identifier.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const rSlug = (r.slug || r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        return (
          r.id === identifier ||
          r._id === identifier ||
          r.code.toLowerCase() === identifier.toLowerCase() ||
          r.name.toLowerCase() === identifier.toLowerCase() ||
          rSlug === cleanId
        );
      });

      if (!region) {
        return res.status(404).json({
          success: false,
          message: `Region '${identifier}' not found in registry.`,
        });
      }

      const traditions = (demoStore.traditions || []).filter(
        (t) => t.state && t.state.toLowerCase() === region.name.toLowerCase()
      );
      const artisans = (demoStore.artisans || []).filter(
        (a) => a.state && a.state.toLowerCase() === region.name.toLowerCase()
      );

      return res.status(200).json({
        success: true,
        data: {
          ...region,
          traditions,
          artisans,
          craftCount: traditions.length,
          artisanCount: artisans.length,
        },
      });
    }

    // Live MongoDB lookup
    const cleanSlug = identifier.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const lookupRegex = new RegExp(`^${identifier.replace(/[-_]/g, ' ')}$`, 'i');

    let region = null;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      region = await Region.findById(identifier).lean();
    }
    if (!region) {
      region = await Region.findOne({
        $or: [
          { slug: cleanSlug },
          { code: identifier.toUpperCase() },
          { name: lookupRegex },
        ],
      }).lean();
    }

    if (!region) {
      return res.status(404).json({
        success: false,
        message: `Region '${identifier}' not found in official registry.`,
      });
    }

    // Fetch actual traditions and artisans belonging to this state
    const stateRegex = new RegExp(`^${region.name.trim()}$`, 'i');
    const [traditions, artisans] = await Promise.all([
      Tradition.find({ state: stateRegex }).lean(),
      Artisan.find({ state: stateRegex }).lean(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        ...region,
        traditions,
        artisans,
        craftCount: traditions.length,
        artisanCount: artisans.length,
      },
    });
  } catch (err) {
    console.error('Error in getRegionByIdentifier:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve region details',
      error: err.message,
    });
  }
};

/**
 * @desc    Create new region (Admin only)
 * @route   POST /api/regions
 * @access  Private/Admin
 */
exports.createRegion = async (req, res) => {
  try {
    const isLive = connectDB.isDBConnected ? connectDB.isDBConnected() : false;
    if (!isLive) {
      const newRegion = {
        _id: `region-${Date.now()}`,
        ...req.body,
        createdAt: new Date().toISOString(),
      };
      if (!demoStore.regions) demoStore.regions = [];
      demoStore.regions.push(newRegion);
      return res.status(201).json({ success: true, data: newRegion });
    }

    const region = await Region.create(req.body);
    res.status(201).json({ success: true, data: region });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Update existing region (Admin only)
 * @route   PUT /api/regions/:id
 * @access  Private/Admin
 */
exports.updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const isLive = connectDB.isDBConnected ? connectDB.isDBConnected() : false;

    if (!isLive) {
      const idx = (demoStore.regions || []).findIndex((r) => r._id === id || r.id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Region not found' });
      demoStore.regions[idx] = { ...demoStore.regions[idx], ...req.body, updatedAt: new Date().toISOString() };
      return res.status(200).json({ success: true, data: demoStore.regions[idx] });
    }

    const region = await Region.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!region) return res.status(404).json({ success: false, message: 'Region not found' });
    res.status(200).json({ success: true, data: region });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Delete region (Admin only)
 * @route   DELETE /api/regions/:id
 * @access  Private/Admin
 */
exports.deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const isLive = connectDB.isDBConnected ? connectDB.isDBConnected() : false;

    if (!isLive) {
      demoStore.regions = (demoStore.regions || []).filter((r) => r._id !== id && r.id !== id);
      return res.status(200).json({ success: true, message: 'Region removed from demo store' });
    }

    const region = await Region.findByIdAndDelete(id);
    if (!region) return res.status(404).json({ success: false, message: 'Region not found' });
    res.status(200).json({ success: true, message: 'Region deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
