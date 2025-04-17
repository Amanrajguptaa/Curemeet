import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DoctorsContext } from '../../store/store';
import { assets } from "../../assets/assets_frontend/assets.js";


const CtaSection = () => {
  const {token, setIsAuthVisible} = useContext(DoctorsContext);
  return (
    <div className="bg-primary w-full min-h-[400px] p-8 rounded-lg flex flex-col md:flex-row items-center justify-between relative">
      <div className="text-white mb-6 md:mb-0">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
          Book Appointment
        </h2>
        <h3 className="text-3xl md:text-6xl font-bold leading-tight mb-6">
          With 100+ Trusted Doctors
        </h3>
        <div>
        {
          token?(
          <Link onClick={()=>scrollTo(0,0)} to={'/doctors'}>
            <button
              className="bg-white text-gray-700 font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
            >
              Browse Now
            </button>
            </Link>
          ):(
            <button
            onClick={()=>setIsAuthVisible(true)}
              className="bg-white text-gray-700 font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
            >
              Book Now
            </button>
          )
        }
      </div>
        <img 
          src={assets.appointment_img}
          alt="Doctor pointing" 
          className="h-[90%] object-cover absolute right-10 bottom-0"
        />
    </div>
    </div>
  );
};

export default CtaSection;