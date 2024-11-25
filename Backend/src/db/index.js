import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
        console.log(`DATABASE CONNECTED AT : ${connectionInstance.connection.host}`);
        } catch (error) {
         console.log("DB CONNECT FAILED",error);
         
    }
    
}

export default connectDB
