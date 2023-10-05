import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/user'
import fileSlice from './reducers/file'
import projectSlice from './reducers/project'

const store = configureStore({
  reducer:{
    user:userSlice,
    file:fileSlice,
    project:projectSlice
  }
})

export default store