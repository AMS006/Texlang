import { useState } from 'react'
import Select from 'react-select'

const StatusFilter = ({ column }) => {
    const [val, setVal] = useState('')
    const { setFilter } = column
    const options = [
        { label: 'Completed', value: "Completed" },
        { label: "In Progress", value: "In Progress" }
    ]
    const handleChange = (option) => {
        setFilter(option.value)
        setVal(option.value)
    }

    return (
        <div className='px-2 py-1'>
            <Select
                value={options.find((option) => option.value === val)}
                options={options}
                onChange={(option) => handleChange(option)}
                className='font-sans font-normal'
            />
        </div>
    )
}

export default StatusFilter
