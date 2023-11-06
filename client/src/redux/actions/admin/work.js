import axios from "axios"
import { setPieCharData, setWorkError, setWorks, workRequest } from "../../reducers/work"
import { setHeaders } from "../../../helper/header"

export const getProjectWork = (projectId) => async (dispatch) => {
    try {
        dispatch(workRequest())
        setHeaders()
        const works = await axios({
            method: "GET",
            url: `http://localhost:4000/api/admin/work/projectWork/${projectId}`,
        })
        dispatch(setWorks(works.data.works))
    } catch (error) {
        dispatch(setWorkError())
    }
}
export const getInvoiceWork = (projectId) => async (dispatch) => {
    try {
        dispatch(workRequest())
        setHeaders()
        const works = await axios({
            method: "GET",
            url: `http://localhost:4000/api/admin/work/projectWork/invoice/${projectId}`,
        })
        dispatch(setWorks(works.data.works))
    } catch (error) {
        dispatch(setWorkError())
    }
}
export const getPieChartData = () => async(dispatch) =>{
    try {
        setHeaders()
       const pieChartData = await axios({
        method:"GET",
        url:"http://localhost:4000/api/admin/work/jobWiseData",
       })
       dispatch(setPieCharData(pieChartData.data.jobs))
    } catch (error) {
        dispatch(setWorkError())
    }
}