const Input = ({ label, id, type, placeholder, register, errorMessage }) => {
  return (
    <div className='flex flex-col gap-0 w-full'>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
        className={`px-2 py-1.5 border w-full rounded  ${errorMessage ? 'border-red-500 focus:outline-red-500' : 'border-gray-400 focus:outline-blue-500'}`}
      />
      {errorMessage && <span className='text-xs text-red-500'>{errorMessage}</span>}
    </div>
  )
}

export default Input
