import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddDoctor from './components/AddDoctor/AddDoctor';
import DoctorsList from './components/DoctorsList/DoctorsList';
import { AdminContext } from './store/store';
import AppointmentsList from './components/AppointmentsList/AppointmentsList';
import Dashboard from './components/DashBoard/DashBoard';

const App = () => {
  const  {token} = useContext(AdminContext);

  return token ? (
    <div>
      <Navbar />

      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />

        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard/>} />
            <Route path="/all-appointments" element={<AppointmentsList/>} />
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
