import React from 'react'
import Header from '../components/Header/Header'
import SpecialityMenu from '../components/SpecialityMenu/SpecialityMenu'
import TopDoctors from '../components/TopDoctors/TopDoctors'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
    </div>
  )
}

export default Home
