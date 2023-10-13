import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/user'
import fileSlice from './reducers/file'
import projectSlice from './reducers/project'
import workSlice  from './reducers/work'

const store = configureStore({
  reducer:{
    user:userSlice,
    file:fileSlice,
    project: projectSlice,
    work: workSlice
  }
})

export default store