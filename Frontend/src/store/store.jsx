import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const DoctorsContext = createContext();

export const DoctorsProvider = ({ children })=>{
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const[token,setToken] = useState('');
  const backendUrl = "https://curemeet-production.up.railway.app";

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/list-doctors`);
      setDoctors(response.data.doctors);
    } catch (err) {
    } 
  }

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
    toast.success("Logged Out Successfully")
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(()=>{
    const tokenData = localStorage.getItem('token');
    if(tokenData){
      setToken(tokenData);
    }
  },[])

  const value = {
    isAuthVisible,
    setIsAuthVisible,
    backendUrl,
    token,
    setToken,
    logOut,
    doctors
  }

  return (
    <DoctorsContext.Provider value={value}>
      {children}
    </DoctorsContext.Provider>
  );
}