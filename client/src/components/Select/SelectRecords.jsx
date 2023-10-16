import React from 'react'
import Select from 'react-select';

const SelectRecords = ({ pageSize, setPageSize }) => {
    const options = [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 4, value: 4 },
        { label: 10, value: 10 },
        { label: 50, value: 50 },
    ]
    return (
        <Select
            options={options}
            value={options.find((option) => option.value === pageSize)}
            onChange={(selectedOption) => setPageSize(selectedOption.value)}
            className='w-[86px]'
        />
    )
}

export default SelectRecords
