import {createSlice, current} from '@reduxjs/toolkit'

const initialState = {
    files : [],
    clearFile: false
}

const flieSlice = createSlice({
    name:"file",
    initialState,
    reducers:{
        setFilesData: (state,action) =>{
            state.files = action.payload
        },
        setClearFile:(state,action) =>{
            state.clearFile = action.payload
        },
        updateFile: (state,action) =>{
            const currFiles = current(state.files)
            if(currFiles.length > 0){
                state.files = currFiles.map((file) =>{
                    if(action.payload.name !== file.name)
                        return file
                    else
                        return action.payload
                })
            }
        }
    }
})

export const {setFilesData,setClearFile,updateFile} = flieSlice.actions
export default flieSlice.reducer