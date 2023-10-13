import axios from 'axios'
import toast from 'react-hot-toast'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LoginUser } from '../../redux/actions/user'
import { useNavigate } from 'react-router-dom'
import { clearUser, setForgotPassword } from '../../redux/reducers/user'
import SignInInput from '../Common/SignInInput'

const LoginForm = () => {
    const [companyCode, setCompanyCode] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('');
    const [codeSend, setCodeSend] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [sendingCode, setSendingCode] = useState(false)
    const navigate = useNavigate()

    const sendCode = async () => {
        try {
            if(emailError || email.length === 0)
                return toast.error("Invalid Email Id")
            setSendingCode(true)
            await axios({
                method: "POST",
                url: "http://localhost:4000/api/user/sendCode",
                data: { email }
            })
            toast.success("Verification Code Send to Email Id")
            setCodeSend(true)
            setSendingCode(false)
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Enter a Valid Email Id";
            toast.error(errorMessage)
            setSendingCode(false)
        }
    }
    const handleEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val)
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(val)) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
    }

    const dispatch = useDispatch()
    const { user, error, loading } = useSelector((state) => state.user)
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(LoginUser({ email, password, code }))
    }
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
    return (
        <div className='flex flex-col gap-2.5 w-full'>
            <h1 className='font-sans text-3xl'>Texlang Enterprise Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-6 w-full'>
                <div className='w-full'>
                    <SignInInput type='text' value={companyCode} placeholder={'Company code'} id={'companyCode'} handleChange={(e) => setCompanyCode(e.target.value)} />
                </div>
                <div className='w-full'>
                    <SignInInput type='email' value={email} placeholder={'Username'} id={'email'} handleChange={handleEmailChange} />
                    {emailError && <p className='text-xs text-red-500'>Plzz Enter a Valid Email Id</p>}
                </div>
                <div className='w-full'>
                    <SignInInput type='password' value={password} placeholder={'Password'} id={'password'} handleChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='w-full'>
                    <SignInInput type='text' value={code} placeholder={'Code'} id={'code'} handleChange={(e) => setCode(e.target.value)} />
                </div>
                {codeSend && <div className='flex justify-center'>
                    <button className={`bg-blue-500 py-1.5 px-2.5 text-white rounded ${loading ? 'opacity-50 cursor-default' : 'hover:opacity-95'}`} disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
                </div>}
            </form>
            <div>
                <button onClick={sendCode} disabled={codeSend || sendingCode} className='font-sans'>{sendingCode ? <span className='text-blue-500'>Verifying...</span> : codeSend ? <span className='text-green-500'>Code Sended</span> : <span className='text-red-500'>Get Code</span>}</button>
            </div>
            <div className='flex justify-end'>
                <button className='text-sm text-gray-600 hover:text-blue-600' onClick={() => dispatch(setForgotPassword(true))}>Forgot Password?</button>
            </div>
        </div>
    )
}

export default LoginForm
