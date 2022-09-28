import React, { useEffect, useState, useRef } from "react"
import api from "../api"
import { useSortBy, useTable, usePagination } from "react-table"
import { useSnackbar } from "react-simple-snackbar"

import { ContentBlock, Content, SingleReadingRow, RemoveButton, ListRow, ListHeader, ListTotal, SortIcon, TableFooter, NextPage, PreviousPage, EmptyListMessage } from "../style/styled-components"
import { MobileContentBlock, MobileListRow, MobileListHeader, MobileListTotal, MobileSortIcon, MobileTableFooter, MobileNextPage, MobilePreviousPage, MobileEmptyListMessage } from "../style/styled-mobile-components"
import styles from "../style/site.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Modal from "react-bootstrap/Modal"
import Options from "../style/options.js"
import ReactTooltip from "react-tooltip"
import { Tooltips, NotAuthorizedView } from "../components"
import { motion } from "framer-motion"

function Table({columns, data}) {
    const didMount = useRef(true)
    const [helper, invokeHelper] = useState(1)
    const [show, setShow] = useState(false)
    var optionsInstance = new Options()
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(optionsInstance.successSnackbarOptions)
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar(optionsInstance.errorSnackbarOptions)
    const [readingObj, passReadingObj] = useState({})

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

    } = useTable({ columns, data, initialState: { pageSize: 7 } }, useSortBy, usePagination)

    return (
        <>
        <div>
            <table {...getTableProps()} className={styles.ListTable}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.ListHeader}>
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
                <tr {...row.getRowProps()} className={styles.ListTr}>
                  {row.cells.map(cell => {
                    return (
                        <td {...cell.getCellProps()} className={styles.ListCell}>
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
            <PreviousPage onClick={() => previousPage()} disabled={!canPreviousPage}></PreviousPage>
            <NextPage onClick={() => nextPage()} disabled={!canNextPage}></NextPage>
        </TableFooter> 
      </>       
    )
}

function MobileTable({columns, data}) {
    const didMount = useRef(true)
    const [helper, invokeHelper] = useState(1)
    const [show, setShow] = useState(false)
    var optionsInstance = new Options()
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(optionsInstance.successSnackbarOptions)
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar(optionsInstance.errorSnackbarOptions)
    const [readingObj, passReadingObj] = useState({})

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
            <MobilePreviousPage onClick={() => previousPage()} disabled={!canPreviousPage}></MobilePreviousPage>
            <MobileNextPage onClick={() => nextPage()} disabled={!canNextPage}></MobileNextPage>
        </MobileTableFooter> 
      </>       
    )
} 


function SensorDataList(callback) {
    const didMount = useRef(true)
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(false)
    const [sensordatas, setSensorDatas] = useState([])
    const [show, setShow] = useState(false)
    const [helper, invokeHelper] = useState(1)
    var optionsInstance = new Options()
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(optionsInstance.successSnackbarOptions)
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar(optionsInstance.errorSnackbarOptions)
    const [readingObj, passReadingObj] = useState({})
    const [noReadingsView, setNoReadingsView] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;

    useEffect(() => {
        async function getSensorDatas() {
            setupUser()
            const userModel = JSON.parse(localStorage.getItem("userModel"))
            console.log(userModel)
            let response = { status: "" }
            try {
                response = await api.getReadingByUserId(userModel._id)
            } catch (err) {
                setNoReadingsView(true)
            } finally {
                if (response.status == 200) {
                    setSensorDatas(response.data.data)
                    localStorage.setItem("numberOfArrays", JSON.stringify(response.data.data.length))
                    setNoReadingsView(false)
                }
            }
        }

        if (didMount.current ) {
            setupUser()
            getSensorDatas()
            didMount.current = false
            return
        }

        getSensorDatas()
    }, [helper])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    const setupUser = async () => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = loggedInUser
            setUser(JSON.parse(foundUser))
            setLogged(true)
        }
    }

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = (obj) => {
        setShow(true)
        passReadingObj({...obj})
    }

    let showData = true
    if (!sensordatas.length) {
        showData = false
    }

    const distinctedByUuid = [...new Map(sensordatas.map(sensordata => [sensordata["uuid"], sensordata])).values()]
        const fixedDate = distinctedByUuid.map(sensordata => { 
            return {...sensordata, createdAt: new Date(sensordata.createdAt).toLocaleString()}
        })

        const data = React.useMemo(() => fixedDate,
        [
            {
                delCol: "",
            },
        ],
        [])

        const columns = [
            {
                Header: <>CREATED AT { width > breakpoint ? <SortIcon/> : <MobileSortIcon/> }</>,
                accessor: "createdAt",
                Cell: props => 
                    <SingleReadingRow onClick={(e) => {viewDetails(e, props.row.original.uuid)}}>{props.value}</SingleReadingRow>,
            },
            {
                Header: <>NAME { width > breakpoint ? <SortIcon/> : <MobileSortIcon/> }</>,
                accessor: "name",
                Cell: props => 
                    <SingleReadingRow onClick={(e) => {viewDetails(e, props.row.original.uuid)}}>{props.value}</SingleReadingRow>,
            },
            {
                Header: "",
                accessor: "uuid",
                Cell: function(props) {
                    return (
                        <>
                            <RemoveButton id="test-remove-button" data-tip data-for="DeleteReading" onClick={() => {handleShow(props.row.original)}}/>
                            <Tooltips/>
                            <Modal show={show} onHide={handleClose} animation={true} centered backdrop="static" backdropClassName={styles.ModalBackdrop}>
                                <Modal.Header closeButton>
                                    <h4>Confirm reading delete</h4>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to permanent remove this reading from list?
                                </Modal.Body>
                                <Modal.Footer>
                                    <button onClick={handleClose} className={styles.CancelButton}>
                                        Cancel
                                    </button>
                                    <button id="test-confirm-button" onClick={(e) => {deleteReading(e, readingObj.uuid)}} className={styles.DeleteButton}>
                                        Delete
                                    </button>
                                </Modal.Footer>
                            </Modal>   
                        </>     
                    )             
            },
        },
        ]

        const deleteReading = async (event, uuid) => {
            event.preventDefault()
            const response = await api.deleteReading(uuid) 
            if (response.status == 200) {
                openSuccessSnackbar("Reading deleted successfully!")
                invokeHelper({...helper})         
            } 
            else {
                openErrorSnackbar("Something went wrong while deleting reading")
                invokeHelper({...helper}) 
            }
            handleClose()
            callback.onDelete()
        }
     
        const viewDetails = (event, uuid) => {
            event.preventDefault()
            window.location.href = `/sensordata/${uuid}`
        }


    return (
        <>
        { width > breakpoint ?
        <>
        <ContentBlock>
                { logged ?
                <>  
                    { !noReadingsView ?
                        <>
                            <motion.div
                                initial = {{ opacity: 0, y: "-20%" }}
                                animate = {{ opacity: 1, y: "0%" }}
                                >
                                <ListRow>
                                    <ListHeader>
                                        All readings
                                    </ListHeader>
                                    <ListTotal>
                                        Total: {distinctedByUuid.length}
                                    </ListTotal>
                                </ListRow>
                            </motion.div>
                            <motion.div
                                initial = {{ opacity: 0, y: "-100%" }}
                                animate = {{ opacity: 1, y: "0%" }}
                                transition = {{ delay: 0.2 }}>
                                <Table 
                                    columns = { columns } 
                                    data = { data } />  
                            </motion.div> 
                        </> 
                    : 
                        <motion.div
                            initial = {{ opacity: 0 }}
                            animate = {{ opacity: 1 }}>
                            <EmptyListMessage>
                                You didn't insert any reading yet
                            </EmptyListMessage>
                        </motion.div> }
                </>
                : <NotAuthorizedView/> }          
        </ContentBlock>
        </>
        :
        <>
            <MobileContentBlock>
                { logged ?
                    <>  
                        { !noReadingsView ?
                            <>
                                <motion.div
                                    initial = {{ opacity: 0, y: "-20%" }}
                                    animate = {{ opacity: 1, y: "0%" }}
                                    >
                                    <MobileListRow>
                                        <MobileListHeader>
                                            All readings
                                        </MobileListHeader>
                                        <MobileListTotal>
                                            Total: {distinctedByUuid.length}
                                        </MobileListTotal>
                                    </MobileListRow>
                                </motion.div>
                                <motion.div
                                    initial = {{ opacity: 0, y: "-100%" }}
                                    animate = {{ opacity: 1, y: "0%" }}
                                    transition = {{ delay: 0.2 }}>
                                    <MobileTable 
                                        columns = { columns } 
                                        data = { data } />  
                                </motion.div> 
                            </> 
                        : 
                            <motion.div
                                initial = {{ opacity: 0 }}
                                animate = {{ opacity: 1 }}>
                                <MobileEmptyListMessage>
                                    You didn't insert any reading yet
                                </MobileEmptyListMessage>
                            </motion.div> }
                    </>
                : <NotAuthorizedView/> }           
            </MobileContentBlock>
        </> }
        </>
    )
}


export default SensorDataList