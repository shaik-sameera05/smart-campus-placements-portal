
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getStudentProfile,
  updateStudentProfile,
  getDashboardStats,
  getAllStudents,
  deleteStudent
} = require('../controllers/studentController');

router.get('/profile', protect, authorize('student'), getStudentProfile);
router.put('/profile', protect, authorize('student'), updateStudentProfile);
router.get('/dashboard', protect, authorize('student'), getDashboardStats);
router.get('/', protect, authorize('admin'), getAllStudents);
router.delete('/:id', protect, authorize('admin'), deleteStudent);

module.exports = router;

