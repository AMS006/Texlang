import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    error:undefined,
    projects:[]
}
const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers:{
        projectRequest:(state,action) =>{
            state.loading = true
            state.error = undefined
        },
        setAllProjects:(state,action) =>{
            state.loading = false
            state.projects = action.payload
            state.error = undefined
        }
    }

})

export const {projectRequest,setAllProjects} = projectSlice.actions

export default projectSlice.reducer