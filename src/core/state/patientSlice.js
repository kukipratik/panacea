import { createSlice } from "@reduxjs/toolkit";
export const patientSlice = createSlice({
    name:"patientSlice",
    initialState:{
        name:"",
        contactNumber:""
    },
    reducers:{
        updatePatientData:(state,action)=>{
            return {...state,...action.payload}
        }
    }
})