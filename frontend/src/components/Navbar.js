
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Placement Portal</Link>
        <div className="flex space-x-4">
          {!user ? (
            <>
              <Link to="/" className="text-white hover:text-blue-200">Home</Link>
              <Link to="/about" className="text-white hover:text-blue-200">About</Link>
              <Link to="/contact" className="text-white hover:text-blue-200">Contact</Link>
            </>
          ) : user.role === 'student' ? (
            <>
              <Link to="/student/dashboard" className="text-white hover:text-blue-200">Dashboard</Link>
              <Link to="/student/jobs" className="text-white hover:text-blue-200">Jobs</Link>
              <Link to="/student/applications" className="text-white hover:text-blue-200">Applications</Link>
              <Link to="/student/profile" className="text-white hover:text-blue-200">Profile</Link>
              <button onClick={handleLogout} className="text-white hover:text-blue-200">Logout</button>
            </>
          ) : user.role === 'recruiter' ? (
            <>
              <Link to="/recruiter/dashboard" className="text-white hover:text-blue-200">Dashboard</Link>
              <Link to="/recruiter/jobs" className="text-white hover:text-blue-200">My Jobs</Link>
              <button onClick={handleLogout} className="text-white hover:text-blue-200">Logout</button>
            </>
          ) : user.role === 'admin' ? (
            <>
              <Link to="/admin/dashboard" className="text-white hover:text-blue-200">Dashboard</Link>
              <Link to="/admin/students" className="text-white hover:text-blue-200">Students</Link>
              <Link to="/admin/recruiters" className="text-white hover:text-blue-200">Recruiters</Link>
              <button onClick={handleLogout} className="text-white hover:text-blue-200">Logout</button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

