import React from 'react'
import Select from 'react-select';
import { recordsOptions } from '../../data/selectOptions';

const SelectRecords = ({ pageSize, setPageSize }) => {

    return (
        <Select
            options={recordsOptions}
            value={recordsOptions.find((option) => option.value === pageSize)}
            onChange={(selectedOption) => setPageSize(selectedOption.value)}
            className='w-[86px]'
        />
    )
}

export default SelectRecords
