import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import bg1 from '../assets/bg1.jpg'
import logo from '../assets/logo_main.png'
import ResetPassword from '../components/Auth/ResetPassword'
import ForgetPassword from '../components/Auth/ForgetPassword'
import Login from '../components/Auth/Login'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { clearUser } from '../redux/reducers/user'
import SendCode from '../components/Auth/SendCode'

const LoginPage = () => {
    const { forgotPassword, changePassword, user, error, codeSend, loading } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (user && !error) {
            if (user.role === 'admin') {
                navigate('/Admin/Dashboard')
            } else {
                navigate('/Enterprise/EnterpriseLanding')
            }
        }
        if (error) {
            toast.error(error)
            dispatch(clearUser())
        }
    }, [user, error, dispatch, navigate])
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div className='grid lg:grid-cols-2 min-h-screen relative'>
            <div className='flex flex-col gap-6 justify-center  w-full h-full lg:px-12 md:px-8 px-4 py-4'>
                <div className='flex flex-col lg:gap-8 md:gap-6 gap-4 justify-center h-full'>
                    <div className='w-48'>
                        <img src={logo} alt="TexLang" className='w-full h-auto' />
                    </div>
                    {forgotPassword ? changePassword ?
                        <ResetPassword /> :
                        <ForgetPassword /> :
                        codeSend ? <Login /> : <SendCode />}
                </div>
                <p className='flex justify-center items-end text-center text-sm text-gray-500'>Copyright © Megdap Innovation Labs Pvt Ltd</p>
            </div>
            <div>
                <img src={bg1} alt='banner' className='h-full w-full object-cover' />
            </div>
        </div>
    )
}

export default LoginPage
