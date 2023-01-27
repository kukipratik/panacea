import { configureStore } from "@reduxjs/toolkit"
import { patientSlice } from "./core/state/patientSlice"
import userSlice from "./core/state/userSlice"
import modelSlice from "./core/state/modelSlice"

const store =  configureStore({
    reducer:{
        patientSlice:patientSlice.reducer,
        modelSlice:modelSlice.reducer,
        userSlice:userSlice.reducer
    }
})

export default store