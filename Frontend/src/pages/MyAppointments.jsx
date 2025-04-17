import { useContext, useEffect, useState } from "react";
import { DoctorsContext } from "../store/store";
import axios from "axios";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token, backendUrl } = useContext(DoctorsContext);

  const getAppointmentData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${backendUrl}/api/doctor/user-appointments`,
        {
          headers: {
            token: token || localStorage.getItem("token"),
          },
        }
      );
      setAppointments(response.data.userAppointmentData);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments");
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            token: token,
          },
        }
      );
      getAppointmentData();
    } catch (error) {
      console.error("Error in Cancelling:", err);
      setError("Failed to Cancel Appointment");
      setIsLoading(false);
    }
  };

  const initPay = (order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:"Appointment Payment",
      description:"Payment for Doctor Appointment",
      order_id:order.id,
      receipt:order.receipt,
      handler : async (response) =>{
        try {
          const responseData = await axios.post(`${backendUrl}/api/payment/verify`,response,{headers:{token:token}})
          getAppointmentData();
        } catch (error) {
          console.log(error);
          
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const paymentHandler = async (appointmentId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/payment/payment-razorpay`,{appointmentId},{headers:{token:token}});
      if(response.data.success){
        initPay(response.data.order)
      }
    } catch (error) {
      console.error("Error in Payment:", err);
      setError("Failed to Pay for Appointment");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAppointmentData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center my-10">Loading appointments...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 my-10">{error}</div>;
  }

  return (
    <div className="my-10">
      <h1 className="text-2xl font-medium text-gray-700 mb-6">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <div className="text-gray-500">No appointments found.</div>
      ) : (
        <div className="space-y-4">
          {appointments?.map((appointment) => (
            <div
              key={appointment._id}
              className="border border-gray-200 rounded-lg p-4 flex"
            >
              <div className="w-40 h-44 bg-primary/50 rounded-lg mr-4 flex items-center justify-center">
                <img
                  src={
                    appointment.docData.image ||
                    "../../assets/assets_frontend/doc4.png"
                  }
                  alt="Doctor"
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-medium text-gray-800">
                  {appointment.docData.name}
                </h2>

                <div className="mb-2">
                  <p className="text-gray-700 font-medium mt-3">
                    Appointment Details:
                  </p>
                  <p className="text-gray-600">Amount: ₹{appointment.amount}</p>
                  <p className="text-gray-600">
                    {appointment.docData.address.line1}
                    <br />
                    {appointment.docData.address.line2}
                  </p>
                </div>

                <div>
                  <p className="text-gray-700 font-medium">
                    Date & Time:
                    <span className="font-normal">
                      {" "}
                      {appointment.slotDate.replace(/_/g, "/")} |{" "}
                      {appointment.slotTime}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-3 justify-center">
                {!appointment.cancelled && !appointment.payment && (
                  <>
                    <button
                      onClick={() => paymentHandler(appointment._id)}
                      className="bg-primary hover:bg-primary/70 text-white py-3 px-6 rounded-lg transition-colors"
                    >
                      Pay here
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appointment._id)}
                      className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel appointment
                    </button>
                  </>
                )}

                {!appointment.cancelled && appointment.payment && (
                  <>
                    <button
                      disabled
                      className="bg-primary/70 text-white py-3 px-6 rounded-lg cursor-not-allowed"
                    >
                      Paid
                    </button>
                  </>
                )}

                {appointment.cancelled && (
                  <button
                    disabled
                    className="bg-red-100 text-red-500 py-3 px-6 rounded-lg border border-red-500"
                  >
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
