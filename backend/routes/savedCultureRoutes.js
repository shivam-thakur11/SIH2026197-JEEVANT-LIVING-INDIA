const express = require('express');
const router = express.Router();
const {
  getSavedCultures,
  toggleSavedCulture,
} = require('../controllers/savedCultureController');

router.get('/', getSavedCultures);
router.post('/toggle', toggleSavedCulture);

module.exports = router;
