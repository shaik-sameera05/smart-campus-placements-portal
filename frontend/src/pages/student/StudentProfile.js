
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/students/profile').then(res => {
      setProfile(res.data);
      setFormData(res.data);
    }).catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/students/profile', formData);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Update failed');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
      {profile && (
        <div className="max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input type="text" name="name" value={formData.name} className="w-full px-3 py-2 border rounded" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" value={formData.email} className="w-full px-3 py-2 border rounded bg-gray-100" disabled />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Mobile</label>
                <input type="text" name="mobile" value={formData.mobile} className="w-full px-3 py-2 border rounded" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Department</label>
                <input type="text" name="department" value={formData.department} className="w-full px-3 py-2 border rounded" onChange={handleChange} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">CGPA</label>
                <input type="number" step="0.01" name="cgpa" value={formData.cgpa} className="w-full px-3 py-2 border rounded" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Graduation Year</label>
                <input type="number" name="graduationYear" value={formData.graduation_year} className="w-full px-3 py-2 border rounded" onChange={handleChange} />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Skills</label>
              <input type="text" name="skills" value={formData.skills} className="w-full px-3 py-2 border rounded" onChange={handleChange} />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Update Profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;

