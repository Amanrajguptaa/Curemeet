import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaCalendarAlt, FaUserMd, FaUserPlus } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="h-screen w-72 p-4 mt-10">
      <div className="flex flex-col gap-4">
        <NavLink 
          to="/admin-dashboard" 
          className={({isActive}) => `
            flex items-center gap-3 p-2 
            hover:bg-green-400 rounded
            ${isActive ? 'bg-green-600 text-white' : ''}
          `}
        >
          <FaHome className={({isActive}) => isActive ? "text-white" : "text-gray-600"} />
          <span className={({isActive}) => isActive ? "text-white" : "text-gray-700"}>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/all-appointments"
          className={({isActive}) => `
            flex items-center gap-3 p-2 
            hover:bg-green-400 rounded
            ${isActive ? 'bg-green-600 text-white' : ''}
          `}
        >
          <FaCalendarAlt className={({isActive}) => isActive ? "text-white" : "text-gray-600"} />
          <span className={({isActive}) => isActive ? "text-white" : "text-gray-700"}>Appointments</span>
        </NavLink>
        
        <NavLink 
          to="/add-doctor"
          className={({isActive}) => `
            flex items-center gap-3 p-2 
            hover:bg-green-400 rounded
            ${isActive ? 'bg-green-600 text-white' : ''}
          `}
        >
          <FaUserPlus className={({isActive}) => isActive ? "text-white" : "text-gray-600"} />
          <span className={({isActive}) => isActive ? "text-white" : "text-gray-700"}>Add Doctor</span>
        </NavLink>
        
        <NavLink 
          to="/doctor-list"
          className={({isActive}) => `
            flex items-center gap-3 p-2 
            hover:bg-green-400 rounded
            ${isActive ? 'bg-green-600 text-white' : ''}
          `}
        >
          <FaUserMd className={({isActive}) => isActive ? "text-white" : "text-gray-600"} />
          <span className={({isActive}) => isActive ? "text-white" : "text-gray-700"}>Doctors List</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
