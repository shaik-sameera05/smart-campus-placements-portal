
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/adminController');

router.get('/dashboard', protect, authorize('admin'), getDashboardStats);

module.exports = router;

