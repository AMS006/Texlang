import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiLogOut, BiSolidKey } from 'react-icons/bi'

import { logoutUser } from '../../redux/actions/user';

const ProfileMenu = ({ menuOpen, setMenuOpen }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setMenuOpen]);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLougout = () => {
        dispatch(logoutUser())
        navigate('/')
    }
    return (
        <div className="relative">
            {menuOpen && (
                <div
                    ref={menuRef}
                    className="absolute z-10 right-0 top-5 mt-2 w-48 bg-white border border-gray-300 shadow-lg"
                >
                    <button
                        className="flex gap-2 items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                        onClick={() => {
                            navigate('/Enterprise/EnterpriseChangePassword')
                        }}
                    >
                        <span><BiSolidKey /></span>
                        <span>Change Password</span>
                    </button>
                    <button
                        className="flex gap-2 items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                        onClick={handleLougout}
                    >
                        <span><BiLogOut /></span>
                        <span>Louout</span>
                    </button>

                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
