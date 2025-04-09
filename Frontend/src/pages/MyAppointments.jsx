import { useState } from 'react';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Richard James",
      specialty: "General physician",
      address: {
        line1: "57th Cross, Richmond",
        line2: "Circle, Church Road, London"
      },
      date: "25, July, 2024",
      time: "8:30 PM",
      status: "upcoming"
    },
    {
      id: 2,
      doctor: "Dr. Richard James",
      specialty: "General physician",
      address: {
        line1: "57th Cross, Richmond",
        line2: "Circle, Church Road, London"
      },
      date: "25, July, 2024",
      time: "8:30 PM",
      status: "pending"
    },
    {
      id: 3,
      doctor: "Dr. Richard James",
      specialty: "General physician",
      address: {
        line1: "57th Cross, Richmond",
        line2: "Circle, Church Road, London"
      },
      date: "25, July, 2024",
      time: "8:30 PM",
      status: "paid"
    }
  ]);

  const handleCancel = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const handlePayment = (id) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? {...appointment, status: "paid"} : appointment
    ));
  };

  return (
    <div className="my-10">
      <h1 className="text-2xl font-medium text-gray-700 mb-6">My Appointments</h1>
      
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 flex">
            <div className="w-32 h-40 bg-blue-100 rounded-lg mr-4 flex items-center justify-center">
              <img 
                src="../../assets/assets_frontend/doc4.png" 
                alt="Doctor" 
                className="rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-medium text-gray-800">{appointment.doctor}</h2>
              <p className="text-gray-600 mb-4">{appointment.specialty}</p>
              
              <div className="mb-2">
                <p className="text-gray-700 font-medium">Address:</p>
                <p className="text-gray-600">{appointment.address.line1}</p>
                <p className="text-gray-600">{appointment.address.line2}</p>
              </div>
              
              <div>
                <p className="text-gray-700 font-medium">Date & Time: 
                  <span className="font-normal"> {appointment.date} | {appointment.time}</span>
                </p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 justify-center">
              {appointment.status === "pending" && (
                <>
                  <button 
                    onClick={() => handlePayment(appointment.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors"
                  >
                    Pay here
                  </button>
                  <button 
                    onClick={() => handleCancel(appointment.id)}
                    className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel appointment
                  </button>
                </>
              )}
              
              {appointment.status === "paid" && (
                <>
                  <button 
                    disabled
                    className="bg-blue-500 opacity-75 text-white py-2 px-6 rounded-lg cursor-not-allowed"
                  >
                    Paid
                  </button>
                  <button 
                    onClick={() => handleCancel(appointment.id)}
                    className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel appointment
                  </button>
                </>
              )}
              
              {appointment.status === "upcoming" && (
                <button 
                  onClick={() => handleCancel(appointment.id)}
                  className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}