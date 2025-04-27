import React, { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { assets } from '../../assets/assets_admin/assets.js';
import { AdminContext } from '../../store/store.jsx';

const Navbar = () => {
  const { token, setToken } = useContext(AdminContext);

  const logoutHandler = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <div className="shadow-sm border-b-2 bg-white fixed top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <img className="h-10" src={assets.admin_logo} alt="Admin Logo" />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-2xl text-gray-600" />
              <span className="text-gray-700">Admin</span>
            </div>
            <button 
              onClick={logoutHandler}
              className="bg-primary hover:bg-primary/70 text-white px-6 py-2 rounded-3xl transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
