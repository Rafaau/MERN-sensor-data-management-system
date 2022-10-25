import React, { useState, useEffect, useRef } from "react"
import { 
    Content, 
    ContentBlock, 
    DownloadFileButton, 
    TaskDate, 
    TaskDateLabel, 
    TaskHeader, 
    TaskReadingTab,
    TaskUpper} from "../style/styled-components"
import { useParams } from "react-router-dom"
import api from "../api"
import styles from "../style/site.module.css"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { motion } from "framer-motion"

function TaskDetails() {
    const didMount = useRef(true)
    const { task } = useParams()
    const [readings, setReadings] = useState([])
    const [dismiss, setDismiss] = useState(false)
    const zip = new JSZip()

    useEffect(() => {
        async function getReadings() {
            let response = { status: "" }
            try {
                response = await api.getReadingsByTask(task)
            } catch {

            } finally {
                if (response.status == 200) {
                    setReadings(response.data.data)
                }
            }
        }

        if (didMount.current) {
            getReadings()
            didMount.current = false
            return
        }
    })

    const groupedBySensor = [...new Map(readings.map(reading => [reading["name"], reading])).values()]
    const firstLog = new Date(Math.min(...readings.map(r => new Date(r.createdAt))))
    const lastLog = new Date(Math.max(...readings.map(r => new Date(r.createdAt))))

    const handleRedirectToReading = async sensor => {
        setDismiss(true)
        await new Promise(p => setTimeout(p, 800))
        window.location.href = `/task/${task}/${sensor.name}`
    }

    const TaskReadings = () => {
        let rows = []
        let i = 0
        groupedBySensor.forEach(sensor => {
            i+=0.1
            rows.push(
                <>
                    <motion.div
                        initial = {{ y: "-40%", opacity: 0 }}
                        animate = {{ y: "0%", opacity: !dismiss ? 1 : 0 }}
                        transition = {{ duration: 0.2, delay: !dismiss ? i : 0, type: "spring" }}>
                        <TaskReadingTab onClick={() => {handleRedirectToReading(sensor)}}>
                            {sensor.name}
                            <div style={{float: "right"}}>Total readings: {readings.filter(r => r.name == sensor.name).length}</div>
                        </TaskReadingTab>
                    </motion.div>
                </>
            )
        })

        return rows
    }

    const generateZip = async () => {
        let zipFile = zip
        groupedBySensor.forEach(async (reading) => {
            const file = await api.getReadingsByTaskAndName(task, reading.name)
            console.log(file.data.data)
            let fileArray = []
            const labels = Object.entries(file.data.data[0]).slice(7,8).map(entry => entry[1]).toString().split(",")
            if(file.data.data.length) {
                let firstLog = 0
                const filtered = file.data.data.filter((data) => JSON.stringify(data).toLowerCase().indexOf("null") == -1)
                filtered.forEach(reading => {   
                    if (firstLog == 0)
                        firstLog = reading.timestamp 
                    fileArray.push({ 
                        Timestamp: (new Date(parseInt(reading.timestamp,10))).toLocaleString().replace(",", ""), 
                        Milliseconds: Math.floor((reading.timestamp - firstLog) / 1000), 
                        [labels[0]]: reading.sensorvalues.split(",")[0],
                        [labels[1]]: reading.sensorvalues.split(",")[1],
                        [labels[2]]: reading.sensorvalues.split(",")[2] }) 
                    })

                console.log(fileArray)
                const csvString = [
                    [
                        Object.keys(fileArray[0])
                    ],
                    ...fileArray.map(item => [
                        Object.values(item)
                    ])
                ]

                let fileString = ""
                csvString.forEach(string => {
                    fileString = fileString + string + "\n"
                })
                console.log(fileString)
                zipFile.file(reading.name+".csv", fileString)
            }})

            await new Promise((resolve) => setTimeout(resolve, 1000)) // To avoid empty zip
            zipFile.generateAsync({ type: "blob" }).then(content => {
                saveAs(content, task + ".zip")
            })
    }

    return (
        <ContentBlock>
            <TaskUpper>
                <motion.div
                    initial = {{ x: "-30%", opacity: 0 }}
                    animate = {{ x: !dismiss ? "0%" : "-30%", opacity: !dismiss ? 1 : 0 }}
                    transition = {{ duration: 0.3, type: "spring" }}>
                    <TaskHeader>{task}</TaskHeader>
                    <DownloadFileButton style={{float: "left"}} onClick={generateZip}> 
                        <span className={styles.DownloadSpan}>. zip</span>
                    </DownloadFileButton>
                </motion.div>
                <div style={{width: "100%"}}>
                    <motion.div
                        initial = {{ x: "30%", opacity: 0 }}
                        animate = {{ x: !dismiss ? "0%" : "30%", opacity: !dismiss ? 1 : 0 }}
                        transition = {{ duration: 0.3, delay: 0.2 }}>
                        <TaskDateLabel>First log:</TaskDateLabel>
                        <TaskDate>{firstLog.toLocaleString()}</TaskDate>
                    </motion.div>
                    <motion.div
                        initial = {{ x: "30%", opacity: 0 }}
                        animate = {{ x: !dismiss ? "0%" : "30%", opacity: !dismiss ? 1 : 0 }}
                        transition = {{ duration: 0.3, delay: 0.4 }}>
                        <TaskDateLabel className="mt-2">Last log:</TaskDateLabel>
                        <TaskDate>{lastLog.toLocaleString()}</TaskDate>
                    </motion.div>
                </div>
            </TaskUpper>
            <TaskReadings />
        </ContentBlock>
    )
}

export default TaskDetails