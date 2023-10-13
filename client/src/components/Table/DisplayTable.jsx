import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { useSelector } from 'react-redux';

import { displayTableColumns } from '../data'
import './table.css'



const DisplayTable = () => {
    const { files } = useSelector((state) => state.file)
    const data = useMemo(() => files, [files])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: displayTableColumns,
            data,
        },
    );

    return (
        <div className=''>
            <table {...getTableProps()} className="table ">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} style={{maxWidth:'3rem'}}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} >
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayTable;
