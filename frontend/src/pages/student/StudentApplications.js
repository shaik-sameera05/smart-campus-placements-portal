
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('/api/applications/student/my-applications').then(res => setApplications(res.data)).catch(err => console.error(err));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Shortlisted': return 'bg-purple-100 text-purple-800';
      case 'Interview Scheduled': return 'bg-indigo-100 text-indigo-800';
      case 'Selected': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map(app => (
              <tr key={app.id}>
                <td className="px-6 py-4 whitespace-nowrap">{app.company_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.job_title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>{app.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(app.applied_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentApplications;

