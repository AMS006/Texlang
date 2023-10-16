import axios from "axios"
import { projectRequest, setAllProjects, setError, setProject } from "../reducers/project"
import { setWorks } from "../reducers/work"

export const getProjects = () => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        const data = await axios({
            method:"GET",
            url: `http://localhost:4000/api/project`,
            withCredentials:true
        })
        
        dispatch(setAllProjects(data.data.projects))
    } catch (error) {
        dispatch(setError())
    }
}

export const getProjectDetailsUser = (id) => async(dispatch) =>{
    try {
        const project = await axios({
            method:"GET",
            url: `http://localhost:4000/api/project/${id}`,
            withCredentials:true
        })
        dispatch(setProject(project.data?.project))
        dispatch(setWorks(project.data?.works))
    } catch (error) {
        dispatch(setError())
    }
}