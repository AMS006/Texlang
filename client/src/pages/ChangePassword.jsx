import React, { useState } from 'react'
import Layout from '../layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordError) {
            toast.error("Password Does Not Match")
        } else {
            setLoading(true);
            await axios({
                method: "POST",
                url: 'http://localhost:4000/user/changePassword',
                data: { currentPassword, newPassword }
            }).then(() => {
                setLoading(false)
                toast.success("Password Changed Successfully")
                navigate('/Enterprise/EnterpriseLanding')
            }).catch((err) => {
                const error = err.response.data.message
                const errorMessage = error ? error : "Unable to Reset Password"
                toast.error(errorMessage)
                setLoading(false)
            })
        }
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        if (e.target.value !== newPassword) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }
    return (
        <div className='pl-64'>
            <div className='flex flex-col gap-4 px-6 py-4'>
                <h3 className='font-sans text-2xl'>Change Password</h3>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <div>
                        <label htmlFor="currentPassword">Current Password</label>
                        <input type="password" id='currentPassword' required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder='Enter current password ' className='px-2 py-1.5 border border-gray-400 w-full' />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder='Enter New password' className='px-2 py-1.5 border border-gray-400 w-full' />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input type="password" id='code' value={confirmPassword} onChange={handleConfirmPasswordChange} required placeholder='Enter Confirm password' className='px-2 py-1.5 border border-gray-400 w-full' />
                        {passwordError && <p className='text-xs text-red-500'>Confirm password and new password does not match</p>}
                    </div>
                    <div>
                        <input type="submit" disabled={loading} value={`${loading ? 'Verifying...' : 'Submit'}`} className={`bg-blue-500 text-white px-2.5 py-1.5 ${loading ? 'opacity-50' : 'cursor-pointer hover:opacity-90'}`} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Layout(ChangePassword);
