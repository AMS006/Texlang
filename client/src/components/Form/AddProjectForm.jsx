import React, { useState } from 'react'
import UploadFiles from './UploadFiles'
import DisplayTable from '../Table/DisplayTable'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import { setClearFile } from '../../redux/reducers/file'

const AddProjectForm = () => {
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [description, setDescription] = useState('')
    const { files } = useSelector((state) => state.file)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (files.length == 0) {
            toast.error("Plzz Upload Work")
            return;
        }
        else {
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                if (!file.sourceLanguage || !file.targetLanguage || !file.contentType) {
                    toast.error("Plzz select all Fields")
                    return;
                }
            }
            const data = {
                name,
                department,
                description,
                work: files
            }
            setLoading(true)
            await axios({
                method: "POST",
                url: "http://localhost:4000/project",
                data
            }).then(() => {
                toast.success("Project Added")
                setLoading(false)
                setName('')
                setDescription('')
                setDepartment('')
                dispatch(setClearFile(true))
            }).catch((err) => {
                const message = err.response.data.message || 'Something went wrong'
                setLoading(false)
                toast.error(message)
            })
        }
    }
    return (
        <div className='flex flex-col px-6 py-4 '>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                <div className='flex items-center gap-4 w-full'>
                    <label htmlFor="name" className='w-40 text-sm'>Project Name <span className='text-red-500'>*</span></label>
                    <input type="text" required name="" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Project Name' className='w-full border py-1.5 px-2.5  focus:outline-blue-500' />
                </div>
                <div className='flex items-center gap-4 w-full'>
                    <label htmlFor="department" className='w-40 text-sm'>Department Name <span className='text-red-500'>*</span></label>
                    <input type="text" required name="" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder='Enter Department Name' className='w-full border py-1.5 px-2.5 focus:outline-blue-500' />
                </div>
                <div className='flex items-start gap-4 w-full'>
                    <label htmlFor="description" className='w-40 text-sm'>Project Description</label>
                    <textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Project Description' className='w-full border py-1.5 px-2.5 focus:outline-blue-500' />
                </div>
                <div className='flex items-start gap-4 w-full'>
                    <label htmlFor="files" className='w-40 text-sm'>Upload Your Work <span className='text-red-500'>*</span></label>
                    <UploadFiles />
                </div>
                <div className=''>
                    <DisplayTable />
                </div>
                <div className='flex justify-center items-center'>
                    <button type='submit' disabled={loading} className={`bg-blue-500 text-white font-semibold px-2.5 py-1 font-sans ${loading ? 'opacity-70 cursor-default' : ''}`}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddProjectForm
