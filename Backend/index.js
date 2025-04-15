import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser";
import connectCloudinary from "./src/utils/cloudinary.js";
import adminRouter from "./src/routes/admin.route.js";
import userRouter from "./src/routes/user.route.js";
import doctorRouter from "./src/routes/doctor.route.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectCloudinary();

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB Connection Failed !!! ", err);
  });

app.use("/api/admin", adminRouter);
app.use("/api/user",userRouter );
app.use("/api/doctor",doctorRouter);

