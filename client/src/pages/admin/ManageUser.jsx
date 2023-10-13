import React, { useEffect, useState } from 'react'
import Layout from '../../layout'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../../redux/actions/admin/user';
import UserManagementTable from '../../components/admin/Table/UserManagementTable';

const ManageUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getAllUsers())
  }, [dispatch])
  return (
    <div className='px-6 py-8'>
        <h1 className='text-2xl font-sans pb-2.5'>User Managment</h1>
        <hr />
        <UserManagementTable />
    </div>
  )
}

export default Layout(ManageUser)
