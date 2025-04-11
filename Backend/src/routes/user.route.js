import express from "express"
import { deleteUser, editUser, getUserProfile, loginUser, registerUser } from "../controllers/user.controller";
import { authUser } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/edit',authUser,editUser)
userRouter.post('/get-user',authUser,getUserProfile)
userRouter.post('/edit',authUser,deleteUser)

export default userRouter