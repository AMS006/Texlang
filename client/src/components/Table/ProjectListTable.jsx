import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

import { projectListTableColumns } from '../data';
import SelectRecords from '../Select/SelectRecords';
import { getProjects } from '../../redux/actions/project';
import './table.css'

const ProjectListTable = () => {
    const { projects, loading } = useSelector((state) => state.project)
    const [records, setRecords] = useState(5)
    const [globalFilter, setGlobalFilter] = useState('');
    const [filteredData, setFilteredData] = useState([])
    const [page, setPage] = useState(1)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: projectListTableColumns,
            data: filteredData,
        },
        useGlobalFilter,
        useSortBy,
    );

    const handleSearch = (e) => {
        const value = e.target.value || '';
        const filtered = projects.filter((item) => item.name.includes(value))
        setFilteredData(filtered)
        setGlobalFilter(value)
    }
    const dispatch = useDispatch()
    const onRecordChange = (val) => {
        if (projects && projects.length === records) {
            dispatch(getProjects(val, page))
        }
        else if (val < projects.length) {
            dispatch(getProjects(val, page))
        }
        setRecords(val)
    }
    const handleNext = () => {
        if (projects && projects.length === records) {
            dispatch(getProjects(records, page + 1))
            setPage(page + 1)
        }
    }
    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
            dispatch(getProjects(records, page - 1))
        }
    }
    useEffect(() => {
        setFilteredData(projects)
    }, [projects])

    return (
        <div>
            <div className='w-full flex justify-between sm:flex-row flex-col gap-4 sm:items-center py-4'>
                <div className='flex items-center gap-1.5 '>
                    <label htmlFor="records">Records</label>
                    <SelectRecords records={records} onChange={onRecordChange} />
                </div>
                <div className='flex items-center gap-1.5 '>
                    <label htmlFor="search">Search</label>
                    <input type="text" value={globalFilter} onChange={handleSearch} id="search" className='border border-gray-600 px-2 py-1 focus:outline-blue-500' />
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table {...getTableProps()} className="table">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {rows.length > 0 ? (
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={projectListTableColumns.length} className="text-center py-1.5 border w-full">
                                    {loading ? 'Loading...' : 'No Records Found'}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            <div className='flex justify-end items-center mt-4'>
                <button onClick={handlePrev} className={`border font-semibold px-4 py-2 ${page === 1 ? 'cursor-not-allowed' : ''}`} disabled={page === 1}>{'<'}</button>
                <span className=' px-3 py-2 bg-[#337ab7] text-white'>{page}</span>
                <button onClick={handleNext} className={`border font-semibold px-4 py-2 ${(filteredData.length < records) ? 'cursor-not-allowed' : ''}`} disabled={filteredData.length < (records)}>{'>'}</button>
            </div>
        </div >
    )
}

export default ProjectListTable
