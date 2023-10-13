import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    error:undefined,
    projects: [],
    selectedProject:undefined,
    companyProjects: [],
    latestProjects:[],
    selectedProject:undefined
}

const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers:{
        projectRequest:(state,action) =>{
            state.loading = true
            state.error = undefined
            state.selectedProject = undefined
        },
        setCompanyProjects: (state, action) => {
            state.loading = false
            state.companyProjects = action.payload
            state.error = undefined
        },
        setLatestProjects: (state, action) => {
            state.loading = false
            state.latestProjects = action.payload
            state.error = undefined
        },
        setAllProjects:(state,action) =>{
            state.loading = false
            state.projects = action.payload
            state.error = undefined
        },
        setProject:(state,action) =>{
            state.loading = false
            state.error = undefined
            state.selectedProject = action.payload
        },
        setError:(state) =>{
            state.loading = false
            state.projects = []
            state.companyProjects = []
            state.latestProjects = []
            state.selectedProject = undefined
        }
    }

})

export const {projectRequest,setAllProjects,setProject,setCompanyProjects,setLatestProjects,setError} = projectSlice.actions

export default projectSlice.reducer