import { FaBars } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

import UserNavbar from './UserNavbar'
import logo from '../../assets/logo_main.png'
import AdminNavbar from '../admin/AdminNavbar'



const Sidebar = () => {
    const { user } = useSelector((state) => state.user)
    
    return (
        <div className='fixed left-0 lg:block hidden z-20  h-screen w-64 bg-[#364150] text-white'>
            <div className='flex items-center justify-between px-4 bg-white text-[#333333]'>
                <div>
                    <img src={logo} alt="TexLang" className='h-12' />
                </div>
                <button>
                    <FaBars size={18} />
                </button>
            </div>
            <div className='py-4'>
                {user && user.role === 'admin'?<AdminNavbar />:<UserNavbar />}
            </div>
        </div>
    )
}

export default Sidebar
