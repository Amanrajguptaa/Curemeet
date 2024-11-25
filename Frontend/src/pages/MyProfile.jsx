import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {

  const [userData,setUserData] = useState({
    name:"User ji",
    image:assets.profile_pic,
    email:"user@gmail.com",
    phone:'+91 0000000000',
    address:{
      line1:"57th cross road",
      line2:"new lane bangalore"
    },
    gender:'Male',
    dob:'2005-01-20'
  })

  return (
    <div className="py-16">
      <div className="flex items-center gap-8 mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <img className='rounded-full' src={userData.image} alt={userData.name} />
        </div>
        <h1 className="text-3xl font-bold">{userData.name}</h1>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">CONTACT INFORMATION</h2>
          <div className="space-y-4">
            <div className="flex">
              <span className="w-24 text-gray-600">Email Id:</span>
              <span className="text-blue-500">{userData.email}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-600">Phone:</span>
              <span>{userData.phone}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-600">Address:</span>
              <span>{userData.address.line1}, {userData.address.line2}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">BASIC INFORMATION</h2>
          <div className="space-y-4">
            <div className="flex">
              <span className="w-24 text-gray-600">Gender:</span>
              <span>{userData.gender}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-600">Birthday:</span>
              <span>{userData.dob}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5 flex  gap-5'>
        <button className=' border border-gray-500 px-6 py-2 rounded-3xl bg-gray-300'>Edit</button>
        <button className=' border border-gray-500 px-6 py-2 rounded-3xl bg-gray-300'>Save Information</button>
      </div>
    </div>
  )
}

export default MyProfile
