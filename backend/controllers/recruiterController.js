
const db = require('../config/db');

const getRecruiterProfile = async (req, res) => {
  try {
    const [recruiters] = await db.execute('SELECT * FROM recruiters WHERE id = ?', [req.user.id]);
    if (recruiters.length === 0) return res.status(404).json({ message: 'Recruiter not found' });
    res.json(recruiters[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const [totalJobs] = await db.execute('SELECT COUNT(*) as count FROM jobs WHERE recruiter_id = ?', [recruiterId]);
    const [totalApplications] = await db.execute('SELECT COUNT(*) as count FROM applications a JOIN jobs j ON a.job_id = j.id WHERE j.recruiter_id = ?', [recruiterId]);
    const [shortlisted] = await db.execute('SELECT COUNT(*) as count FROM applications a JOIN jobs j ON a.job_id = j.id WHERE j.recruiter_id = ? AND a.status = "Shortlisted"', [recruiterId]);
    const [selected] = await db.execute('SELECT COUNT(*) as count FROM applications a JOIN jobs j ON a.job_id = j.id WHERE j.recruiter_id = ? AND a.status = "Selected"', [recruiterId]);

    res.json({
      totalJobs: totalJobs[0].count,
      totalApplications: totalApplications[0].count,
      shortlisted: shortlisted[0].count,
      selected: selected[0].count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllRecruiters = async (req, res) => {
  try {
    const [recruiters] = await db.execute('SELECT * FROM recruiters');
    res.json(recruiters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const approveRecruiter = async (req, res) => {
  try {
    const [result] = await db.execute('UPDATE recruiters SET status = "approved" WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Recruiter not found' });
    res.json({ message: 'Recruiter approved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const blockRecruiter = async (req, res) => {
  try {
    const [result] = await db.execute('UPDATE recruiters SET status = "blocked" WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Recruiter not found' });
    res.json({ message: 'Recruiter blocked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRecruiterProfile,
  getDashboardStats,
  getAllRecruiters,
  approveRecruiter,
  blockRecruiter
};

