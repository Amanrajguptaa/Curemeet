import React from 'react'
import Header from '../components/Header/Header'
import SpecialityMenu from '../components/SpecialityMenu/SpecialityMenu'
import TopDoctors from '../components/TopDoctors/TopDoctors'
import Footer from '../components/Footer/Footer'
import CtaSection from '../components/CtaSection/CtaSection'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <CtaSection/>
    </div>
  )
}

export default Home
