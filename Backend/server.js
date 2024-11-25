import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser"
import connectCloudinary from "./src/utils/cloudinary.js";
import adminRouter from "./src/routes/admin.route.js";

const app = express();
const port = process.env.PORT || 4000

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

connectCloudinary()

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`⚙️ Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.use('/api/admin',adminRouter)
//localhost:8000/api/admin/add-doctor

app.get('/',(req,res)=>{
    res.send("Hello Ji")
})

