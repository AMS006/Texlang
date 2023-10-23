import { useState } from 'react'
import UserUpdateModal from './UserUpdateModal'

const UserEditButton = ({ user }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const handleEdit = () => {
        setModalOpen(true)
    }
    return (
        <>
            <UserUpdateModal open={modalOpen} setOpen={setModalOpen} user={user} />
            <button className='text-blue-500 hover:underline' onClick={handleEdit}>
                Edit
            </button>
        </>
    )
}

export default UserEditButton
