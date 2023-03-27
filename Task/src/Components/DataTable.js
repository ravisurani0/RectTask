import React from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'

export default function DataTable({ columns, tableData }) {


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow
    } = useTable({ columns, data: tableData, }, useSortBy, usePagination)
    const { pageIndex, pageSize } = state;

    return (
        <div className="card p-2 overflow-scroll">
            <table {...getTableProps()} className="datatables-basic table" >
                <thead>
                    {headerGroups.map(headerGroup => (

                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                return <th className={column.Header == 'Action' ? 'text-lg-center' : ''} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' ↑'
                                                : ' ↓'
                                            : ''}
                                    </span>
                                </th>
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {tableData.length ?
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <> {cell?.column?.id == 'aciton' ?
                                            <td className='d-flex justify-content-center'>{cell?.row?.original?.aciton}
                                            </td>
                                            :
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>}
                                        </>
                                    }
                                    )}
                                </tr>
                            )
                        })
                        :
                        <tr className="h5 text-center">
                            <td colSpan={columns.length}>
                                No Data Found
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            {tableData?.length > 9 &&
                <div className='border-top d-flex justify-content-center  pt-1'>
                    <button className='btn btn-outline-primary btn-sm mx-1' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {"<<"}
                    </button>{" "}
                    <button className='btn btn-outline-primary btn-sm mx-1' onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                    </button>{" "}
                    {" "}
                    <span className='font-medium-2'>
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{" "}
                    </span>
                    {/* <span>
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const pageNumber = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(pageNumber);
                        }}
                        style={{ width: "50px" }}
                    />
                </span>{" "} */}
                    <select className='form-control-sm mx-1'
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[5, 10, 15, 25, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <button className='btn btn-outline-primary btn-sm mx-1' onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </button>{" "}
                    <button className='btn btn-outline-primary btn-sm mx-1' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {">>"}
                    </button>
                </div>
            }
            <br />
        </div>
    )

}
