
const db = require('../config/db');

const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const studentId = req.user.id;

    const [existing] = await db.execute('SELECT id FROM applications WHERE job_id = ? AND student_id = ?', [jobId, studentId]);
    if (existing.length > 0) return res.status(400).json({ message: 'Already applied for this job' });

    await db.execute('INSERT INTO applications (job_id, student_id) VALUES (?, ?)', [jobId, studentId]);
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStudentApplications = async (req, res) => {
  try {
    const [applications] = await db.execute(
      'SELECT a.*, j.company_name, j.job_title, j.location FROM applications a JOIN jobs j ON a.job_id = j.id WHERE a.student_id = ? ORDER BY a.applied_at DESC',
      [req.user.id]
    );
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const [applications] = await db.execute(
      'SELECT a.*, s.name as student_name, s.email, s.department, s.cgpa FROM applications a JOIN students s ON a.student_id = s.id JOIN jobs j ON a.job_id = j.id WHERE j.id = ? AND j.recruiter_id = ?',
      [req.params.jobId, req.user.id]
    );
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const [result] = await db.execute(
      'UPDATE applications a JOIN jobs j ON a.job_id = j.id SET a.status = ? WHERE a.id = ? AND j.recruiter_id = ?',
      [status, req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Application not found or not authorized' });
    res.json({ message: 'Application status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  applyForJob,
  getStudentApplications,
  getJobApplications,
  updateApplicationStatus
};

