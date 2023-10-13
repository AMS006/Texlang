import React, { useEffect } from 'react'
import Layout from '../layout'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProject } from '../redux/reducers/project'

const ProjectDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const {projects} = useSelector((state) => state.project)
    useEffect(() => {
        if (projects && id) {
            const project = projects.find((data) => data.id === id)
            if (project)
                dispatch(setProject(project))
        }    
    },[id])
    return (
        <div className='px-6 py-8'>
            <h1 className='text-2xl font-sans pb-2.5'>Project Detail</h1>
            <hr />
        </div>
    )
}

export default Layout(ProjectDetail)
