
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddJob = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    package: '',
    location: '',
    requiredSkills: '',
    eligibilityCriteria: '',
    cgpaRequirement: '',
    lastDate: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/jobs', formData);
      navigate('/recruiter/jobs');
    } catch (err) {
      setMessage('Failed to add job');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Add New Job</h1>
      {message && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{message}</div>}
      <div className="max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input type="text" name="companyName" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Job Title</label>
              <input type="text" name="jobTitle" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Package (LPA)</label>
              <input type="number" name="package" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Location</label>
              <input type="text" name="location" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Required Skills</label>
              <input type="text" name="requiredSkills" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">CGPA Requirement</label>
              <input type="number" step="0.01" name="cgpaRequirement" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Eligibility Criteria</label>
            <textarea name="eligibilityCriteria" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Last Date</label>
            <input type="date" name="lastDate" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add Job</button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;

