import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import  { razorpayPayment,verifyPayment } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post('/payment-razorpay',authUser,razorpayPayment)
paymentRouter.post('/verify',authUser,verifyPayment)

export default paymentRouter;