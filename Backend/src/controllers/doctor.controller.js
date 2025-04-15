import appointmentModel from "../models/appointment.model.js";
import doctorModel from "../models/doctor.model.js";
import userModel from "../models/user.model.js";

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availibilty Changed" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const bookDocAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not Available" });
    }
    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot is not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    delete docData.slots_booked;

    const userData = await userModel.findById(userId).select("-password");

    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);

    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId,{slots_booked});

    return res.json({
      success: true,
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const listUserAppointments = async(req,res) =>{
  try {
    const {userId} = req.body;
    const userAppointmentData = await appointmentModel.find({userId});

    return res.json({
      success:true,
      message:"User Appointments",
      userAppointmentData
    })
  
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }

}

const cancelDocAppointmnet = async(req,res)=>{
  try {
    const {userId,appointmentId} = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
  
    if(appointmentData.userId !== userId){
      return res.json({success:false,message:"User isn't Authorized"})
    }
  
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
  
    const{docId,slotDate,slotTime} = appointmentData;
  
    const docData = await doctorModel.findById(docId);
  
    const slots_booked = docData.slots_booked;
  
    slots_booked[slotDate] = slots_booked[slotDate].filter(e =>e !== slotTime)
  
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
  
    return res.json({success:true,message:"Appointment Cancelled"})
  
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const editDoctor = async (req, res) => {};

export { changeAvailablity,bookDocAppointment,listUserAppointments,cancelDocAppointmnet };
