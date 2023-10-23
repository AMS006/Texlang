import React from 'react'
import { useTable } from 'react-table';
import { useSelector } from 'react-redux';
import { taxDetailTableColumn } from '../../data/tableColumns';

const TaxDetailTable = () => {
    const { loading } = useSelector((state) => state.work)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: taxDetailTableColumn,
            data: [],
        },
    );
    return (
        <div className='overflow-x-auto py-4'>
            <table {...getTableProps()} className="table overflow-auto">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
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
                            <td colSpan={taxDetailTableColumn.length} className="text-center py-1.5 border w-full">
                                {loading ? 'Loading...' : 'No Records Found'}
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    )
}

export default TaxDetailTable
