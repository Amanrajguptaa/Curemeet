import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AdminContext } from '../../store/store'

const AppointmentsList = () => {
  const {token,backendUrl,loading,appointments,fetchAppointments } = useContext(AdminContext)
  
  useEffect(() => {
    fetchAppointments();
  }, [backendUrl,token]);

  const formatDate = (dateString) => {
    return dateString.replace(/_/g, "/");
  }

  const activeAppointments = appointments.filter(appointment => !appointment.cancelled);

  if (loading) {
    return <div className="w-full p-8 text-center">Loading appointments...</div>;
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold mb-6">Active Appointments</h2>
      <div className="text-sm text-gray-500">{appointments.filter((item)=>item.cancelled!=true).length} appointments available</div>
      </div>
      {activeAppointments && activeAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeAppointments.map((appointment, index) => {
            const doctor = appointment.docData || {};
            const patient = appointment.userData || {};
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative bg-primary/30">
                  {doctor.image && (
                    <div className="relative w-full overflow-hidden">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name || "Doctor"}
                      className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium">Active</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{doctor.name || "Unknown Doctor"}</h3>
                      <p className="text-sm text-primary font-bold">{doctor.speciality || "Specialist"}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      ₹{appointment.amount || doctor.fees}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Date</span>
                      <span className="text-sm font-medium">{formatDate(appointment.slotDate || "N/A")}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Time</span>
                      <span className="text-sm font-medium">{appointment.slotTime || "N/A"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Payment</span>
                      <span className={`text-sm font-medium ${appointment.payment ? "text-green-600" : "text-amber-600"}`}>
                        {appointment.payment ? "Paid" : "Pending"}
                      </span>
                    </div>
                  </div>
                  
                  {patient.name && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm">
                        <span className="text-gray-500">Patient:</span> {patient.name}
                      </p>
                      {patient.email && (
                        <p className="text-sm truncate">
                          <span className="text-gray-500">Email:</span> {patient.email}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No active appointments found</p>
        </div>
      )}
    </div>
  )
}

export default AppointmentsList