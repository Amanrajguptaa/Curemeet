import express from "express"
import { bookDocAppointment, listUserAppointments } from "../controllers/doctor.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const doctorRouter = express.Router();

doctorRouter.post('/book-appointment',authUser,bookDocAppointment);
doctorRouter.get('/user-appointments',authUser,listUserAppointments);

export default doctorRouter;