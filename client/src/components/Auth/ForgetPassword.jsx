import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setChangePassword, setForgotPassword, setForgotPasswordEmail } from '../../redux/reducers/user'
import axios from 'axios'

const ForgetPassword = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(email)
        setLoading(true)
        dispatch(setForgotPasswordEmail(email))
        await axios({
            method: "POST",
            url: "http://localhost:4000/user/forgotPassword",
            data: { email }
        }).then(() => {
            dispatch(setChangePassword(true));
            toast.success("Password Reset Code Send to your Email address")
        }).catch((err) => {
            const error = err.response.data.message
            toast.error(error)
            setLoading(false)
        })
    }
    return (
        <div className='flex flex-col gap-4 w-full'>
            <h1 className='font-sans text-3xl'>Texlang Enterprise Login</h1>
            <h3 className='font-sans text-2xl'>Forgot Password ?</h3>
            <p className='text-gray-500 text-sm '>Enter your e-mail address below to reset your password.</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
                <input type="email" required placeholder='Enter Your Email Id' value={email} onChange={(e) => setEmail(e.target.value)} className='px-2 py-1.5 border border-gray-400 w-full' />
                <div className='flex justify-between items-center'>
                    <button onClick={() => dispatch(setForgotPassword(false))} className='border border-blue-500 px-2.5 py-1.5 hover:bg-blue-500 hover:text-white transition-all ease-in-out duration-200'>Back</button>
                    <input type="submit" disabled={loading} value={`${loading ? 'Verifying...' : 'Submit'}`} className={`bg-blue-500 text-white px-2.5 py-1.5 ${loading ? 'opacity-50' : 'cursor-pointer hover:opacity-90'}`} />
                </div>
            </form>
        </div>
    )
}

export default ForgetPassword
