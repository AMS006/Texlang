import axios from "axios"
import { projectRequest, setCompanyProjects, setError, setInvoices, setLatestProjects, setProject } from "../../reducers/project"

export const getCompanyProjects = () => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        const data = await axios({
            method:"GET",
            url: `http://localhost:4000/api/admin/companyProjects`,
            withCredentials:true
        })
        
        dispatch(setCompanyProjects(data.data.projects))
    } catch (error) {
        dispatch(setError())
    }
}

export const getLatestProjects = () => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        const data = await axios({
            method:"GET",
            url: `http://localhost:4000/api/admin/latestProjects`,
            withCredentials:true
        })
        
        dispatch(setLatestProjects(data.data.projects))
    } catch (error) {
        dispatch(setError())
    }
}

export const getProjectDetailsAdmin = (id) => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        const project = await axios({
            method:"GET",
            url: `http://localhost:4000/api/admin/project/${id}`,
            withCredentials:true
        })
        dispatch(setProject(project.data.project))
    } catch (error) {
        dispatch(setError())
    }
}

export const getInvoices = () => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        const invoices = await axios({
            method:"GET",
            url:"http://localhost:4000/api/admin/invoices",
            withCredentials:true
        })
        dispatch(setInvoices(invoices.data.projects))
    } catch (error) {
        dispatch(setError())
    }
}