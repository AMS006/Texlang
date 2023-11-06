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
            const currFiles = current(state.files)
            const newFiles = action.payload
            const updatedFiles = [...currFiles]
            newFiles.forEach((newFile) => {
                const isFileExists = currFiles.some((existingFile) => existingFile.name === newFile.name);
                if (!isFileExists) {
                    updatedFiles.push(newFile);
                }
            });
            state.files = updatedFiles
        },
        removeFile:(state,action) =>{
            const currFiles = current(state.files)
            const updatedFiles = currFiles.filter((file) => file.name !== action.payload)
            state.files = updatedFiles
        },
        clearFiles:(state)=>{
            state.files = []
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

export const {setFilesData,setClearFile,updateFile,removeFile,clearFiles} = flieSlice.actions
export default flieSlice.reducer