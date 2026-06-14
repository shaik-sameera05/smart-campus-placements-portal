
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecruiterDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('/api/recruiters/dashboard').then(res => setStats(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>
      {stats && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Total Jobs</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Applications</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalApplications}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Shortlisted</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.shortlisted}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Selected</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.selected}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;

