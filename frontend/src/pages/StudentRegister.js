
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    department: '',
    cgpa: '',
    skills: '',
    graduationYear: ''
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
      await axios.post('/api/auth/student/register', formData);
      navigate('/student/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Registration</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input type="text" name="name" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input type="email" name="email" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input type="password" name="password" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Mobile</label>
              <input type="text" name="mobile" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Department</label>
              <input type="text" name="department" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">CGPA</label>
              <input type="number" name="cgpa" step="0.01" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Skills</label>
              <input type="text" name="skills" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Graduation Year</label>
              <input type="number" name="graduationYear" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/student/login" className="text-blue-600">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentRegister;

