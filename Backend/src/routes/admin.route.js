import express from "express";
import {
  addDoctor,
  allDoctors,
  loginAdmin,
} from "../controllers/admin.controller.js";
import { changeAvailablity } from "../controllers/doctor.controller.js";
import upload from "../middlewares/multer.js";
import authAdmin from ".././middlewares/authAdmin.js";
const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);

export default adminRouter;
