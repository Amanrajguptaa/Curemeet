import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const adminSlice = createSlice({
    name:'admin',
    initialState:{
        aToken:localStorage.getItem('aToken')?localStorage.getItem('aToken'):'',
        backendUrl:"http://localhost:8000",
        getDoctors : async (state) => {
            try {
              const { data } = await axios.get(state.backendUrl + '/api/admin/all-doctors', {
                headers: {
                  aToken:state.aToken
                }
              })
              if (data.success) {
                return data.doctors
              }
            } catch (error) {
              console.log(error);
            }
          }        
    },
    reducers:{
        setAToken:(state,action)=>{
            state.aToken = action.payload;
        },
    },
});

export const {setAToken} = adminSlice.actions;
export default adminSlice.reducer;