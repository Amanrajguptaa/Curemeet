import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DoctorsContext } from '../../store/store';


const Auth = ({isAuthVisible,setIsAuthVisible }) => {

  const [activeTab, setActiveTab] = useState('login');
  
  const showAuth = () => {
    setIsAuthVisible(true);
  };
  
  const hideAuth = () => {
    setIsAuthVisible(false);
    if (onClose) onClose();
  };
  
  if (!isAuthVisible) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative overflow-hidden">
        <button 
          onClick={hideAuth}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-6">
          {activeTab === 'login' ? (
            <LoginForm setActiveTab={setActiveTab} />
          ) : (
            <SignupForm setActiveTab={setActiveTab} />
          )}
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ setActiveTab }) => {
  const {backendUrl,setToken} = useContext(DoctorsContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${backendUrl}/api/user/login`,{email,password});
    setToken(localStorage.setItem('token',response.data.token));
    window.location.reload();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-medium text-gray-800">Login</h1>
        <p className="text-gray-500 mt-2">Welcome back! Please sign in to continue</p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="text-right">
          <a href="#" className="text-primary text-sm">Forgot password?</a>
        </div>
        
        <button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/50  text-white py-3 rounded-full font-medium transition duration-200"
        >
          Login
        </button>
        
        <div className="text-center text-gray-500 text-sm mt-4">
          Don't have an account? <button type="button" onClick={() => setActiveTab('signup')} className="text-primary">Sign up</button>
        </div>
      </div>
    </form>
  );
};

const SignupForm = ({ setActiveTab }) => {
  const {backendUrl,setToken} = useContext(DoctorsContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${backendUrl}/api/user/register`,{name,email,password});
    setToken(localStorage.setItem('token',response.data.token));
    window.location.reload();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-medium text-gray-800">Sign Up</h1>
        <p className="text-gray-500 mt-2">Create an account to get started</p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/50 text-white py-3 rounded-full font-medium transition duration-200"
        >
          Sign Up
        </button>
        
        <div className="text-center text-gray-500 text-sm mt-4">
          Already have an account? <button type="button" onClick={() => setActiveTab('login')} className="text-primary">Login</button>
        </div>
      </div>
    </form>
  );
};

export default Auth;