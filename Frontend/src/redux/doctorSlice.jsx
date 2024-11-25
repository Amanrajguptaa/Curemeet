import { createSlice } from "@reduxjs/toolkit";
import { doctors } from "../assets/assets_frontend/assets.js";

const doctorSlice = createSlice({
  name:"doctors",
  initialState:{
    doctors:doctors
  },
  reducers:{},
})

export const selectDoctors = (state) => state.doctors.doctors;
export default doctorSlice.reducer;