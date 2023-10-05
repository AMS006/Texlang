import React from 'react'

const Input = ({ type, placeholder, id, handleChange, value }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            id={id}
            required
            value={value}
            onChange={handleChange}
            className='border-b border-[#27a4b0] focus:outline-none p-1 w-full'
        />
    )
}

export default Input
