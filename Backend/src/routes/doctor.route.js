import express from "express"
import { bookDocAppointment, cancelDocAppointmnet, listUserAppointments } from "../controllers/doctor.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const doctorRouter = express.Router();

doctorRouter.post('/book-appointment',authUser,bookDocAppointment);
doctorRouter.get('/user-appointments',authUser,listUserAppointments);
doctorRouter.post('/cancel-appointment',authUser,cancelDocAppointmnet);

export default doctorRouter;