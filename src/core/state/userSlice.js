import  {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        name:"",
        id:"",
        email:"",
        post:"",
        profile:"",
        contactNumber:"",
        request:"",
        accepted:[],
        models:[],
        modelDetail:[]
    },
    reducers:{
        signIn:(state,action)=>{
            return {...state,...action.payload}
        },
        sigmOut:(state,action)=>{
            return {
                name:"",
                id:"",
                email:"",
                post:"",
                profile:""
            }
        },
        addModels:(state,actions)=>{

            state.modelDetail=[...actions.payload]
            return state
        }
    }
})

export default userSlice