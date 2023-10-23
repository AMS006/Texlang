import { SlPuzzle } from 'react-icons/sl'
import { MdOutlineDiamond } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const UserNavbar = () => {

    return (
        <>
            <h3 className='text-lg capitalize text-gray-300 px-2.5'>FEATRURES</h3>
            <nav className='flex flex-col gap-2.5 py-2.5'>
                <NavLink to={'/Enterprise/EnterpriseLanding'} className={`flex items-center gap-2.5  px-2.5 py-1.5  hover:bg-[#67707975]`}>
                    <span><MdOutlineDiamond /></span>
                    <span>Add New Project</span>
                </NavLink>
                <NavLink to={'/Enterprise/GetUploadedData'} className={`flex items-center gap-2.5  px-2.5 py-1.5    hover:bg-[#67707975]`}>
                    <span><SlPuzzle /></span>
                    <span>View Status</span>
                </NavLink>
            </nav>
        </>
    )
}

export default UserNavbar
