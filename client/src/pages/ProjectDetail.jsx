import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../layout'
import { getProjectDetailsUser } from '../redux/actions/project';
import Comment from '../components/Common/Comment';
import ProjectDownloadTable from '../components/Table/ProjectDownloadTable';


const ProjectDetail = () => {
    const { id } = useParams();

    const dispatch = useDispatch()
    useEffect(() => {
        if (id) {
            dispatch(getProjectDetailsUser(id))
        }
    }, [id, dispatch])
    const { selectedProject } = useSelector((state) => state.project)
    const { works } = useSelector((state) => state.work)

    if (!selectedProject)
        return <p>Loading...</p>
    return (
        <div className='px-6 py-8 font-sans'>
            <h1 className='text-2xl font-sans pb-2.5'>Project Detail</h1>
            <hr />
            <div className='flex gap-2.5 items-center capitalize text-xl font-semibold text-blue-500 py-2.5'>
                <h2>PROJECT NAME:</h2>
                <h3 className='uppercase'>{selectedProject?.name}</h3>
            </div>
            <div className='flex flex-col gap-6 py-6'>
                {works.map((work) => (
                    <div className='px-6 py-4 border border-blue-500 rounded border-l-8' key={work.name}>
                        <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 '>
                            <div className='flex gap-2 bg-blue-200 text-blue-600 px-2.5 py-1'>
                                <h2 className='font-semibold'>File Name:</h2>
                                <h3 className='capitalize'>{work.name}</h3>
                            </div>
                            <div className='flex gap-2 bg-pink-200 text-pink-600 px-2.5 py-1'>
                                <h2 className='font-semibold'>Source Language:</h2>
                                <h3 className='capitalize'>{work.sourceLanguage}</h3>
                            </div>
                            <div className='flex gap-2 bg-yellow-100 text-yellow-600 px-2.5 py-1'>
                                <h2 className='font-semibold'>Approval Status:</h2>
                                <h3 className='capitalize'>{work.approvalStatus}</h3>
                            </div>
                            <div className='flex gap-2 bg-green-200 text-green-600 px-2.5 py-1'>
                                <h2 className='font-semibold'>Current Status:</h2>
                                <h3 className='capitalize'>{work.currentStatus}</h3>
                            </div>
                        </div>
                        <div className='my-4'>
                            <ProjectDownloadTable targetLanguage={work.targetLanguage} />
                        </div>
                        <Comment id={work?.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Layout(ProjectDetail)
