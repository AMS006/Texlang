import axios from "axios"
import { projectRequest, setCompanyProjects, setError, setInvoices, setLatestProjects, setProject } from "../../reducers/project"
import { setHeaders } from "../../../helper/header"

export const getCompanyProjects = () => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        setHeaders()
        const data = await axios({
            method:"GET",
            url: `http://localhost:4000/api/admin/project/companyProjects`,
        })
        
        dispatch(setCompanyProjects(data.data.projects))
    } catch (error) {
        dispatch(setError())
    }
}

export const getLatestProjects = () => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        setHeaders()
        const data = await axios({
            method:"GET",
            url: `http://localhost:4000/api/admin/project/latestProjects`,
        })
        
        dispatch(setLatestProjects(data.data.projects))
    } catch (error) {
        dispatch(setError())
    }
}

export const getProjectDetailsAdmin = (id) => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        setHeaders()
        const project = await axios({
            method:"GET",
            url: `http://localhost:4000/api/admin/project/projectDetail/${id}`,
        })
        dispatch(setProject(project.data.project))
    } catch (error) {
        dispatch(setError())
    }
}

export const getInvoices = () => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        setHeaders()
        const invoices = await axios({
            method:"GET",
            url:"http://localhost:4000/api/admin/project/invoices",
        })
        dispatch(setInvoices(invoices.data.projects))
    } catch (error) {
        dispatch(setError())
    }
}