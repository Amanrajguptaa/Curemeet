import React, { useState } from 'react'
import axios from "axios";
import { useContext } from 'react';
import { AdminContext } from '../../store/store';

const Login = () => {
  const [loginType, setLoginType] = useState("Admin")

  const {backendUrl,token,setToken} = useContext(AdminContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev,[name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(loginType === 'Admin'){
        const response = await axios.post(backendUrl + '/api/admin/login',formData)        
        if(response.data.success){
          localStorage.setItem('token',response.data.token);
          setToken(response.data.token);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toggleLoginType = () => {
    setLoginType(prev => prev === "Admin" ? "Doctor" : "Admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center">{loginType} Login</h2>
          
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
              placeholder={`Enter ${loginType.toLowerCase()} email`}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
              placeholder={`Enter ${loginType.toLowerCase()} password`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/50 transition-colors"
          >
            Login as {loginType}
          </button>
        </form>
        <button 
            onClick={toggleLoginType}
            className=" mt-5"
          >
            Are you a <span className='text-primary hover:text-green-700'> {loginType === "Admin" ? "Doctor" : "Admin"} </span> ? Login Here
          </button>
      </div>
    </div>
  )
}

export default Login
