
const db = require('../config/db');

const scheduleInterview = async (req, res) => {
  try {
    const { applicationId, interviewDate, interviewTime, interviewMode } = req.body;
    await db.execute(
      'INSERT INTO interviews (application_id, interview_date, interview_time, interview_mode) VALUES (?, ?, ?, ?)',
      [applicationId, interviewDate, interviewTime, interviewMode]
    );
    await db.execute('UPDATE applications SET status = "Interview Scheduled" WHERE id = ?', [applicationId]);
    res.status(201).json({ message: 'Interview scheduled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStudentInterviews = async (req, res) => {
  try {
    const [interviews] = await db.execute(
      'SELECT i.*, a.job_id, j.company_name, j.job_title FROM interviews i JOIN applications a ON i.application_id = a.id JOIN jobs j ON a.job_id = j.id WHERE a.student_id = ?',
      [req.user.id]
    );
    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { scheduleInterview, getStudentInterviews };

