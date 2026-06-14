
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/students/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
      {stats && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Total Jobs</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Applied</h3>
            <p className="text-3xl font-bold text-green-600">{stats.appliedJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Interview Scheduled</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.interviewScheduled}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Selected</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.selected}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;

