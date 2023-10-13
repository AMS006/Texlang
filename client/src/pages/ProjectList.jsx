import React, { useEffect } from 'react'
import Layout from '../layout'
import ProjectListTable from '../components/Table/ProjectListTable'
import { useDispatch } from 'react-redux'
import { getProjects } from '../redux/actions/project'

const ProjectList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjects(5, 1))
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
