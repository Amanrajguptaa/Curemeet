import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from "./doctorSlice";

const store =configureStore({
  reducer:{
      doctors:doctorSlice
  }
});

export default store