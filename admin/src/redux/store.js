import { configureStore } from "@reduxjs/toolkit";
import adminSlice from './adminSlice.jsx'
const store = configureStore({
    reducer:{
        admin:adminSlice
    }
})

export default store