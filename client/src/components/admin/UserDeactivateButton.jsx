import React, { useState } from 'react'
import UserUpdateModal from './UserUpdateModal'
import UserAlertModal from './UserAlertModal'

const UserDeactivateButton = ({user}) => {
    const [modalOpen,setModalOpen] = useState(false)
    const handleEdit = () => {
        setModalOpen(true)
    }
    return (
    <>
        <UserAlertModal open={modalOpen} setOpen={setModalOpen} user={user}/>
        <button className='text-blue-500 hover:underline' onClick={handleEdit}>
            {user.status?'Deactivate':'Activate'}
        </button>
    </>
  )
}

export default UserDeactivateButton
