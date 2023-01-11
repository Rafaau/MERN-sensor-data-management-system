import { useSortBy, useTable, usePagination } from "react-table"
import styles from "../style/site.module.css"

import { 
    MobileTableFooter,
    MobilePreviousPage,
    MobileNextPage } from "../style/styled-mobile-components"

function MobileTable({columns, data}) {

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

    } = useTable({ columns, data, initialState: { pageSize: 11 } }, useSortBy, usePagination)

    return (
        <>
        <div>
            <table {...getTableProps()} className={styles.MobileListTable}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.MobileListHeader}>
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
                <tr {...row.getRowProps()} className={styles.MobileListTr}>
                  {row.cells.map(cell => {
                    return (
                        <td {...cell.getCellProps()} className={styles.MobileListCell}>
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
        <MobileTableFooter>
        { canPreviousPage ?
            <MobilePreviousPage onClick={() => previousPage()} disabled={!canPreviousPage}/>
            : null }
            { canNextPage ?
            <MobileNextPage onClick={() => nextPage()} disabled={!canNextPage}/>
            : null }
        </MobileTableFooter> 
      </>       
    )
} 

export default MobileTable