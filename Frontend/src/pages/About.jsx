import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className="my-16 flex gap-20">
        <div className="w-1/3">
          <img src={assets.about_image}alt="Doctors" className="rounded-lg shadow-lg h-full object-cover" />
        </div>
        <div className="w-1/2 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold mb-6">ABOUT US</h2>
          <p className="text-gray-600 mb-6">
            Welcome to Curemeet, your trusted online healthcare companion. In today's fast-paced world, we understand the challenges individuals face when trying to schedule doctor appointments and managing their health records.
          </p>
          <p className="text-gray-600 mb-6">
            PreciseWise is committed to revolutionizing healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve the patient experience. Our mission is to make healthcare accessible and simplified for managing together with PreciseWise that's how to support you every step of the way.
          </p>
          <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
          <p className="text-gray-600">
            Our vision at Curemeet is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
