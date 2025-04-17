import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Doctors from './pages/Doctors.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/Contact.jsx'
import Appointment from './pages/Appointment.jsx'
import MyProfile from './pages/MyProfile.jsx'
import Auth from './components/Auth/Auth.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import { useContext } from 'react'
import { DoctorsContext } from './store/store.jsx'

const App = () => {
  const {isAuthVisible, setIsAuthVisible} = useContext(DoctorsContext);
  return (
    <div className='mx-4 sm:mx-[5%]'>
      <Navbar isAuthVisible={isAuthVisible} setIsAuthVisible={setIsAuthVisible}/>
      <Auth isAuthVisible={isAuthVisible} setIsAuthVisible={setIsAuthVisible}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
      </Routes>
      <Footer/>

    </div>
  )
}

export default App
