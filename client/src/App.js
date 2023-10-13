import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast'

import LoginPage from './pages/Login.page';
import AddProject from './pages/AddProject';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import ChangePassword from './pages/ChangePassword';

import AddUser from './pages/admin/AddUser';
import Invoices from './pages/admin/Invoices';
import Dashboard from './pages/admin/Dashboard';
import ManageUser from './pages/admin/ManageUser';
import ManageProject from './pages/admin/ManageProject';
import CompanyProjects from './pages/admin/CompanyProjects';

import { getUser } from './redux/actions/user';
import AdminRoute from './components/admin/AdminRoute';
import PrivateRoute from './components/Common/PrivateRoute';
import './App.css';
import ProjectDetails from './pages/admin/ProjectDetails';

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
          <Route path='EnterpriseLanding' element={<AddProject />} />
          <Route path='GetUploadedData' element={<ProjectList />} />
          <Route path='EnterpriseChangePassword' element={<ChangePassword />}/>
          <Route path='EnterpriseFileDownLoad/:id' element={<ProjectDetail />} />
        </Route>
        
        <Route path='/Admin' element={<AdminRoute />}>
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='CompanyProjects' element={<CompanyProjects />}/>
          <Route path='AddUser' element={<AddUser />} />
          <Route path='ManageUser' element={<ManageUser />} />
          <Route path="Invoices" element={<Invoices />} />
          <Route path="ManageProject" element={<ManageProject />} />
          <Route path='ProjectDetails/:id' element={<ProjectDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
