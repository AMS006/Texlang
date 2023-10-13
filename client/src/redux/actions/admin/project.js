import axios from "axios"
import { projectRequest, setCompanyProjects, setError, setLatestProjects } from "../../reducers/project"

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