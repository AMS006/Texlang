const Input = ({label,id,type, placeholder,register,errorMessage}) => {
  return (
    <div className='flex flex-col gap-0 w-full'>
        {label && <label htmlFor={id}>{label}</label>}
        <input 
            type={type} 
            id={id}  
            placeholder={placeholder}
            {...register}
            className='px-2 py-1.5 border border-gray-400 w-full focus:outline-blue-500' 
        />
        {errorMessage && <span className='text-xs text-red-500'>{errorMessage}</span>}
    </div>
  )
}

export default Input
