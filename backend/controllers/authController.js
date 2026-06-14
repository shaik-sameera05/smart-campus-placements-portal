
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { validationResult } = require('express-validator');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const studentRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, mobile, department, cgpa, skills, graduationYear } = req.body;
    const [existing] = await db.execute('SELECT id FROM students WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ message: 'Student already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO students (name, email, password, mobile, department, cgpa, skills, graduation_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, mobile, department, cgpa, skills, graduationYear]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email,
      token: generateToken(result.insertId, 'student')
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [students] = await db.execute('SELECT * FROM students WHERE email = ?', [email]);
    if (students.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const student = students[0];
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      id: student.id,
      name: student.name,
      email: student.email,
      role: 'student',
      token: generateToken(student.id, 'student')
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const recruiterRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { companyName, name, email, password, mobile } = req.body;
    const [existing] = await db.execute('SELECT id FROM recruiters WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ message: 'Recruiter already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO recruiters (company_name, name, email, password, mobile) VALUES (?, ?, ?, ?, ?)',
      [companyName, name, email, hashedPassword, mobile]
    );

    res.status(201).json({
      id: result.insertId,
      companyName,
      name,
      email,
      status: 'pending',
      token: generateToken(result.insertId, 'recruiter')
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const recruiterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [recruiters] = await db.execute('SELECT * FROM recruiters WHERE email = ?', [email]);
    if (recruiters.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const recruiter = recruiters[0];
    if (recruiter.status === 'blocked') return res.status(403).json({ message: 'Account blocked' });
    if (recruiter.status === 'pending') return res.status(403).json({ message: 'Account pending approval' });

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      id: recruiter.id,
      companyName: recruiter.company_name,
      name: recruiter.name,
      email: recruiter.email,
      role: 'recruiter',
      token: generateToken(recruiter.id, 'recruiter')
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("EMAIL:", email);
console.log("PASSWORD:", password);

const [admins] = await db.execute(
  'SELECT * FROM admins WHERE email = ?',
  [email]
);
    const [admins] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);
    if (admins.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const admin = admins[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: 'admin',
      token: generateToken(admin.id, 'admin')
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  studentRegister,
  studentLogin,
  recruiterRegister,
  recruiterLogin,
  adminLogin
};

