import {createSlice,} from '@reduxjs/toolkit'
import { contentType } from '../../components/data/selectOptions'

const initialState = {
    works : [],
    loading: false,
    pieChartData:[]
}

const workSlice = createSlice({
    name: "word",
    initialState,
    reducers: {
        workRequest: (state) => {
            state.loading = true
            state.works = []
        },
        setWorks: (state, action) => {
            state.loading = false
            state.works = action.payload
        },
        setPieCharData:(state,action) =>{
            const data = [
                ["JobType", "Count"],
            ];
            const jobs = action.payload
            contentType.forEach((type) =>{
                const count = jobs.hasOwnProperty(type.value)? jobs[type.value] : 0;
                data.push([type.label,count])
            })
            
            state.pieChartData = data
        },
        setWorkError: (state) => {
            state.loading = false
            state.works = []
        }
    }
})

export const { workRequest, setWorks,setPieCharData, setWorkError } = workSlice.actions

export default workSlice.reducer