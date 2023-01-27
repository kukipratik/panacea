import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
    name:"modelSlice",
    initialState:{
        title:"",
        description:"",
        model:"",
        classes:[]
    },
    reducers:{
        update:(state,action)=>{
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export default modelSlice