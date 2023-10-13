import React, { useEffect } from 'react'
import Layout from '../../layout'
import CompanyProjectsTable from '../../components/admin/Table/CompanyProjectsTable'
import { useDispatch } from 'react-redux'
import { getCompanyProjects } from '../../redux/actions/admin/project'

const CompanyProjects = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCompanyProjects())
    },[dispatch])
    return (
        <div className='px-6 py-8'>
            <h1 className='text-2xl font-sans pb-2.5'>Project List</h1>
            <hr />
            <CompanyProjectsTable />
        </div>
    )
}

export default Layout(CompanyProjects)
