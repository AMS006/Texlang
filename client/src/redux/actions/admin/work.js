import axios from "axios"
import { setPieCharData, setWorkError, setWorks, workRequest } from "../../reducers/work"

export const getProjectWork = (projectId) => async (dispatch) => {
    try {
        dispatch(workRequest())
        const works = await axios({
            method: "GET",
            url: `http://localhost:4000/api/admin/projectWork/${projectId}`,
            withCredentials:true
        })
        dispatch(setWorks(works.data.works))
    } catch (error) {
        dispatch(setWorkError())
    }
}
export const getPieChartData = () => async(dispatch) =>{
    try {
       const pieChartData = await axios({
        method:"GET",
        url:"http://localhost:4000/api/admin/jobWiseData",
        withCredentials:true
       })
       dispatch(setPieCharData(pieChartData.data.jobs))
    } catch (error) {
        dispatch(setWorkError())
    }
}