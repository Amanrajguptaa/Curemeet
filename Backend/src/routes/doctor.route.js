import express from "express"
import { bookDocAppointment } from "../controllers/doctor.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const doctorRouter = express.Router();

doctorRouter.post('/book-appointment',authUser,bookDocAppointment);

export default doctorRouter;