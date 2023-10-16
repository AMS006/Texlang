import React from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'

const formSchema = yup.object({
    comment:yup.string().required("Comment is Required").trim(),
    
})
const Comment = ({id}) => {
    const {handleSubmit,formState:{errors},register,reset} = useForm({
        resolver:yupResolver(formSchema)
    })
    const [loading,setLoading] = useState(false)
    const formSubmit = async(data) =>{
        try {
            setLoading(true)
            await axios({
                method:"POST",
                url:`http://localhost:4000/api/work/comment/${id}`,
                data,
                withCredentials:true
            })
            setLoading(false)
            toast.success("Comment Added")
            reset()
        } catch (error) {
            setLoading(false)
            const message = error.response?.data?.message || "Unable to add comment"
            toast.error(message)
        }
    }
  return (
    <form className='flex flex-col' onSubmit={handleSubmit(formSubmit)}>
        <label htmlFor="comment" className='font-semibold '>Comment</label>
        <textarea id="comment"  rows="6" {...register('comment')}  placeholder='Enter Comment' className='px-2.5 py-1.5 rounded border border-gray-400 focus:outline-blue-400'></textarea>
        <span className='text-xs text-red-500'>{errors.comment?.message}</span>
        <div className='flex justify-end py-2.5'>
            <button type='submit' disabled={loading} className={`bg-blue-500 text-white font-semibold px-3 py-1 ${loading?'opacity-50':''}`}>{loading?'Adding...':'Send'}</button>
        </div>
    </form>
  )
}

export default Comment
