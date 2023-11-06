import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'
const Input = ({ label, id, type, placeholder, register, errorMessage }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='flex flex-col gap-0 w-full'>
      {label && <label htmlFor={id} className="font-semibold select-none">{label}</label>}
      {type !== 'password' ? <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
        className={`px-2 py-1.5 border w-full rounded  ${errorMessage ? 'border-red-500 focus:outline-red-500' : 'border-gray-400 focus:outline-blue-500'}`}
      /> :
        <div className='relative '>
          <input
            type={showPassword ? 'text' : 'password'}
            id={id}
            placeholder={placeholder}
            {...register}
            className={`pl-2 pr-10 py-1.5 border w-full rounded  ${errorMessage ? 'border-red-500 focus:outline-red-500' : 'border-gray-400 focus:outline-blue-500'}`}
          />
          <button type='button' className='absolute right-2 top-2'>
            {showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='cursor-pointer text-2xl  text-gray-500' /> : <AiFillEye onClick={() => setShowPassword(true)} className='cursor-pointer text-2xl text-gray-500' />}
          </button>

        </div>}
      {errorMessage && <span className='text-xs text-red-500'>{errorMessage}</span>}
    </div>
  )
}

export default Input
