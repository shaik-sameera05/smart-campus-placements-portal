
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('/api/admin/dashboard').then(res => setStats(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      {stats && (
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Total Students</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalStudents}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Total Recruiters</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalRecruiters}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Total Jobs</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Total Applications</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.totalApplications}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Placement %</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.placementPercentage}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

