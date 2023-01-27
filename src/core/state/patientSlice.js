import { createSlice } from "@reduxjs/toolkit";
export const patientSlice = createSlice({
    name:"patientSlice",
    initialState:{
        name:"",
        patientId:"",
        leftEyePhoto:"",
        rightEyePhoto:""
    },
    reducers:{
        updatePatientData:(state,action)=>{
            return {...state,...action.payload}
        }
    }
})