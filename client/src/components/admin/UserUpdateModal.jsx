import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { updateUser } from '../../redux/reducers/user'

const UserUpdateModal = ({ open, setOpen, user }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState('')

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName)
      setLastName(user?.lastName)
      setRole(user?.role)
    }
  }, [user])
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (firstName && lastName) {
      try {
        setLoading(true)
        await axios({
          method: "PUT",
          url: "http://localhost:4000/api/admin/updateUser",
          data: { firstName, lastName, id: user.id, role },
          withCredentials: true
        })
        setLoading(false)
        setOpen(false)
        toast.success("User Updated")
        dispatch(updateUser({ id: user.id, firstName, lastName, role, status: user.status }))
      } catch (error) {
        setLoading(false)
        setOpen(false)
        toast.error("Unable to Update User")
      }
    }
  }
  return (
    <>
      {open && <div>
        <div className='fixed  top-0 bottom-0 z-20 right-0 left-0 bg-slate-500 bg-opacity-40' ></div>
        <form onSubmit={handleSubmit} className='fixed  right-1/2 top-1/2 z-40 overflow-y-hidden translate-x-1/2 -translate-y-1/2 md:min-w-[50%] min-w-[80%] bg-white px-4 py-4'>
          <div className='border border-yellow-500 font-sans my-4'>
            <h1 className='bg-yellow-500 text-white text-lg px-2.5 py-1.5 text-start'>Edit And Update User</h1>
            <div className='flex flex-col gap-2.5 px-2.5 py-4 select-none'>
              <div className='flex  gap-2'>
                <label for="fname" className='w-[40%] text-start'>First Name:</label>
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} id="fname" className='border p-1 border-black focus:outline-blue-500' />
              </div>
              <div className='flex gap-2'>
                <label for="lname" className='w-[40%] text-start'>Last Name:</label>
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} id="lname" className='border p-1 border-black focus:outline-blue-500' />
              </div>
              <div className='flex gap-2'>
                <label htmlFor="admin" className='w-[40%] text-start'>Admin</label>
                <input type="checkbox" id="admin" checked={role === 'admin'} onChange={() => setRole((prev) => prev === 'admin' ? 'user' : 'admin')} />
              </div>
            </div>
          </div>
          <div className='w-full flex justify-end gap-2'>
            <button onClick={() => setOpen(false)} className='px-2.5 py-1.5 border border-black font-sans'>Close</button>
            <button type='submit' disabled={loading} className={`px-2.5 py-1.5 bg-blue-500 text-white ${loading ? 'opacity-60' : ''}`}>{loading ? 'Updating...' : "Submit"}</button>
          </div>
        </form>
      </div>}
    </>
  )
}

export default UserUpdateModal
