import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BsChevronDown } from 'react-icons/bs'
import ProfileMenu from './ProfileMenu'

const Topbar = () => {
    const { user } = useSelector((state) => state.user)
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className='bg-[#2b3643] sticky top-0 z-10 w-full h-12 flex justify-end items-center text-white px-6'>
            <div onClick={() => setMenuOpen(true)} className='flex items-center font-sans gap-1.5 cursor-pointer hover:bg-[#67707975] px-2.5 h-full'>
                {user.name}
                <BsChevronDown />
                <ProfileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Topbar
