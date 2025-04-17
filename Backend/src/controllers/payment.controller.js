import razorpay from "razorpay";
import appointmentModel from "../models/appointment.model.js";

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const razorpayPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not Found",
      });
    }

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    const order = await razorpayInstance.orders.create(options);

    return res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async(req,res) =>{
  try {
    const {razorpay_order_id} = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
  
    if(orderInfo.status === "paid"){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
      return res.json({
        success:true,
        message:"Payment Successful"
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export  {razorpayPayment,verifyPayment};
