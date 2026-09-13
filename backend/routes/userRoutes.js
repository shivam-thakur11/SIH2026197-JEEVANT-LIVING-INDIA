const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// All user management routes require admin authentication
router.use(requireAuth, requireRole('admin'));

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
