import React from 'react'
import Select from 'react-select';

const SelectRecords = ({ records, onChange }) => {
    const options = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
    ]
    return (
        <Select
            options={options}
            value={options.find((option) => option.value === records)}
            onChange={(selectedOption) => onChange(selectedOption.value)}
            className='w-[86px]'
        />
    )
}

export default SelectRecords
