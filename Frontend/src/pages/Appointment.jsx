import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors/RelatedDoctors";
import { DoctorsContext } from "../store/store";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [doctorSlot, setDoctorSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const { doctors, backendUrl, token,setIsAuthVisible } = useContext(DoctorsContext);
  const { docId } = useParams();

  const bookAppointment = async () => {
    if (!token) {
      setIsAuthVisible(true); 
    }

    if (!slotTime) {
      return; 
    }

    try {
      const date = doctorSlot[slotIndex][0].datetime;

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear(); 

      const slotDate = `${day}_${month}_${year}`; 

      const response = await axios.post(
        `${backendUrl}/api/doctor/book-appointment`,
        { docId, slotDate, slotTime },
        {
          headers: {
            token: token,
          },
        }
      );
      if(response.data.success){
        navigate('/my-appointments')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAvailableSlots = async () => {
    setDoctorSlot([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      let endTime = new Date(currDate); 
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(
          currDate.getHours() > 10 ? currDate.getHours() + 1 : 10
        );
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currDate.getDate();
        let month = currDate.getMonth()+1;
        let year = currDate.getFullYear();

        const slotDate = day+ "_" + month +"_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ?false : true;

        if(isSlotAvailable){
          timeSlots.push({
            datetime: new Date(currDate),
            time: formattedTime,
          });
        }

        currDate.setMinutes(currDate.getMinutes() + 30);
      }

      setDoctorSlot((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    const doctor = doctors.find((item) => item._id === docId);
    setDocInfo(doctor);
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) { 
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    <div>
      {docInfo ? ( 
        <>
          <div className="flex justify-center items-center gap-10 bg-white rounded-lg border border-black my-10">
            <div className="bg-primary/50 rounded-md">
              <img
                src={docInfo.image}
                alt={docInfo.name}
                className="w-[900px] h-[300px] object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-4xl font-bold text-gray-700">
                  {docInfo.name}
                </h2>
                <img src={assets.verified_icon} alt="" />
              </div>
              <div className="flex mt-2">
                <p className="text-gray-600">{docInfo.degree} - </p>
                <p className="text-gray-600">&nbsp;{docInfo.speciality}</p>
                <span className="text-xs flex justify-center items-center border border-gray-400 rounded-3xl px-3 ml-3">
                  {docInfo.experience}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-gray-800">About</p>
                <p className="text-gray-500 text-sm">{docInfo.about}</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-700">Appointment fee: ₹{docInfo.fees}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-3xl font-bold text-gray-600">Booking Slots</p>
            <div className="flex gap-4 mt-4">
              {doctorSlot.length > 0 && 
                doctorSlot.map((item, index) => (
                  <div
                    onClick={() => setSlotIndex(index)}
                    key={index}
                    className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border ${
                      slotIndex === index ? "bg-primary text-white" : ""
                    } cursor-pointer hover:bg-tertiary transition-all`}
                  >
                    <p className="text-sm font-medium">
                      {item[0] &&
                        daysOfWeek[item[0].datetime.getDay()]
                          .substring(0, 3)
                          .toUpperCase()}
                    </p>
                    <p className="text-sm">
                      {item[0] && item[0].datetime.getDate()}
                    </p>
                  </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {doctorSlot.length > 0 &&
                doctorSlot[slotIndex]?.map((item, index) => ( 
                  <div
                    onClick={() => setSlotTime(item.time)}
                    key={index}
                    className={`px-4 py-2 rounded-full border border-gray-300 text-sm cursor-pointer transition-all duration-200
                ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "hover:bg-tertiary"
                }`}
                  >
                    {item.time}
                  </div>
                ))}
            </div>

            <div>
              <button
                onClick={bookAppointment}
                className="px-5 py-3 bg-primary text-white rounded-3xl mt-6"
              >
                Book an appointment
              </button>
            </div>
          </div>

          <div>
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl text-gray-500">Loading Doctor Info...</p>
        </div>
      )}
    </div>
  );
};

export default Appointment;