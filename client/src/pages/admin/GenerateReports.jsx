import React, { useEffect } from 'react'
import Layout from '../../layout'
import { getCompanyProjects } from '../../redux/actions/admin/project'
import { useDispatch } from 'react-redux'
import GenerateReportsTable from '../../components/admin/Table/GenerateReportsTable'

const GenerateReports = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCompanyProjects())
    }, [dispatch])
    return (
        <div className='px-6 py-8'>
            <h1 className='text-2xl font-sans pb-2.5'>Generate Reports</h1>
            <hr />
            <GenerateReportsTable />
        </div>
    )
}

export default Layout(GenerateReports)
