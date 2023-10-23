import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AiOutlinePlus, AiOutlineEye, AiOutlineUserAdd } from 'react-icons/ai'

import Layout from '../../layout'
import PieChart from '../../components/admin/PieChart'
import { getPieChartData } from '../../redux/actions/admin/work'
import { getLatestProjects } from '../../redux/actions/admin/project'
import LatestProjectTable from '../../components/admin/Table/LatestProjectTable'

const Dashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLatestProjects())
        dispatch(getPieChartData())
    }, [dispatch])

    return (
        <div className='px-6 py-8'>
            <h1 className='text-2xl font-sans pb-2.5'>Admin Dashboard</h1>
            <hr />
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center gap-6 py-4'>
                <Link to={'/Enterprise/EnterpriseLanding'} className='bg-[#0b8ab9] text-white flex flex-col gap-2.5 items-center justify-center  rounded h-32 w-full border'>
                    <AiOutlinePlus size={24} />
                    <span className='font-semibold'>Add New Projects</span>
                </Link>
                <Link to={'/Enterprise/GetUploadedData'} className='bg-[#e7505a] text-white flex flex-col gap-2.5 items-center justify-center  rounded h-32 w-full border'>
                    <AiOutlineEye size={24} />
                    <span className='font-semibold'>View Status</span>
                </Link>
                <Link to={'/admin/CompanyProjects'} className='bg-[#32c5d2] text-white flex flex-col gap-2.5 items-center justify-center  rounded h-32 w-full border'>
                    <AiOutlineEye size={24} />
                    <span className='font-semibold'>View Projects</span>
                </Link>
                <Link to={'/Admin/AddUser'} className='bg-[#8e44ad] text-white flex flex-col gap-2.5 items-center justify-center rounded h-32 w-full border'>
                    <AiOutlineUserAdd size={24} />
                    <span className='font-semibold'>Add New User</span>
                </Link>
            </div>
            <div className='py-4'>
                <PieChart />
            </div>
            <div className='py-4'>
                <div className='w-full flex justify-between items-center'>
                    <Link to='/Enterprise/EnterpriseLanding' className='flex items-center gap-2 px-2.5 py-1.5 bg-blue-500 text-white font-semibold hover:bg-blue-600'>
                        Add New Project
                        <AiOutlinePlus />
                    </Link>
                    <Link to='/Admin/CompanyProjects' className='flex items-center gap-2 px-2.5 py-1.5 border border-blue-500 font-semibold hover:bg-blue-500 hover:text-white'>
                        View all Projects
                        <AiOutlineEye />
                    </Link>
                </div>
                <LatestProjectTable />
            </div>
        </div>
    )
}

export default Layout(Dashboard)
