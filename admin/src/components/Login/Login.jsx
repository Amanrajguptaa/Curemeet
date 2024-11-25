import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { setAToken } from '../../redux/adminSlice.jsx';
import axios from "axios";

const Login = () => {
  const [loginType, setLoginType] = useState("Admin")

  const {aToken,backendUrl} = useSelector((state)=>state.admin)
  const dispatch = useDispatch();





  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(loginType === 'Admin'){
        const {data} = await axios.post(backendUrl + '/api/admin/login',formData)
        if(data.success){
          console.log(data.token);
          localStorage.setItem('aToken',data.token);
          dispatch(setAToken(data.token));
        }
      }
      else{

      }
    } catch (error) {
      
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder={`Enter ${loginType.toLowerCase()} password`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login as {loginType}
          </button>
        </form>
        <button 
            onClick={toggleLoginType}
            className=" mt-5"
          >
            Are you a <span className='text-blue-500 hover:text-blue-700'> {loginType === "Admin" ? "Doctor" : "Admin"} </span> ? Login Here
          </button>
      </div>
    </div>
  )
}

export default Login
