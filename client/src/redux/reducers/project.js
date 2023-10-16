import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userProjects:[],
    loading:false,
    error:undefined,
    latestProjects:[],
    companyProjects: [],
    invoices:[],
    selectedProject:undefined,
}

const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers:{
        projectRequest:(state) =>{
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
            state.userProjects = action.payload
            state.error = undefined
        },
        setProject:(state,action) =>{
            state.loading = false
            state.error = undefined
            state.selectedProject = action.payload
        },
        setInvoices:(state,action) =>{
            state.loading = false
            state.invoices = action.payload
        },
        setError:(state) =>{
            state.loading = false
            state.projects = []
            state.companyProjects = []
            state.latestProjects = []
            state.invoices = []
            state.selectedProject = undefined
        }
    }

})

export const {projectRequest,setAllProjects,setProject,setCompanyProjects,setInvoices,setLatestProjects,setError} = projectSlice.actions

export default projectSlice.reducer