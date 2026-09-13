const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markNotificationRead,
  markAllRead,
  createNotification,
} = require('../controllers/notificationController');

router.get('/', getNotifications);
router.post('/', createNotification);
router.patch('/read-all', markAllRead);
router.patch('/:id/read', markNotificationRead);

module.exports = router;
