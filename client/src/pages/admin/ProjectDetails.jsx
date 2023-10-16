import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../layout'
import { getProjectWork } from '../../redux/actions/admin/work'
import WorksTable from '../../components/admin/Table/WorksTable'
import { getProjectDetailsAdmin } from '../../redux/actions/admin/project'

const ProjectDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(getProjectDetailsAdmin(id))
    }, [id, dispatch])

    const { selectedProject } = useSelector((state) => state.project)

    useEffect(() => {
        if (selectedProject) {
            dispatch(getProjectWork(selectedProject.id))
        }
    },[selectedProject,dispatch])

    if (!selectedProject) {
        return <p>Loading...</p>
    }

  return (
    <div className='flex flex-col gap-6 px-6 py-8'>
        <div className='border border-yellow-500'>
            <h1 className='bg-yellow-500 text-white text-lg font-sans px-4 py-1.5'>Project Details</h1>
            <div className='flex flex-col gap-2.5 px-2.5 py-4 font-sans'>
                <div className='flex items-center gap-2.5'>
                      <h4 className='w-2/5'>Project Name:</h4>
                      <h2 className='font-semibold'>{selectedProject?.name}</h2>
                </div>
                <div className='flex items-center gap-2.5'>
                      <h4 className='w-2/5'>Submitted By:</h4>
                    <h2 className='font-semibold'>{selectedProject?.userName}</h2>
                </div>
                <div className='flex items-center gap-2.5'>
                      <h4 className='w-2/5'>Start Date:</h4>
                      <h2 className='font-semibold'>{dayjs(selectedProject?.start_date).format('MM/DD/YYYY')}</h2>
                </div>
                <div className='flex items-center gap-2.5'>
                      <h4 className='w-2/5'>End Date:</h4>
                      <h2 className='font-semibold'>{dayjs(selectedProject?.end_date).format('MM/DD/YYYY')}</h2>
                </div>
                <div className='flex items-center gap-2.5'>
                      <h4 className='w-2/5'>Department Assigned to</h4>
                      <h2 className='font-semibold'>{selectedProject?.department}</h2>
                </div>
               <div className='flex items-center gap-2.5'>
                      <h4 className='w-2/5'>Current Status</h4>
                      <h2 className={`font-semibold ${selectedProject?.status==='Completed'?'bg-blue-500':'bg-yellow-500'} text-white px-1.5 py-1`}>{selectedProject?.status}</h2>
                </div>
                <div className='flex items-center gap-2.5'>
                      <h4 className='w-2/5'>Poject Total Cost Rs.</h4>
                      <h2 className='font-semibold'>{Number(selectedProject?.totalCost)?.toFixed(2)} *(Subject To Revaluation Based On Expert Assesment)</h2>
                </div>
            </div>
        </div>
        <div className='border border-gray-500'>
            <h1 className='px-4 py-1.5 bg-gray-500 text-white font-sans text-lg '>Files Associated</h1>
            <div className='px-2.5 py-4'>
                  <WorksTable />
            </div>
        </div>
    </div>
  )
}

export default Layout(ProjectDetails)
