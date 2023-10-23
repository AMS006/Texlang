import React from 'react'

const SignInInput = ({ label, id, type, placeholder, register, errorMessage, defaultValue }) => {


    return (
        <div className='flex flex-col gap-0 w-full'>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                {...register}
                defaultValue={defaultValue}
                className='border-b border-[#27a4b0] focus:outline-none p-1 w-full'
            />
            {errorMessage && <span className='text-xs text-red-500'>{errorMessage}</span>}
        </div>
    )
}

export default SignInInput
