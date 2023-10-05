import axios from "axios"
import { setAllProjects } from "../reducers/project"

export const getProjects = () => async(dispatch) =>{
    try {
        const data = await axios({
            method:"GET",
            url:"http://localhost:4000/project?recordsPerPage=5&pageNumber=1",
            
        })
        
        dispatch(setAllProjects(data.data.projects))
    } catch (error) {
        console.log(error)
    }
}