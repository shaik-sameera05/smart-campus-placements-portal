
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  applyForJob,
  getStudentApplications,
  getJobApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');

router.post('/jobs/:jobId/apply', protect, authorize('student'), applyForJob);
router.get('/student/my-applications', protect, authorize('student'), getStudentApplications);
router.get('/jobs/:jobId/applicants', protect, authorize('recruiter'), getJobApplications);
router.put('/:id/status', protect, authorize('recruiter'), updateApplicationStatus);

module.exports = router;

