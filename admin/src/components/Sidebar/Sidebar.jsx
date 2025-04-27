import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUserMd, FaUserPlus } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-72 h-full py-32 px-4 bg-gray-50 z-10 border-r-2 fixed">
      <div className="flex flex-col gap-4">
        <NavLink 
          to="/admin-dashboard" 
          className={({ isActive }) => `
            flex items-center gap-3 p-2 rounded hover:bg-primary/70
            ${isActive ? 'bg-primary text-white' : 'text-gray-700'}
          `}
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/all-appointments" 
          className={({ isActive }) => `
            flex items-center gap-3 p-2 rounded hover:bg-primary/70
            ${isActive ? 'bg-primary text-white' : 'text-gray-700'}
          `}
        >
          <FaCalendarAlt />
          <span>Appointments</span>
        </NavLink>

        <NavLink 
          to="/add-doctor" 
          className={({ isActive }) => `
            flex items-center gap-3 p-2 rounded hover:bg-primary/70
            ${isActive ? 'bg-primary text-white' : 'text-gray-700'}
          `}
        >
          <FaUserPlus />
          <span>Add Doctor</span>
        </NavLink>

        <NavLink 
          to="/doctor-list" 
          className={({ isActive }) => `
            flex items-center gap-3 p-2 rounded hover:bg-primary/70
            ${isActive ? 'bg-primary text-white' : 'text-gray-700'}
          `}
        >
          <FaUserMd />
          <span>Doctors List</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
