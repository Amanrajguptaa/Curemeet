import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className="flex items-center justify-center gap-20 my-16">
      
      <div className="w-1/3">
        <img src={assets.contact_image} alt="Contact" className="w-full h-full object-cover rounded-lg" />
      </div>

      <div className="w-1/2">
        <h2 className="text-4xl font-bold text-gray-700 mb-8">CONTACT US</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">OUR OFFICE</h3>
            <p className="text-gray-600">00000 Willms Station</p>
            <p className="text-gray-600">Suite 000, Washington, USA</p>
          </div>

          <div>
            <p className="text-gray-600">Tel: (000) 000-0000</p>
            <p className="text-gray-600">Email: prescripto@gmail.com</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">CAREERS AT PRESCRIPTO</h3>
            <p className="text-gray-600 mb-4">Learn more about our teams and job openings.</p>
            <button className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-50 transition-colors">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
