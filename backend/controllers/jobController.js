
const db = require('../config/db');

const getAllJobs = async (req, res) => {
  try {
    const [jobs] = await db.execute('SELECT * FROM jobs WHERE last_date >= CURDATE() ORDER BY created_at DESC');
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getJobById = async (req, res) => {
  try {
    const [jobs] = await db.execute('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
    if (jobs.length === 0) return res.status(404).json({ message: 'Job not found' });
    res.json(jobs[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getJobsByRecruiter = async (req, res) => {
  try {
    const [jobs] = await db.execute('SELECT * FROM jobs WHERE recruiter_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, package: pkg, location, requiredSkills, eligibilityCriteria, cgpaRequirement, lastDate } = req.body;
    const [result] = await db.execute(
      'INSERT INTO jobs (recruiter_id, company_name, job_title, package, location, required_skills, eligibility_criteria, cgpa_requirement, last_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, companyName, jobTitle, pkg, location, requiredSkills, eligibilityCriteria, cgpaRequirement, lastDate]
    );
    res.status(201).json({ id: result.insertId, message: 'Job created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateJob = async (req, res) => {
  try {
    const { companyName, jobTitle, package: pkg, location, requiredSkills, eligibilityCriteria, cgpaRequirement, lastDate } = req.body;
    const [result] = await db.execute(
      'UPDATE jobs SET company_name = ?, job_title = ?, package = ?, location = ?, required_skills = ?, eligibility_criteria = ?, cgpa_requirement = ?, last_date = ? WHERE id = ? AND recruiter_id = ?',
      [companyName, jobTitle, pkg, location, requiredSkills, eligibilityCriteria, cgpaRequirement, lastDate, req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Job not found or not authorized' });
    res.json({ message: 'Job updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const [result] = await db.execute('DELETE FROM jobs WHERE id = ? AND recruiter_id = ?', [req.params.id, req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Job not found or not authorized' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  getJobsByRecruiter,
  createJob,
  updateJob,
  deleteJob
};

