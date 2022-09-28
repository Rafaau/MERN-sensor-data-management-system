import React, { useEffect, useState, useRef } from "react"
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
    DetailsName } from "../style/styled-components"
import { MobileContentBlock, MobileDetailsName } from "../style/styled-mobile-components"
import { ReadingChart, NotAuthorizedView } from "../components"
import styles from "../style/site.module.css"
import { motion } from "framer-motion"


function SensorDataDetails() {
    const didMount = useRef(true)
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(false)
    const [reading, setReading] = useState("")
    const [readings, setReadings] = useState([])
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])
    const [milliseconds, setMilliseconds] = useState([])
    const [chartLabelz, setChartLabels] = useState([])
    const [chartData, setChartData] = useState([])
    const { uuid } = useParams()
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;
    let data, options

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

    const DataTable = () => {
        return (
            <motion.table 
                initial = {{ opacity: 0, x: "-50%" }}
                animate = {{ opacity: 1, x: "0%" }}
                transition = {{ type: "spring", duration: 0.5}}
                className = {styles.ReadingTable}>
                <thead  className={styles.ReadingHead}>
                    <tr>
                        <Head span="Timestamps"/>
                        <Head span="Milliseconds"/>
                        <Head span={labels[0]}/>
                        <Head span={labels[1]}/>
                        <Head span={labels[2]}/>
                    </tr>
                </thead>
                {readings.map((reading, index) => (
                    <tbody data-index={index} className={styles.ReadingBody}>
                            <motion.tr
                                initial = {{ opacity: 0, y: "-10%" }}
                                animate = {{ opacity: 1, y: "0%" }}
                                transition = {{ type: "spring", duration: 0.2, delay: index-(index*0.85) }}>      
                                <Cell span={new Date(reading.timestamp).toLocaleString()}/>
                                <Cell span={reading.milliseconds}/>
                                <Cell span={reading.sensorvalues.split(",")[0]}/>
                                <Cell span={reading.sensorvalues.split(",")[1]}/>
                                <Cell span={reading.sensorvalues.split(",")[2]}/>
                            </motion.tr>  
                    </tbody>
                ))}
            </motion.table>
        )
    }

    const csvFile = [
        [`Timestamps,Milliseconds,${labels}`],
    ]

    readings.forEach(reading => (      
        csvFile.push([`${reading.timestamp},${reading.milliseconds},${reading.sensorvalues}`])
    ))

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
                    <CSVLink data={csvFile} filename={reading.type}>
                        <DownloadFileButton>    
                            <span className={styles.DownloadSpan}>.csv</span>
                        </DownloadFileButton>
                    </CSVLink>
                    <DataTable/>
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
                    <DataTable/>
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