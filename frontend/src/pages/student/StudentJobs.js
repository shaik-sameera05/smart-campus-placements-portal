
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      axios.get('/api/jobs').then(res => setJobs(res.data)).catch(err => console.error(err));
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    axios.post(`/api/applications/jobs/${jobId}/apply`).then(() => {
      setMessage('Applied successfully!');
      setTimeout(() => setMessage(''), 3000);
    }).catch(err => {
      setMessage(err.response?.data?.message || 'Application failed');
      setTimeout(() => setMessage(''), 3000);
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
      {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
      <div className="grid gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{job.job_title}</h3>
            <p className="text-gray-600">{job.company_name} - {job.location}</p>
            <p className="text-lg font-semibold text-blue-600">Package: ₹{job.package} LPA</p>
            <p className="text-gray-700">Skills Required: {job.required_skills}</p>
            <p className="text-gray-500">Last Date: {new Date(job.last_date).toLocaleDateString()}</p>
            <button onClick={() => handleApply(job.id)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentJobs;

