
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role === 'student') {
        const [students] = await db.execute('SELECT id, name, email FROM students WHERE id = ?', [decoded.id]);
        if (students.length === 0) return res.status(401).json({ message: 'Not authorized' });
        req.user = { ...students[0], role: 'student' };
      } else if (decoded.role === 'recruiter') {
        const [recruiters] = await db.execute('SELECT id, name, email, status FROM recruiters WHERE id = ?', [decoded.id]);
        if (recruiters.length === 0) return res.status(401).json({ message: 'Not authorized' });
        req.user = { ...recruiters[0], role: 'recruiter' };
      } else if (decoded.role === 'admin') {
        const [admins] = await db.execute('SELECT id, name, email FROM admins WHERE id = ?', [decoded.id]);
        if (admins.length === 0) return res.status(401).json({ message: 'Not authorized' });
        req.user = { ...admins[0], role: 'admin' };
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role ${req.user.role} not authorized for this route` });
    }
    next();
  };
};

module.exports = { protect, authorize };

