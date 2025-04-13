import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddDoctor from './components/AddDoctor/AddDoctor';
import DoctorsList from './components/DoctorsList/DoctorsList';

const App = () => {
  const  aToken  = true;

  return !aToken ? (
    <div>
      <Navbar />

      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />

        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Routes>
            <Route path="/admin-dashboard" element={<div>Admin Dashboard</div>} />
            <Route path="/all-appointments" element={<div>All Appointments</div>} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList/>} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default App;
