import React from 'react'
import { specialityData } from "../../assets/assets_frontend/assets.js";
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='my-16'>
      <h2 className='text-center font-bold text-4xl'>Find by Speciality</h2>
      <p className='text-center mt-5 text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      <div className=' mt-10 flex justify-center items-center gap-10'>
        {
            specialityData.map((item,index)=>(
                <Link onClick={()=>scrollTo(0,0)} to={`/doctors/${item.speciality}`}>
                <div className='flex flex-col justify-center items-center hover:-translate-y-2 transition-all ease-in-out'>
                    <img className='h-28 w-28' src={item.image} alt="" />
                    <p className='text-sm font-bold'>{item.speciality}</p>
                </div>
                </Link>
            ))
        } 
      </div>
    </div>
  )
}

export default SpecialityMenu
