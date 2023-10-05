import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setChangePassword, setForgotPassword } from '../../redux/reducers/user'

const ResetPassword = () => {
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false)

    const { forgotPasswordEmail } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordError) {
            toast.error("Password Does Not Match")
        } else if (forgotPasswordEmail) {
            setLoading(true);
            await axios({
                method: "POST",
                url: 'http://localhost:4000/user/resetPassword',
                data: { email: forgotPasswordEmail, code, newPassword }
            }).then(() => {
                toast.success("Password Updated Successfully! Login to continue")
                setLoading(false)
                dispatch(setChangePassword(false))
                dispatch(setForgotPassword(false))
            }).catch((err) => {
                const errorData = err?.response?.data?.message
                const errorMessage = errorData ? errorData : "Something Went Wrong! Plzz try again"
                toast.error(errorMessage)
                setLoading(false)
            })
        } else {
            toast.error("Invalid Request")

            dispatch(setChangePassword(false))
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
        <div className='flex flex-col gap-4'>
            <h3 className='font-sans text-2xl'>Change Password</h3>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <div>
                    <label htmlFor="code">Forgot Password Code</label>
                    <input type="text" id='code' required value={code} onChange={(e) => setCode(e.target.value)} placeholder='Enter forgot password code' className='px-2 py-1.5 border border-gray-400 w-full' />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder='Enter New password' className='px-2 py-1.5 border border-gray-400 w-full' />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id='code' value={confirmPassword} onChange={handleConfirmPasswordChange} required placeholder='Enter Confirm password' className='px-2 py-1.5 border border-gray-400 w-full' />
                    {passwordError && <p className='text-xs text-red-500'>Confirm password and new password does not match</p>}
                </div>
                <div>
                    <input type="submit" disabled={loading} value={`${loading ? 'Verifying...' : 'Submit'}`} className={`bg-blue-500 text-white px-2.5 py-1.5 ${loading ? 'opacity-50' : 'cursor-pointer hover:opacity-90'}`} />
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
