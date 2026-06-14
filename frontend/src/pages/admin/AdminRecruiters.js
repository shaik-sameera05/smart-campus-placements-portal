
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    axios.get('/api/recruiters').then(res => setRecruiters(res.data)).catch(err => console.error(err));
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/recruiters/${id}/approve`);
      setRecruiters(recruiters.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlock = async (id) => {
    try {
      await axios.put(`/api/recruiters/${id}/block`);
      setRecruiters(recruiters.map(r => r.id === id ? { ...r, status: 'blocked' } : r));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Recruiters</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recruiters.map(recruiter => (
              <tr key={recruiter.id}>
                <td className="px-6 py-4 whitespace-nowrap">{recruiter.company_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{recruiter.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{recruiter.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    recruiter.status === 'approved' ? 'bg-green-100 text-green-800' :
                    recruiter.status === 'blocked' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>{recruiter.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {recruiter.status === 'pending' && (
                    <button onClick={() => handleApprove(recruiter.id)} className="text-green-600 hover:text-green-800 mr-3">Approve</button>
                  )}
                  {recruiter.status === 'approved' && (
                    <button onClick={() => handleBlock(recruiter.id)} className="text-red-600 hover:text-red-800">Block</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecruiters;

