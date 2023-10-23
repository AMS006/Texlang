import axios from 'axios'
import * as yup from 'yup'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Layout from '../../layout'
import Input from '../../components/Common/Input'

const formSchema = yup.object({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    email: yup.string().required("Email is required").email("Email is Not Valid!"),
    password: yup.string().required("Password is required").min(4, "Password Must be atleast 4 characters long")
})

const AddUser = () => {
    const [loading, setLoading] = useState(false)

    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(formSchema)
    })
    const formSubmit = async (data) => {
        try {
            setLoading(true)
            await axios({
                method: "POST",
                url: "http://localhost:4000/api/admin/registerUser",
                data,
                withCredentials: true
            })
            setLoading(false)
            toast.success("User Created Successfully")
            reset()
        } catch (error) {
            setLoading(false)
            const message = error.response?.data?.message || "Failed to create User"
            toast.error(message)
        }
    }

    return (
        <div className='px-6 py-8'>
            <h1 className='text-2xl font-sans pb-2.5'>Add New User</h1>
            <hr />
            <div className='py-4'>
                <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col gap-3'>

                    <Input
                        label={'First Name'}
                        id='firstName'
                        placeholder={'Enter First Name'}
                        type={'text'}
                        register={{ ...register('firstName') }}
                        errorMessage={errors?.firstName?.message}
                    />

                    <Input
                        label={'Last Name'}
                        id={'lastName'}
                        placeholder={'Enter Last Name'}
                        type={'text'}
                        register={{ ...register('lastName') }}
                        errorMessage={errors?.lastName?.message}
                    />

                    <Input
                        label={'User Id'}
                        id={'email'}
                        placeholder={'Enter User Id'}
                        type={'email'}
                        register={{ ...register('email') }}
                        errorMessage={errors?.email?.message}
                    />

                    <Input
                        label={'Password'}
                        id={'password'}
                        placeholder={'Enter Password'}
                        type={'password'}
                        register={{ ...register('password') }}
                        errorMessage={errors?.password?.message}
                    />
                    <div>
                        <input type="submit" disabled={loading} value={`${loading ? 'Verifying...' : 'Submit'}`} className={`bg-blue-500 text-white px-2.5 py-1.5 mt-2.5 ${loading ? 'opacity-50' : 'cursor-pointer hover:opacity-90'}`} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Layout(AddUser)
