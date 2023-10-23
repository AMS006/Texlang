import { useMemo } from 'react'
import { useTable } from 'react-table';
import { useSelector } from 'react-redux';
import { manageUserTable } from '../../data/tableColumns';


const UserManagementTable = () => {

    const { allUsers, allUserLoading } = useSelector((state) => state.user)
    const data = useMemo(() => allUsers, [allUsers])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: manageUserTable,
            data,
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
                            <td colSpan={manageUserTable.length} className="text-center py-1.5 border w-full">
                                {allUserLoading ? 'Loading...' : 'No Records Found'}
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    )
}
export default UserManagementTable
