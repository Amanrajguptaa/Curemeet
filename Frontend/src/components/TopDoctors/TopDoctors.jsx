import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DoctorsContext } from '../../store/store.jsx';

const TopDoctors = () => {
    const navigate = useNavigate();
  const {doctors} = useContext(DoctorsContext)
  return (
    <div className='my-16'>
      <h2 className='text-center font-bold text-4xl'>Top Doctors to Book</h2>
      <p className='text-center mt-5 text-sm'>Simply browse through our extensive list of trusted doctors.</p>

      <div className='grid grid-cols-4 gap-10 mt-10'>
        {
           doctors.slice(0,8).map((item,index)=>(
                <div key={index} onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  window.scrollTo(0, 0);
                }} className="bg-secondary rounded-lg p-4 shadow-lg hover:scale-110 transition-all ease-in-out">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <div className="flex items-center gap-2 mb-2 ">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-500 text-sm">Available</span>
                    </div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.speciality}</p>
                </div>
           ))
        }
      </div>

      <div className='flex  justify-center items-center mt-10'>
        <Link onClick={()=>scrollTo(0,0)} to={'/doctors'}>
        <button className='px-16 py-3 rounded-3xl bg-gray-200 text-gray-600'>More</button>
        </Link>
        </div>
    </div>
  )
}

export default TopDoctors
