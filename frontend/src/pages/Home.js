
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Smart Campus Placement Portal</h1>
          <p className="text-xl mb-8">Connecting students, recruiters, and colleges for seamless campus placements</p>
          {!user && (
            <div className="flex justify-center space-x-4">
              <Link to="/student/login" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">Student Login</Link>
              <Link to="/recruiter/login" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">Recruiter Login</Link>
              <Link to="/admin/login" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">Admin Login</Link>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">For Students</h3>
            <p>Find jobs, apply easily, track applications, and manage your profile</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">For Recruiters</h3>
            <p>Post jobs, review applications, shortlist candidates, and schedule interviews</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">For Colleges</h3>
            <p>Manage students, approve recruiters, and track placement statistics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

