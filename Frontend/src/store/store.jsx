import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const DoctorsContext = createContext();

export const DoctorsProvider = ({ children })=>{
  const [doctors, setDoctors] = useState([]);
  const[token,setToken] = useState('');
  const backendUrl = "http://localhost:8000";

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