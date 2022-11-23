import React, { useState, useEffect, useRef, useMemo } from "react"
import { 
    Content, 
    ContentBlock,
    TableFooter,
    PreviousPage,
    NextPage,
    BackButton,
    DetailsName,
    DownloadFileButton,
    FilterButton,
    SortIcon, } from "../style/styled-components"
import { NotAuthorizedView, ReadingChart } from "../components"
import { useParams } from "react-router-dom"
import api from "../api"
import { useSortBy, useTable, usePagination } from "react-table"
import { CSVLink } from "react-csv"
import styles from "../style/site.module.css"
import { motion } from "framer-motion"
import { MobileBackButton, 
    MobileContentBlock,
    MobileDetailsName,
    MobileTableFooter,
    MobilePreviousPage,
    MobileNextPage,
    MobileSortIcon, } from "../style/styled-mobile-components"

function TaskReadingDetails() {
    const didMount = useRef(true)
    const { sensor } = useParams()
    const { task } = useParams()
    const [readings, setReadings] = useState([])
    const [helper, invokeHelper] = useState(1)
    const [nullFilter, setNullFilter] = useState([])
    const [dismiss, setDismiss] = useState(false)
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState({})
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;

    useEffect(() => {
        async function getReadings() {
            const loggedInUser = localStorage.getItem("user")
            let foundUser
            if (loggedInUser) {
                const parsed = JSON.parse(loggedInUser)
                foundUser = await api.getUserByEmail(parsed.email)
                console.log(foundUser)
                setUser(foundUser.data.data)
                setLogged(true)
            }
            let response = { status: "" }
            try {
                response = await api.getReadingsByTaskAndName(foundUser.data.data._id, task, sensor)
            } catch {

            } finally {
                if (response.status == 200) {
                    setReadings(response.data.data)
                    setNullFilter(response.data.data)
                }
            }
        }

        if (didMount.current) {
            getReadings()
            didMount.current = false
            return
        }
    },[])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    let firstTimestamp = 0
    let columns = []
    const fixedData = nullFilter.map(reading => {
        if (firstTimestamp == 0)
            firstTimestamp = reading.timestamp
        let fixedSeconds = reading.timestamp - firstTimestamp

        columns = [
            {
                Header: <>Timestamp { width > breakpoint ? <SortIcon/> : <MobileSortIcon/> } </>,
                accessor: "timestamp",
                Cell: props => 
                    <>{props.value}</>,
            },
            {
                Header: <>Seconds { width > breakpoint ? <SortIcon/> : <MobileSortIcon/> } </>,
                accessor: "milliseconds",
                Cell: props => 
                    <>{props.value}</>,
            },
            {
                Header: props => <>{reading.sensorlabels.split(",")[0]}</>,    
                accessor: "sensorvalue1",
                Cell: props =>
                    <>{props.value}</>,        
            },
            {
                Header: props => <>{reading.sensorlabels.split(",")[1]}</>,
                accessor: "sensorvalue2",
                Cell: props =>
                    <>{props.value}</>,        
            },
            {
                Header: props => <>{reading.sensorlabels.split(",")[2]}</>,
                accessor: "sensorvalue3",
                Cell: props =>
                    <>{props.value}</>,        
            },
        ]

        return {...reading, 
            timestamp: new Date(parseInt(reading.timestamp, 10)).toLocaleString(), 
            milliseconds: Math.floor(fixedSeconds / 1000),
            sensorvalue1: reading.sensorvalues.split(",")[0],
            sensorvalue2: reading.sensorvalues.split(",")[1],
            sensorvalue3: reading.sensorvalues.split(",")[2]}
    })

    const data = fixedData
    const filtered = readings.filter((data) => JSON.stringify(data).toLowerCase().indexOf("null") == -1)

    const handleNullFilter = () => {
        if (nullFilter.length != filtered.length)
            setNullFilter(filtered)
        else
            setNullFilter(readings)
    }

    let labels = []
    const milliseconds = []
    const sensorValues1 = []
    const sensorValues2 = []
    const sensorValues3 = []
    nullFilter.forEach(reading => {
        labels = reading.sensorlabels.split(",")
        milliseconds.push(Math.floor((reading.timestamp - firstTimestamp) / 1000))
        sensorValues1.push(reading.sensorvalues.split(",")[0].replace(/[^\d.-]/g, ""))
        sensorValues2.push(reading.sensorvalues.split(",")[1].replace(/[^\d.-]/g, ""))
        sensorValues3.push(reading.sensorvalues.split(",")[2].replace(/[^\d.-]/g, ""))     
    })
    const values = [sensorValues1, sensorValues2, sensorValues3]
    console.log(values)

    let csvLabels = []
    csvLabels.push(labels[0])
    if (labels[1] != "") {
        csvLabels.push(labels[1])
    }
    if (labels[2] != "") {
        csvLabels.push(labels[2])
    }
    const csvFile = [
        [`Timestamps,Milliseconds,${csvLabels}`],
    ]

    nullFilter.forEach(reading => {
        csvFile.push([`${(new Date(parseInt(reading.timestamp, 10)).toLocaleString()).replace(",", "")},${Math.floor((reading.timestamp - firstTimestamp) / 1000)},${reading.sensorvalues}`])
    })

    const handleBackToTask = async () => {
        setDismiss(true)
        await new Promise(p => setTimeout(p, 1000))
        window.location.href = `/${user._id}/task/${task}`
    }

    return (
        <>
        { width > breakpoint ?
        <ContentBlock>
            { !logged ?
            <NotAuthorizedView/>
            :
            <>
            <Content>
                <motion.div
                    initial = {{ x: "-30%", opacity: 0 }}
                    animate = {{ x: !dismiss ? "0%" : "-30%", opacity: !dismiss ? 1 : 0 }}
                    transition = {{ duration: 0.3 }}>
                    <BackButton onClick={handleBackToTask}/>
                    <DetailsName style={{ marginTop: "3vw"}}>{sensor}</DetailsName>
                </motion.div>
                <motion.div
                    initial = {{ x: "50%", opacity: 0 }}
                    animate = {{ x: !dismiss ? "0%" : "50%", opacity: !dismiss ? 1 : 0 }}
                    transition = {{ duration: 0.3, delay: 0.2 }}>
                    <ReadingChart labels={labels} milliseconds={milliseconds} values={values} /> 
                </motion.div>
                <motion.div
                    initial = {{ y: "50%", opacity: 0 }}
                    animate = {{ y: !dismiss ? "0%" : "50%", opacity: !dismiss? 1 : 0 }}
                    transition = {{ duration: 0.3, delay: 0.4 }}>
                    <CSVLink data={csvFile} filename={sensor}>
                        <DownloadFileButton style={{width: "auto", float: "right", marginTop: "25vw"}}>    
                            <span className={styles.DownloadSpan}>.csv</span>
                        </DownloadFileButton>
                    </CSVLink>
                    <FilterButton style={{width: "auto", float: "right", marginBottom: "1vh", marginTop: "25vw", marginRight: "0.5vw"}} onClick={handleNullFilter}>Filter null values</FilterButton>
                    <Table columns={columns} data={data} />
                </motion.div>
            </Content>
            </> }
        </ContentBlock>
        :
        <MobileContentBlock>
            { !logged ?
            <NotAuthorizedView/>
            :
            <>
                <motion.div
                    initial = {{ x: "-30%", opacity: 0 }}
                    animate = {{ x: !dismiss ? "0%" : "-30%", opacity: !dismiss ? 1 : 0 }}
                    transition = {{ duration: 0.3 }}>
                    <MobileBackButton onClick={handleBackToTask}/>
                    <MobileDetailsName style={{ marginTop: "3vw" }}>{sensor}</MobileDetailsName>
                </motion.div>
                <motion.div
                    initial = {{ x: "50%", opacity: 0 }}
                    animate = {{ x: !dismiss ? "0%" : "50%", opacity: !dismiss ? 1 : 0 }}
                    transition = {{ duration: 0.3, delay: 0.2 }}
                    class="mt-5">
                    <ReadingChart labels={labels} milliseconds={milliseconds} values={values} /> 
                </motion.div>
                <motion.div
                    initial = {{ y: "50%", opacity: 0 }}
                    animate = {{ y: !dismiss ? "0%" : "50%", opacity: !dismiss? 1 : 0 }}
                    transition = {{ duration: 0.3, delay: 0.4 }}>
                    <CSVLink data={csvFile} filename={sensor}>
                        <DownloadFileButton style={{width: "auto", float: "right", marginTop: "5vw"}}>    
                            <span className={styles.DownloadSpan}>.csv</span>
                        </DownloadFileButton>
                    </CSVLink>
                    <FilterButton style={{width: "auto", float: "right", marginBottom: "1vh", marginTop: "5vw", marginRight: "0.5vw"}} onClick={handleNullFilter}>Filter null values</FilterButton>
                    <MobileTable columns={columns} data={data} />
                </motion.div>
                </> }
        </MobileContentBlock> }
        </>
    )
}

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

export default TaskReadingDetails