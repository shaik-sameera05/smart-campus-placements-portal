
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RecruiterRegister = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    password: '',
    mobile: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/auth/recruiter/register', formData);
      navigate('/recruiter/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Recruiter Registration</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Company Name</label>
            <input type="text" name="companyName" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contact Person Name</label>
            <input type="text" name="name" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input type="email" name="email" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input type="password" name="password" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Mobile</label>
            <input type="text" name="mobile" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/recruiter/login" className="text-blue-600">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RecruiterRegister;

