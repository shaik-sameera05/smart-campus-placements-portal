
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getRecruiterProfile,
  getDashboardStats,
  getAllRecruiters,
  approveRecruiter,
  blockRecruiter
} = require('../controllers/recruiterController');

router.get('/profile', protect, authorize('recruiter'), getRecruiterProfile);
router.get('/dashboard', protect, authorize('recruiter'), getDashboardStats);
router.get('/', protect, authorize('admin'), getAllRecruiters);
router.put('/:id/approve', protect, authorize('admin'), approveRecruiter);
router.put('/:id/block', protect, authorize('admin'), blockRecruiter);

module.exports = router;

