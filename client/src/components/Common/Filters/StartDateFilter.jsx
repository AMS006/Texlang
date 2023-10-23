// DateFilter.js
import React from 'react';

const StartDateFilter = ({ column }) => {
    const { flterValue, setFilter } = column
    const handleChange = (e) => {
        setFilter(e.target.value)
    }
    return (

        <div className='px-2 py-1'>
            <input
                type='date'
                value={flterValue}
                onChange={handleChange}
                placeholder="Filter by Date"
                className='font-sans font-normal border rounded px-2 py-1'
            />
        </div>
    );
};

export default StartDateFilter;
