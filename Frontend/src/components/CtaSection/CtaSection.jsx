import React from 'react';
import { Link } from 'react-router-dom';
const CtaSection = () => {
  return (
    <div className="bg-primary w-full min-h-[400px] p-8 rounded-lg flex flex-col md:flex-row items-center justify-between relative">
      <div className="text-white mb-6 md:mb-0">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
          Book Appointment
        </h2>
        <h3 className="text-3xl md:text-6xl font-bold leading-tight mb-6">
          With 100+ Trusted Doctors
        </h3>
        <Link href={'/doctors'}>
        <button
          className="bg-white text-gray-700 font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
        >
          Book Now
        </button>
        </Link>
      </div>
        <img 
          src="src/assets/assets_frontend/appointment_img.png" 
          alt="Doctor pointing" 
          className="h-[90%] object-cover absolute right-10 bottom-0"
        />
    </div>
  );
};

export default CtaSection;