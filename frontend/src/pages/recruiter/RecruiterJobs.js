
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs/recruiter/my-jobs').then(res => setJobs(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Jobs</h1>
        <Link to="/recruiter/jobs/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Job</Link>
      </div>
      <div className="grid gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{job.job_title}</h3>
            <p className="text-gray-600">{job.company_name} - {job.location}</p>
            <p className="text-lg font-semibold text-blue-600">Package: ₹{job.package} LPA</p>
            <p className="text-gray-700">Skills Required: {job.required_skills}</p>
            <p className="text-gray-500">Last Date: {new Date(job.last_date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterJobs;

