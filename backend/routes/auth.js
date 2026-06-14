
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  studentRegister,
  studentLogin,
  recruiterRegister,
  recruiterLogin,
  adminLogin
} = require('../controllers/authController');

router.post('/student/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], studentRegister);

router.post('/student/login', studentLogin);

router.post('/recruiter/register', [
  body('companyName').notEmpty(),
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], recruiterRegister);

router.post('/recruiter/login', recruiterLogin);

router.post('/admin/login', adminLogin);

module.exports = router;

