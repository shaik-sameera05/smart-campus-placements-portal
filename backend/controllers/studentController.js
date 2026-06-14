
const db = require('../config/db');

const getStudentProfile = async (req, res) => {
  try {
    const [students] = await db.execute('SELECT * FROM students WHERE id = ?', [req.user.id]);
    if (students.length === 0) return res.status(404).json({ message: 'Student not found' });
    res.json(students[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const { name, mobile, department, cgpa, skills, graduationYear } = req.body;
    const [result] = await db.execute(
      'UPDATE students SET name = ?, mobile = ?, department = ?, cgpa = ?, skills = ?, graduation_year = ? WHERE id = ?',
      [name, mobile, department, cgpa, skills, graduationYear, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const studentId = req.user.id;

    const [totalJobs] = await db.execute('SELECT COUNT(*) as count FROM jobs WHERE last_date >= CURDATE()');
    const [appliedJobs] = await db.execute('SELECT COUNT(*) as count FROM applications WHERE student_id = ?', [studentId]);
    const [interviewScheduled] = await db.execute('SELECT COUNT(*) as count FROM applications a JOIN interviews i ON a.id = i.application_id WHERE a.student_id = ? AND a.status = "Interview Scheduled"', [studentId]);
    const [selected] = await db.execute('SELECT COUNT(*) as count FROM applications WHERE student_id = ? AND status = "Selected"', [studentId]);
    const [rejected] = await db.execute('SELECT COUNT(*) as count FROM applications WHERE student_id = ? AND status = "Rejected"', [studentId]);

    res.json({
      totalJobs: totalJobs[0].count,
      appliedJobs: appliedJobs[0].count,
      interviewScheduled: interviewScheduled[0].count,
      selected: selected[0].count,
      rejected: rejected[0].count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const [students] = await db.execute('SELECT id, name, email, mobile, department, cgpa, graduation_year FROM students');
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const [result] = await db.execute('DELETE FROM students WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStudentProfile,
  updateStudentProfile,
  getDashboardStats,
  getAllStudents,
  deleteStudent
};

