"use client";
import React from 'react'
import { assets } from "../../assets/assets_frontend/assets.js";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Dr. John Doe",
    designation: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Dr. Robert Johnson",
    designation: "Neurologist",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Dr. Lana Smith",
    designation: "Pediatrician",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
];

const Header = () => {
  return (
    <div className='my-16'>
      <div className='flex justify-between items-center bg-primary px-10 rounded-2xl'>
        {/* left side */}
        <div>
          <h1 className='text-6xl font-bold text-white '>Book Appointment <br />
          With Trusted <br /> Doctors</h1>
          <div className='flex mt-5'>
          <div className="flex mr-6">
              <AnimatedTooltip items={people} />
            </div>
            <p className='text-white  '>Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.</p>
          </div>
          <a href="#speciality"> <button className='mt-5 bg-white text-black px-5 py-3 rounded-3xl hover:scale-105 flex justify-center items-center gap-5'>Book appointment <img src={assets.arrow_icon} alt="" /></button></a>
        </div>

        {/* right side */}
        <div>
          <img className='' src={assets.header_img} alt="" />
        </div>

      </div>
    </div>
  )
}

export default Header
