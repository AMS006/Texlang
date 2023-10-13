import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setChangePassword, setForgotPassword } from '../../redux/reducers/user'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '../Common/Input'

const formSchema = yup.object({
    code:yup.string().required("Verification code is Required"),
    newPassword:yup.string().required("New password is required").min(4,"Password must be atleast 4 characters long"),
    confirmPassword:yup.string().required("Confirm Password is required").oneOf([yup.ref('newPassword'),null], 'Password must match')
})
const ResetPassword = () => {

    const [loading, setLoading] = useState(false)

    const {handleSubmit,formState:{errors},register,reset} = useForm({
        resolver:yupResolver(formSchema)
    })

    const { forgotPasswordEmail } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const formSubmit = async(data) =>{
        try {
            if(forgotPasswordEmail){
                setLoading(true)
                await axios({
                    method: "POST",
                    url: 'http://localhost:4000/api/user/resetPassword',
                    data: { email: forgotPasswordEmail, ...data }
                })
                setLoading(false)
                dispatch(setChangePassword(false))
                dispatch(setForgotPassword(false))
                toast.success("Password Updated Successfully! Login to continue")
                reset()
            }else{
                toast.error("Invalid Request")
                dispatch(setChangePassword(false))
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Something Went Wrong! Plzz try again"
            toast.error(errorMessage)
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h3 className='font-sans text-2xl'>Change Password</h3>
            <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col gap-3'>
                
                    <Input label={'Forgot Password Code'} id={'code'} type={'text'} placeholder={'Enter Forgot Password Code'} register={{...register('code')}} errorMessage={errors?.code?.message}/>
               
                    <Input label={'New Password'} id={'newPassword'} type={'password'} placeholder={'Enter New Password'} register={{...register('newPassword')}} errorMessage={errors?.newPassword?.message}/>

                    <Input label={'Confirm Password Code'} id={'confirmPassword'} type={'password'} placeholder={'Enter Confirm Password'} register={{...register('confirmPassword')}} errorMessage={errors?.confirmPassword?.message}/>

                <div>
                    <input type="submit" disabled={loading} value={`${loading ? 'Verifying...' : 'Submit'}`} className={`bg-blue-500 text-white px-2.5 py-1.5 ${loading ? 'opacity-50' : 'cursor-pointer hover:opacity-90'}`} />
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
