import axios from "axios";
import { useState } from "react";
import { createContext } from "react";


export const AdminContext = createContext();

export const AdminProvider = ({children}) =>{
    const [token,setToken] = useState(localStorage.getItem('token') || '')
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [userCount,setUserCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backendUrl = "http://localhost:8000";

    const getUserCount = async () =>{
      try {
        const response = await axios.get(`${backendUrl}/api/user/get-count`);
        setUserCount(response.data.userCount);
      } catch (error) {
        
      }
    }

      const fetchAppointments = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${backendUrl}/api/admin/list-appointments`, {
            headers: {
              token: token
            }
          });
          setAppointments(response.data.appointmentData);  
          console.log(response.data.appointmentData)        
        } catch (err) {
          console.error("Error fetching appointments:", err);
        } finally {
          setLoading(false);
        }
      }

      const fetchDoctors = async () => {
          setLoading(true);
          try {
            const response = await axios.get(`${backendUrl}/api/admin/list-doctors`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setDoctors(response.data.doctors);
            console.log(response.data.doctors)        
            setLoading(false);
          } catch (err) {
            console.error("Error fetching doctors:", err);
            setError("Failed to load doctors. Please try again.");
            setLoading(false);
          }
      }

    const value = {
        loading,
        error,
        backendUrl,
        token,
        setToken,
        appointments,
        doctors,
        fetchAppointments,
        fetchDoctors,
        userCount,
        getUserCount
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}