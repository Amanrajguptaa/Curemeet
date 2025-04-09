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
    // <div>
    //   {docList.map((item, index) => (
    //     <div key={index}>{item.name}</div> 
    //   ))}
    // </div>
    <div className="w-full  p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6,7,8,9].map((item, index) => (
            <div
              key={index}
              className="p-4 bg-blue-50 shadow-md rounded-lg hover:-translate-y-3 transition-all ease-linear transition-300"
              >
              <div className="relative">
                <img 
                  // src={item.image} 
                  // alt={item.name}
                  className="w-full h-48 object-cover rounded-lg border border-gray-300/20"
                />
                <div className=" flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-500">Available</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-1">Name</h3>
              <p className="text-gray-500 text-sm">Speciality</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default DoctorsList
