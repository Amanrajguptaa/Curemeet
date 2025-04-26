import React from 'react';

const Dashboard = () => {
    
  return (
    <div className="h-screen w-full">      
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatCard title="Total Patients" value="1,248" bgColor="bg-blue-500" />
            <StatCard title="Today's Appointments" value="42" bgColor="bg-green-500" />
            <StatCard title="Active Doctors" value="32" bgColor="bg-purple-500" />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Appointments</h3>
              <button className="text-teal-500 text-sm font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Patient</th>
                    <th className="text-left py-3 px-2">Doctor</th>
                    <th className="text-left py-3 px-2">Date</th>
                    <th className="text-left py-3 px-2">Time</th>
                    <th className="text-left py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <AppointmentRow name="Sarah Johnson" doctor="Dr. Smith" date="Apr 25, 2025" time="10:00 AM" status="Completed" />
                  <AppointmentRow name="Mike Peterson" doctor="Dr. Garcia" date="Apr 26, 2025" time="2:30 PM" status="Upcoming" />
                  <AppointmentRow name="Emma Wilson" doctor="Dr. Lee" date="Apr 26, 2025" time="4:15 PM" status="Upcoming" />
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Available Doctors</h3>
              <button className="text-teal-500 text-sm font-medium">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DoctorCard name="Dr. Amanda Smith" specialty="Cardiologist" patients="124" />
              <DoctorCard name="Dr. David Garcia" specialty="Neurologist" patients="98" />
              <DoctorCard name="Dr. Sarah Lee" specialty="Pediatrician" patients="156" />
            </div>
          </div>
        </main>
    </div>
  );
};

const StatCard = ({ title, value, bgColor }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <div className={`${bgColor} h-2`}></div>
      <div className="p-6 bg-white">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
};

const AppointmentRow = ({ name, doctor, date, time, status }) => {
  const statusColor = status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-2">{name}</td>
      <td className="py-3 px-2">{doctor}</td>
      <td className="py-3 px-2">{date}</td>
      <td className="py-3 px-2">{time}</td>
      <td className="py-3 px-2">
        <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

const DoctorCard = ({ name, specialty, patients }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center font-medium mr-3">
          {name.split(' ')[1][0]}
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-500">{specialty}</p>
        </div>
      </div>
      <div className="flex items-center text-sm">
        <span className="text-gray-500">Total Patients:</span>
        <span className="ml-1 font-medium">{patients}</span>
      </div>
    </div>
  );
};

export default Dashboard;