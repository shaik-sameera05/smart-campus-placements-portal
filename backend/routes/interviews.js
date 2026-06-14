
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { scheduleInterview, getStudentInterviews } = require('../controllers/interviewController');

router.post('/', protect, authorize('recruiter'), scheduleInterview);
router.get('/student', protect, authorize('student'), getStudentInterviews);

module.exports = router;

