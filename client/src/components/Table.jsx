import { useSortBy, useTable, usePagination } from "react-table"
import styles from "../style/site.module.css"

import { 
    NextPage,
    PreviousPage, 
    TableFooter, } from "../style/styled-components"

function Table({columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,

    } = useTable({ columns, data, initialState: { pageSize: 20 } }, useSortBy, usePagination)

    return (
        <>
        <div>
            <table {...getTableProps()} className={styles.ReadingTable}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.ReadingTableHeader}>
                                    {column.render('Header')}
                                </th>
                    ))}
                </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()} >
                  {row.cells.map(cell => {
                    return (
                        <td {...cell.getCellProps()} className={styles.ReadingTableCell}>
                          {cell.render('Cell')}
                        </td>
                    )
                  })}
                </tr>
            )
          })}
          </tbody>
        </table>
        </div>   
        <TableFooter>
            { canPreviousPage ?
                <PreviousPage onClick={() => previousPage()} disabled={!canPreviousPage}></PreviousPage>
            : null }
            { canNextPage ?
                <NextPage onClick={() => nextPage()} disabled={!canNextPage}></NextPage>
            : null }
        </TableFooter> 
      </>       
    )
}

export default Table