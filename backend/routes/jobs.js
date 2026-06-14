
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllJobs,
  getJobById,
  getJobsByRecruiter,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

router.get('/', protect, getAllJobs);
router.get('/:id', protect, getJobById);
router.get('/recruiter/my-jobs', protect, authorize('recruiter'), getJobsByRecruiter);
router.post('/', protect, authorize('recruiter'), createJob);
router.put('/:id', protect, authorize('recruiter'), updateJob);
router.delete('/:id', protect, authorize('recruiter'), deleteJob);

module.exports = router;

