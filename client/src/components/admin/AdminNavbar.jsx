import { NavLink } from 'react-router-dom'
import { SlPuzzle } from 'react-icons/sl'
import { BiWalletAlt } from 'react-icons/bi'
import { TbFileInvoice, TbReport } from 'react-icons/tb'
import { BsChevronLeft, BsChevronDown } from 'react-icons/bs'
import { MdOutlineDiamond } from 'react-icons/md'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectTabOpen } from '../../redux/reducers/user'

const AdminNavbar = () => {

    const { projectTabOpen } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    return (
        <nav className='px-2'>
            <div className='py-2.5'>
                <NavLink to={'/Admin/Dashboard'} className='flex items-center gap-2.5 hover:bg-[#67707975] px-2.5 py-1.5'>
                    <span><AiOutlineHome size={20} /></span>
                    <span >Dashboard</span>
                </NavLink>
            </div>
            <h3 className='text-lg capitalize text-gray-300 px-2.5'>FEATRURES</h3>
            <div className='flex flex-col gap-2.5 py-2.5 '>
                <div className='px-2'>
                    <div className='flex items-center justify-between select-none cursor-pointer py-2.5' onClick={() => dispatch(setProjectTabOpen(!projectTabOpen))}>
                        <div className='flex items-center gap-1.5'>
                            <MdOutlineDiamond size={20} />
                            <span>Projects</span>
                        </div>
                        {projectTabOpen ? <BsChevronDown /> : <BsChevronLeft />}
                    </div>
                    <div className={`bg-[#28303b] overflow-hidden transition-all duration-200 ease-linear ${projectTabOpen ? 'h-auto max-h-full p-2' : 'max-h-0'}`}>
                        <NavLink to={'/Enterprise/EnterpriseLanding'} className='flex items-center gap-2.5 hover:bg-[#67707975] px-2.5 py-1.5'>
                            Add New Project
                        </NavLink>
                        <NavLink to={'/Enterprise/GetUploadedData'} className='flex items-center gap-2.5 hover:bg-[#67707975] px-2.5 py-1.5'>
                            View Status
                        </NavLink>
                        <NavLink to={'/admin/AddUser'} className='flex items-center gap-2.5 hover:bg-[#67707975] px-2.5 py-1.5'>
                            Add New User
                        </NavLink>
                    </div>
                </div>
                <NavLink to={'/Admin/CompanyProjects'} className='flex items-center gap-2.5 px-2 hover:bg-[#67707975] py-1.5'>
                    <SlPuzzle size={20} />
                    <span>Project Details</span>
                </NavLink>
                <NavLink to={'/Admin/UserAsPerUsage'} className='flex items-center gap-2.5 px-2 hover:bg-[#67707975] py-1.5'>
                    <BiWalletAlt size={20} />
                    <span>User As Per Usage</span>
                </NavLink>
                <NavLink to={'/Admin/ManageUser'} className='flex items-center gap-2.5 px-2 hover:bg-[#67707975] py-1.5'>
                    <AiOutlineUser size={20} />
                    <span>User Managment</span>
                </NavLink>
                <NavLink to={'/Admin/Invoices'} className='flex items-center gap-2.5 px-2 hover:bg-[#67707975] py-1.5'>
                    <TbFileInvoice size={20} />
                    <span>Show Invoices</span>
                </NavLink>
                <NavLink to={'/Admin/GenerateReports'} className='flex items-center gap-2.5 px-2 hover:bg-[#67707975] py-1.5'>
                    <TbReport size={20} />
                    <span>Generate Reports</span>
                </NavLink>
            </div>
        </nav>
    )
}

export default AdminNavbar