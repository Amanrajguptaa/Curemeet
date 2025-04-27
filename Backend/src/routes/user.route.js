import express from "express"
import { deleteUser, editUser, getUserCount, getUserProfile, loginUser, registerUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/edit-user',authUser,upload.single("image"),editUser)
userRouter.get('/get-profile',authUser,getUserProfile)
userRouter.get('/get-count',getUserCount)
userRouter.post('/delete',authUser,deleteUser)

export default userRouter