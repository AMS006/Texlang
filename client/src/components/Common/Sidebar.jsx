import React from 'react'
import logo from '../../assets/logo_main.png'
import { FaBars } from 'react-icons/fa6'
import { MdOutlineDiamond } from 'react-icons/md'
import { SlPuzzle } from 'react-icons/sl'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='fixed left-0 top-0 z-20 h-screen w-64 bg-[#364150] text-white'>
            <div className='flex items-center justify-between px-4 bg-white text-[#333333]'>
                <div>
                    <img src={logo} alt="TexLang" className='h-12' />
                </div>
                <button>
                    <FaBars size={18} />
                </button>
            </div>
            <div className='py-4'>
                <div>
                    <h3 className='text-lg capitalize text-gray-300 px-2.5'>FEATRURES</h3>
                    <div className='flex flex-col gap-2.5 py-2.5'>
                        <Link to={'/Enterprise/EnterpriseLanding'} className='flex items-center gap-2.5 hover:bg-[#67707975] px-2.5 py-1.5'>
                            <span><MdOutlineDiamond /></span>
                            <span>Add New Project</span>
                        </Link>
                        <Link to={'/Enterprise/GetUploadedData'} className='flex items-center gap-2.5 hover:bg-[#67707975] px-2.5 py-1.5'>
                            <span><SlPuzzle /></span>
                            <span>View Status</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
