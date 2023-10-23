import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';

import Pagination from '../Common/Pagination';
import SelectRecords from '../Select/SelectRecords';
import { projectListTableColumns } from '../data/tableColumns';
import './table.css'

const ProjectListTable = () => {
    const { userProjects, loading } = useSelector((state) => state.project)


    const data = useMemo(() => userProjects, [userProjects])
    const columns = useMemo(() => projectListTableColumns, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setPageSize,
        prepareRow,
        state,
        pageCount,
        gotoPage,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );
    const { globalFilter, pageSize, pageIndex } = state


    return (
        <div>
            <div className='w-full flex justify-between sm:flex-row flex-col gap-4 sm:items-center py-4'>
                <div className='flex items-center gap-1.5 '>
                    <label htmlFor="records">Records</label>
                    <SelectRecords pageSize={pageSize} setPageSize={setPageSize} />
                </div>
                <div className='flex items-center gap-1.5 '>
                    <label htmlFor="search">Search</label>
                    <input type="text" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} id="search" className='border border-gray-600 px-2 py-1 focus:outline-blue-500' />
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
                    {
                        page.length > 0 ?
                            (
                                <tbody {...getTableBodyProps()}>
                                    {page.map((row) => {
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
                            ) :
                            (
                                <tbody>
                                    <tr>
                                        <td colSpan={projectListTableColumns.length} className="text-center py-1.5 border w-full">
                                            {loading ? 'Loading...' : 'No Records Found'}
                                        </td>
                                    </tr>
                                </tbody>
                            )
                    }
                </table>
            </div>
            <Pagination
                canNextPage={canNextPage}
                canPreviousPage={canPreviousPage}
                dataLen={data.length}
                nextPage={nextPage}
                pageLen={page.length}
                previousPage={previousPage}
                pageCount={pageCount}
                pageIndex={pageIndex}
                gotoPage={gotoPage}
            />
        </div >
    )
}

export default ProjectListTable
