
const db = require('../config/db');

const getDashboardStats = async (req, res) => {
  try {
    const [students] = await db.execute('SELECT COUNT(*) as count FROM students');
    const [recruiters] = await db.execute('SELECT COUNT(*) as count FROM recruiters WHERE status = "approved"');
    const [jobs] = await db.execute('SELECT COUNT(*) as count FROM jobs');
    const [applications] = await db.execute('SELECT COUNT(*) as count FROM applications');
    const [selected] = await db.execute('SELECT COUNT(*) as count FROM applications WHERE status = "Selected"');

    const placementPercentage = students[0].count > 0 ? ((selected[0].count / students[0].count) * 100).toFixed(2) : 0;

    res.json({
      totalStudents: students[0].count,
      totalRecruiters: recruiters[0].count,
      totalJobs: jobs[0].count,
      totalApplications: applications[0].count,
      placementPercentage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboardStats };

