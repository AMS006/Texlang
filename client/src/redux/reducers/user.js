import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
    user: undefined,
    forgotPasswordEmail:undefined,
    forgotPassword:false,
    changePassword:false,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        userRequest:(state) =>{
            state.loading = true
            state.error = null
        },
        setForgotPasswordEmail:(state,action) =>{
            state.forgotPasswordEmail = action.payload
        },
        setForgotPassword:(state,action)=>{
            state.forgotPassword = action.payload
        },
        setChangePassword:(state,action)=>{
            state.changePassword = action.payload
        },
        setUser:(state,action) =>{
            state.loading = false
            state.error = null
            state.user = action.payload
        },
        clearUser:(state) =>{
            state.user = undefined
            state.loading = false
            state.error = null
        },
        setUserError:(state,action) =>{
            state.user = undefined
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {userRequest,setUser,clearUser,setUserError,setForgotPasswordEmail , setForgotPassword, setChangePassword} = userSlice.actions

export default userSlice.reducer