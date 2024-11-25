import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDoctors } from '../redux/doctorSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { specialityData } from "../assets/assets_frontend/assets.js";

const Doctors = () => {

  const navigate = useNavigate();

  const doctorslist = useSelector(selectDoctors);
  const [specialisation, setSpecialisation] = useState('');
  const { speciality } = useParams();

  useEffect(() => {
    setSpecialisation(speciality);
  }, [speciality]);

  const displayDoctors = specialisation
    ? doctorslist.filter((item) => item.speciality === specialisation)
    : doctorslist;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-[30%] bg-white p-6 border-r border-gray-200">
        <h2 className="text-sm ">Browse through the doctors specialist.</h2>
        <div className="space-y-3 mt-5">
          {specialityData.map((item, index) => (
            <button
              key={index}
              onClick={() => setSpecialisation(item.speciality)}
              className={`w-full border border-gray-400 py-2 text-md text-gray-700 bg-gray-200 hover:bg-blue-200 hover:text-blue-700 transition duration-300 rounded-md ${
                specialisation === item.speciality ? 'bg-blue-300 text-white' : ''
              }`}
            >
              {item.speciality}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full md:w-[80%]  p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayDoctors.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg hover:-translate-y-3 transition-all ease-linear transition-300"
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
                          >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className=" flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-500">Available</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-1">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.speciality}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
