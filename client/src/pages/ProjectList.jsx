import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Layout from '../layout'
import { getProjects } from '../redux/actions/project'
import ProjectListTable from '../components/Table/ProjectListTable'

const ProjectList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjects(2, 1, ''))
    }, [dispatch])

    return (
        <div className='px-6 py-8'>
            <h1 className='text-2xl font-sans pb-2.5'>Project List</h1>
            <hr />
            <div>
                <ProjectListTable />
            </div>
        </div>
    )
}

export default Layout(ProjectList)
