import React, { useEffect, useState, useRef, useMemo } from "react"
import { useParams } from "react-router-dom"
import { CSVLink } from "react-csv"
import { Line } from "react-chartjs-3"
import api from "../api"

import { 
    ContentBlock, 
    Content, 
    ReadingCell, 
    ReadingHead, 
    DownloadFileButton, 
    DetailsRow, 
    DetailsName,
    SortIcon,
    IsNotMonotonous, } from "../style/styled-components"
import { 
    MobileContentBlock, 
    MobileDetailsName,
    MobileSortIcon, } from "../style/styled-mobile-components"
import { ReadingChart, NotAuthorizedView, Table } from "../components"
import { MobileTable } from "../mobile-components"
import styles from "../style/site.module.css"
import { motion } from "framer-motion"


function SensorDataDetails() {
    const didMount = useRef(true)
    const [logged, setLogged] = useState(false)
    const [reading, setReading] = useState("")
    const [readings, setReadings] = useState([])
    const [user, setUser] = useState({})
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])
    const [milliseconds, setMilliseconds] = useState([])
    const [isMonotonous, setIsMonotonous] = useState(true)
    const { uuid } = useParams()
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;

    useEffect(() => {
        const getData = async () => {
            const response = await api.getReadingByUuid(uuid)
            setReading(response.data.data[0])
        }

        if (didMount.current) {
            getData()
            setupUser()
            didMount.current = false
            return
        }

        const getReadings = async () => {
            const response = await api.getReadingByUuid(uuid)
            setReadings(response.data.data)
        }

        if (!reading.length) {
            getData();
        }
   
        if (!readings.length) {
            getReadings();
        }

        if (reading.sensorlabels != undefined) {
            setLabels(reading.sensorlabels.split(","))
        }

        if(readings.length) {
            const chartLabels = []
            const sensorValues1 = []
            const sensorValues2 = []
            const sensorValues3 = []
            readings.forEach(reading => (      
                chartLabels.push(reading.milliseconds),
                sensorValues1.push(reading.sensorvalues.split(",")[0]),
                sensorValues2.push(reading.sensorvalues.split(",")[1]),
                sensorValues3.push(reading.sensorvalues.split(",")[2])
            ))
            setMilliseconds(chartLabels)
            const mixed = [sensorValues1,sensorValues2,sensorValues3]
            setValues(mixed)
        }

    }, [reading.sensorlabels, reading.sensorvalues, readings.length])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    const setupUser = () => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = loggedInUser
            setUser(JSON.parse(foundUser))
            setLogged(true)
        }
    }

    const Cell = (props) => {
        return (
            <ReadingCell>{props.span}</ReadingCell>
        )
    }

    const Head = (props) => {
        return (
            <ReadingHead>{props.span}</ReadingHead>
        )
    }

    /// CSV ////
    const csvFile = [
        [`Timestamps,Milliseconds,${labels}`],
    ]

    readings.forEach(reading => (      
        csvFile.push([reading.timestamp,reading.milliseconds,reading.sensorvalues.replaceAll('"', "")])
    ))

    ////////////

    /// TABLE //
    // const filteredByBundleId = sensordatas.filter(sensordata => sensordata.bundleId == 0)
    // const readingCount = [...new Map(sensordatas.map(sensordata => [sensordata["uuid"], sensordata])).values()].length
    // const distinctedByUuid = [...new Map(filteredByBundleId.map(sensordata => [sensordata["uuid"], sensordata])).values()]
    // const fixedDate = distinctedByUuid.map(sensordata => { 
    //     return {...sensordata, createdAt: new Date(sensordata.createdAt).toLocaleString()}
    // })
    const data = readings.map(reading => {
        return {...reading, 
            timestamp: reading.timestamp, 
            milliseconds: reading.milliseconds,
            sensorvalue1: reading.sensorvalues.split(",")[0],
            sensorvalue2: reading.sensorvalues.split(",")[1],
            sensorvalue3: reading.sensorvalues.split(",")[2]}
    })

    for (let i = 0; i < readings.length; i++) {
        if (i != 0 && isMonotonous && readings[i].milliseconds - readings[i - 1].milliseconds > 5000) {
            setIsMonotonous(false);
            break;
        }
    } 

    const columns = [
        {
            Header: <>Timestamps { width > breakpoint ? <SortIcon/> : <MobileSortIcon/> }</>,
            accessor: "timestamp",
            Cell: props => 
                <>{props.value}</>,
        },
        {
            Header: <>Milliseconds { width > breakpoint ? <SortIcon/> : <MobileSortIcon/> }</>,
            accessor: "milliseconds",
            Cell: props => 
                <>{props.value}</>,
        },
        {
            Header: <>{labels[0]}</>,
            accessor: "sensorvalue1",
            Cell: props =>
                <>{props.value}</>,       
        },
        {
            Header: <>{labels[1]}</>,
            accessor: "sensorvalue2",
            Cell: props =>
                <>{props.value}</>,       
        },
        {
            Header: <>{labels[2]}</>,
            accessor: "sensorvalue3",
            Cell: props =>
                <>{props.value}</>,       
        },
    ]

    /////////

    return (
        <>
        { width > breakpoint ?
        <>
        <ContentBlock>
            <Content>
                { logged ? 
                <>
                    <DetailsRow>
                        <motion.div
                            initial = {{ opacity: 0, x: "-50%" }}
                            animate = {{ opacity: 1, x: "0%" }}
                            transition = {{ type: "spring", duration: 0.5 }}>
                            <DetailsName>
                                {reading.name}
                            </DetailsName>
                            { !isMonotonous ?
                                <IsNotMonotonous>
                                    It seems like there are some significant intervals between timestamps,
                                    so probably the chart was drawn incorrectly.
                                </IsNotMonotonous>
                                : null
                            }
                        </motion.div>
                        {labels.length && milliseconds.length && values.length? 
                            <>
                                <motion.div
                                    initial = {{ opacity: 0, x: "50%" }}
                                    animate = {{ opacity: 1, x: "0%" }}
                                    transition = {{ type: "spring", duration: 0.5, delay: 0.3 }}>
                                    <ReadingChart labels={labels} milliseconds={milliseconds} values={values} /> 
                                </motion.div>
                            </>
                        : null}
                    </DetailsRow>
                    <CSVLink data={csvFile} filename={reading.name} enclosingCharacter={""}>
                        <DownloadFileButton>    
                            <span className={styles.DownloadSpan}>.csv</span>
                        </DownloadFileButton>
                    </CSVLink>
                    <Table data={data} columns={columns}/>
                    <div style={{ "height": "1vh"}}>
                    </div>
                </> 
                : <NotAuthorizedView/> }
            </Content>
        </ContentBlock>
        </>
        :
        <>
            <MobileContentBlock>
            { logged ? 
                <>
                        <motion.div
                            initial = {{ opacity: 0, x: "-50%" }}
                            animate = {{ opacity: 1, x: "0%" }}
                            transition = {{ type: "spring", duration: 0.5 }}>
                            <MobileDetailsName>
                                {reading.name}
                            </MobileDetailsName>
                        </motion.div>
                        {labels.length && milliseconds.length && values.length? 
                            <>
                                <motion.div
                                    initial = {{ opacity: 0, x: "50%", y: "50%" }}
                                    animate = {{ opacity: 1, x: "0%", y: "50%" }}
                                    transition = {{ type: "spring", duration: 0.5, delay: 0.3 }}>
                                    <ReadingChart labels={labels} milliseconds={milliseconds} values={values} /> 
                                </motion.div>
                            </>
                        : null}
                    { width < breakpoint ? <div className={styles.DetailsPadding}></div> : null}
                    <CSVLink data={csvFile} filename={reading.type}>
                        <DownloadFileButton>    
                            <span className={styles.DownloadSpan}>.csv</span>
                        </DownloadFileButton>
                    </CSVLink>
                    <MobileTable data={data} columns={columns} />
                    <div style={{ "height": "1vh"}}>
                    </div>
                </> 
                : <NotAuthorizedView/> }
            </MobileContentBlock>
        </> }
        </>
    )
}

export default SensorDataDetails