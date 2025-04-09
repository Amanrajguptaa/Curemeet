import React from 'react'
import { assets } from "../../assets/assets_frontend/assets.js";

const Footer = () => {
  return (
    <div className='mt-32 mb-5'>
      <div className='flex justify-between items-start'>
        <div className='flex flex-col gap-5'>
          <img src={assets.logo} alt="Prescripto" className='w-40' />
          <p className='text-sm max-w-[250px] text-gray-600'>
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <h3 className='font-semibold'>COMPANY</h3>
          <p className='text-sm text-gray-600'>Home</p>
          <p className='text-sm text-gray-600'>About us</p>
          <p className='text-sm text-gray-600'>Gallery</p>
          <p className='text-sm text-gray-600'>Privacy policy</p>
        </div>

        <div className='flex flex-col gap-3'>
          <h3 className='font-semibold'>GET IN TOUCH</h3>
          <p className='text-sm text-gray-600'>+0-000-000-000</p>
          <p className='text-sm text-gray-600'>prescripto@gmail.com</p>
        </div>
      </div>

      <div className='mt-10 text-center text-sm text-gray-600 border-t-[1px] border-gray-400'>
        <p className='mt-5'>Copyright ©2024 @ Prescripto.dev - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
