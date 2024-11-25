import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const DoctorsList = () => {
  const { aToken, backendUrl } = useSelector((state) => state.admin)
  const [docList, setDocList] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', {
          headers: {
            aToken
          }
        })
        if (data.success) {
          setDocList(data.doctors);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDoctors();
  }, []) 

  return (
    <div>
      {docList.map((item, index) => (
        <div key={index}>{item.name}</div> 
      ))}
    </div>
  )
}

export default DoctorsList
