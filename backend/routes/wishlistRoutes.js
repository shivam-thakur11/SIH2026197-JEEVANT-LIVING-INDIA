const express = require('express');
const router = express.Router();
const {
  getWishlist,
  toggleWishlist,
  clearWishlist,
} = require('../controllers/wishlistController');

router.get('/', getWishlist);
router.post('/toggle', toggleWishlist);
router.delete('/', clearWishlist);

module.exports = router;
