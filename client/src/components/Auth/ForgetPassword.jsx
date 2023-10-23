import axios from 'axios'
import * as yup from 'yup'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '../Common/Input'
import { setChangePassword, setForgotPassword, setForgotPasswordEmail } from '../../redux/reducers/user'

const formSchema = yup.object({
    email: yup.string().required("Email is required").email('Email is not valid!')
})
const ForgetPassword = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);

    const { handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(formSchema)
    })
    const formSubmit = async (data) => {
        try {
            setLoading(true)
            dispatch(setForgotPasswordEmail(data.email))
            await axios({
                method: "POST",
                url: "http://localhost:4000/api/user/forgotPassword",
                data,
            })
            dispatch(setChangePassword(true));
            toast.success("Password Reset Code Send to your Email address")
            reset()
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Something Went Wrong"
            toast.error(errorMessage)
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-4 w-full'>
            <h1 className='font-sans text-3xl'>Texlang Enterprise Login</h1>
            <h3 className='font-sans text-2xl'>Forgot Password ?</h3>
            <p className='text-gray-500 text-sm '>Enter your e-mail address below to reset your password.</p>
            <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col gap-4 w-full'>
                <Input label={'Email'} type={'email'} placeholder={"Enter Your Email"} id={'email'} register={{ ...register('email') }} errorMessage={errors?.email?.message} />
                <div className='flex justify-between items-center'>
                    <button onClick={() => dispatch(setForgotPassword(false))} className='border border-blue-500 px-2.5 py-1.5 hover:bg-blue-500 hover:text-white transition-all ease-in-out duration-200'>Back</button>
                    <input type="submit" disabled={loading} value={`${loading ? 'Verifying...' : 'Submit'}`} className={`bg-blue-500 text-white px-2.5 py-1.5 ${loading ? 'opacity-50' : 'cursor-pointer hover:opacity-90'}`} />
                </div>
            </form>
        </div>
    )
}

export default ForgetPassword
