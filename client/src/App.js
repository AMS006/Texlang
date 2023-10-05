import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import LoginPage from './pages/Login.page';
import PrivateRoute from './components/Common/PrivateRoute';
import EnterpricePage from './pages/Enterprice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/actions/user';
import ChangePassword from './pages/ChangePassword';
import ProjectList from './pages/ProjectList';
import './App.css';

function App() {
  const [mounted,setMounted] = useState(false);
  const dispatch = useDispatch()
  useEffect(() =>{
    if(localStorage.getItem('authToken'))
      dispatch(getUser())
  },[dispatch])

  useEffect(() =>{
    setMounted(true);
  },[])
  if(!mounted)
    return null;
  return (
    <BrowserRouter>
    <Toaster />
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/Enterprise' element={<PrivateRoute />}>
          <Route path='EnterpriseLanding' element={<EnterpricePage />} />
          <Route path='GetUploadedData' element={<ProjectList />} />
          <Route path='EnterpriseChangePassword' element={<ChangePassword />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
