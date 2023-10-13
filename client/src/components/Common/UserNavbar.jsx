import React from 'react'
import { MdOutlineDiamond } from 'react-icons/md'
import { SlPuzzle } from 'react-icons/sl'
import { Link, useLocation } from 'react-router-dom'

const UserNavbar = () => {
    const {pathname} = useLocation()
    return (
        <>
            <h3 className='text-lg capitalize text-gray-300 px-2.5'>FEATRURES</h3>
            <nav className='flex flex-col gap-2.5 py-2.5'>
                <Link to={'/Enterprise/EnterpriseLanding'} className={`flex items-center gap-2.5  px-2.5 py-1.5 ${pathname.includes('EnterpriseLanding')?'bg-blue-500':'hover:bg-[#67707975]'}`}>
                    <span><MdOutlineDiamond /></span>
                    <span>Add New Project</span>
                </Link>
                <Link to={'/Enterprise/GetUploadedData'} className={`flex items-center gap-2.5  px-2.5 py-1.5 ${pathname.includes('GetUploadedData')?'bg-blue-500':'hover:bg-[#67707975]'}`}>
                    <span><SlPuzzle /></span>
                    <span>View Status</span>
                </Link>
            </nav>
        </>
  )
}

export default UserNavbar
