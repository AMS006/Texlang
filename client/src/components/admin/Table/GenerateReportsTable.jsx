import { useMemo } from 'react'
import * as XLSX from 'xlsx'
import { useSelector } from 'react-redux';
import { useTable, useFilters } from 'react-table';

import dayjs from 'dayjs';
import { generateReportsTableColumn } from '../../data/tableColumns';


const GenerateReportsTable = () => {
    const { companyProjects, loading } = useSelector((state) => state.project)
    const data = useMemo(() => companyProjects, [companyProjects])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: generateReportsTableColumn,
            data,
        },

        useFilters,
    );
    const handleDownload = () => {
        if (rows && rows.length > 0) {
            const formatedData = rows.map((row) => {
                return {
                    Name: row.original.name,
                    Customer: row.original.customer,
                    Start_Date: dayjs(row.original.start_date).format('DD/MM/YYYY'),
                    End_Date: dayjs(row.original.end_date).format('DD/MM/YYYY'),
                    Current_Status: row.original.status
                }
            })

            const ws = XLSX.utils.json_to_sheet(formatedData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'data.xlsx');
        }
    }

    return (
        <div>
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

                                        <div>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </div>
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
                                <td colSpan={generateReportsTableColumn.length} className="text-center py-1.5 border w-full">
                                    {loading ? 'Loading...' : 'No Records Found'}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
                <div className='py-2.5 flex justify-end font-sans'>
                    <button onClick={handleDownload} disabled={!rows || rows.length === 0} className={`bg-blue-500 px-2.5 py-1.5 text-white  ${!rows || rows.length === 0 ? 'bg-opacity-80' : 'hover:bg-blue-600'}`}>Download</button>
                </div>
            </div>
        </div>
    )
}

export default GenerateReportsTable
