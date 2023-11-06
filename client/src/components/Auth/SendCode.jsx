import axios from 'axios'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'


import { setCodeSend, setForgotPassword, setUserData } from '../../redux/reducers/user'
import Input from '../Common/Input'

const formSchema = yup.object({
    email: yup.string().required("Email is required").email("Enter a Valid Email Id"),
    password: yup.string().required("Password is required").min(4, "Password must be atleast 4 characters long"),
})

const SendCode = () => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()


    const { handleSubmit, formState: { errors }, register } = useForm({
        resolver: yupResolver(formSchema),

    })
    const sendCode = async (data) => {
        try {
            setLoading(true)
            await axios({
                method: "POST",
                url: "http://localhost:4000/api/user/sendCode",
                data,
            })
            setLoading(false)
            dispatch(setCodeSend(true))
            dispatch(setUserData(data))

            toast.success("Verification Code Send to Email Id")

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to send Verification Code";
            toast.error(errorMessage)
            dispatch(setCodeSend(false))
            setLoading(false)

        }
    }

    return (
        <div className='flex flex-col gap-2.5 w-full'>
            <h1 className='font-sans text-3xl'>Texlang Enterprise Login</h1>
            <form onSubmit={handleSubmit(sendCode)} className='flex flex-col justify-center gap-6 w-full'>

                <Input type='email' placeholder={'Enter Email Id'} label={'Email'} id={'email'} register={{ ...register('email') }} errorMessage={errors.email?.message} />

                <Input type='password' placeholder={'Enter Password'} label={'Password'} id={'password'} register={{ ...register('password') }} errorMessage={errors.password?.message} />

                <button className={`bg-blue-500 py-1.5 px-2.5 text-white rounded select-none ${loading ? 'opacity-50 cursor-default' : 'hover:opacity-95'}`} disabled={loading}>{loading ? 'Loading...' : 'Send Code'}</button>

            </form>

            <div className='flex justify-end'>
                <button className='text-sm text-gray-600 select-none hover:text-blue-600' onClick={() => dispatch(setForgotPassword(true))}>Forgot Password?</button>
            </div>
        </div>
    )
}

export default SendCode
