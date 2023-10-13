import axios from "axios"
import { projectRequest, setAllProjects, setError, setProject } from "../reducers/project"

export const getProjects = (records,page) => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        const data = await axios({
            method:"GET",
            url: `http://localhost:4000/api/project?recordsPerPage=${records}&pageNumber=${page}`,
            withCredentials:true
        })
        
        dispatch(setAllProjects(data.data.projects))
    } catch (error) {
        dispatch(setError())
    }
}

export const getProject = (id) => async(dispatch) =>{
    try {
        const project = await axios({
            method:"GET",
            url: `http://localhost:4000/api/project/${id}`,
            withCredentials:true
        })
        dispatch(setProject(project.data.project))
    } catch (error) {
        dispatch(setError())
    }
}