import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BsChevronDown } from 'react-icons/bs'
import ProfileMenu from './ProfileMenu'
import { FaBars } from 'react-icons/fa6'
import logo from '../../assets/logo_main.png'
import AdminNavbar from '../admin/AdminNavbar'
import UserNavbar from './UserNavbar'

const Topbar = () => {
    const { user } = useSelector((state) => state.user)
    const [menuOpen, setMenuOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false)
    return (
        <>
            <div className='bg-[#2b3643] sticky top-0 z-10 w-full h-12 flex lg:justify-end justify-between items-center text-white px-6'>
                <div className='lg:hidden block bg-white px-2 '>
                    <img src={logo} alt="TexLang" className='h-12' />
                </div>
                <div className='flex items-center gap-2'>
                    <div onClick={() => setMenuOpen(true)} className='flex items-center font-sans gap-1.5 cursor-pointer hover:bg-[#67707975] px-2.5 h-full'>
                        {user?.name}
                        <BsChevronDown />
                        <ProfileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                    </div>
                    <button className='lg:hidden block' onClick={() => setDrawerOpen((prev) => !prev)}>
                        <FaBars size={20} />
                    </button>
                </div>
            </div>
            <div className={`lg:h-0 sticky   bg-[#364150] text-white w-full transition-all duration-200 ease-linear z-20 overflow-hidden ${drawerOpen ? 'h-auto lg:p-0 p-4 top-12' : 'h-0 top-0'}`}>
                {user && user?.role === 'admin'?<AdminNavbar />:<UserNavbar />}
            </div>
        </>
    )
}

export default Topbar
