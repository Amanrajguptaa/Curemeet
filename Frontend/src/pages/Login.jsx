import React, { useState } from 'react'

const Login = () => {

  const[state,setState] = useState('Sign Up')

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[name,setName] = useState('')

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
  }

  return (
    <div className='mt-12 pb-20'>
      <form onSubmit={onSubmitHandler} className="max-w-sm mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl text-gray-700 font-bold mb-2">{state ==="Sign Up" ? "Create Account" :"Login"}</h2>
        <p className="text-gray-600 text-sm mb-6">Please {state ==="Sign Up" ? "sign up" :"login"} to book appointment</p>

{
  state=="Sign Up"?<div className="mb-4">
  <label className="block text-gray-700 mb-2">Full Name</label>
  <input 
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full p-2 border rounded"
  />
</div> : ""
}
        

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
         {state ==="Sign Up" ? "Create Account" :"Login"}
        </button>

        <p className="mt-4 text-center text-gray-600">
        {state ==="Sign Up" ? "Already have an account?" :"Create a new account?"}
          <span onClick={state =="Sign Up"?()=>setState('Login'):()=>setState('Sign Up')} className="text-blue-500 hover:underline ml-1 cursor-pointer">{state ==="Sign Up" ? "Login here" :"Sign Up here"}</span>
        </p>
      </form>
    </div>
  )
}

export default Login
