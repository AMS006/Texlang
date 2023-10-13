import React, { useMemo } from 'react'
import { companyProjectListTableColumns } from '../../data';
import { useSelector } from 'react-redux';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';

const CompanyProjectsTable = () => {
    const { companyProjects , loading } = useSelector((state) => state.project)
    const data = useMemo(() => companyProjects,[companyProjects])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: companyProjectListTableColumns,
            data,
        },
        useGlobalFilter,
        useSortBy,
    );
  return (
    <div className='overflow-x-auto py-4'>
                <table {...getTableProps()} className="table overflow-auto">
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
                                <td colSpan={companyProjectListTableColumns.length} className="text-center py-1.5 border w-full">
                                    {loading ? 'Loading...' : 'No Records Found'}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
  )
}

export default CompanyProjectsTable
