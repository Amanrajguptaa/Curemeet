import express from "express";
import {
  addDoctor,
  listDoctors,
  loginAdmin,
} from "../controllers/admin.controller.js";
import { changeAvailablity } from "../controllers/doctor.controller.js";
import upload from "../middlewares/multer.js";
import {authAdmin} from ".././middlewares/auth.middleware.js";
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/list-doctors", listDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);

export default adminRouter;
