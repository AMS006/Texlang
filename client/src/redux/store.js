import { configureStore } from '@reduxjs/toolkit'

import fileSlice from './reducers/file'
import userSlice from './reducers/user'
import workSlice  from './reducers/work'
import projectSlice from './reducers/project'

const store = configureStore({
  reducer:{
    user:userSlice,
    file:fileSlice,
    project: projectSlice,
    work: workSlice
  }
})

export default store