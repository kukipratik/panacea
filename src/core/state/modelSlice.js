import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
    name:"modelSlice",
    initialState:{
        title:"",
        description:"",
        model:"",
        classes:[],
        input:[]
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