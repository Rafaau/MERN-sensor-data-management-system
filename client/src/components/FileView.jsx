import React, { useEffect, useState, useRef } from "react"

import styles from "../style/site.module.css"
import { 
    InputText,
    InputFile, 
    ActionButton, 
    PcFileSpanIcon, 
    BackButton, 
    FileRow, 
    PcIcon, 
    FileContainer, 
    FileLabel } from "../style/styled-components"
import { 
    MobileFileContainer,
    MobileFileRow,
    MobilePcIcon,
    MobileFileLabel,
    MobileActionButton,
    MobilePcFileSpanIcon,
    MobileBackButton, } from "../style/styled-mobile-components"
import { motion } from "framer-motion"
import styled from "styled-components"
import { DataTable, ReadingChart, Loading } from "../components"
import api from "../api"
import { v4 as uuidv4 } from "uuid"
import { useSnackbar } from "react-simple-snackbar"
import Options from "../style/options.js"

const FileView = (callback) => {
    const [helper, invokeHelper] = useState(false)
    const [mouseOver, setMouseOver] = useState(false)
    const [file, setFile] = useState()
    const [bundleName, setBundleName] = useState("")
    const [fileName, setFileName] = useState("NO FILE CHOSEN")
    const [sendWithBundle, setSendWithBundle] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const [previewView, setPreviewView] = useState(false)
    const [labelCount, setLabelCount] = useState(1)
    const [rowsCount, setRowsCount] = useState(2)
    const [showBundleForm, setShowBundleForm] = useState(false)
    const [timestamps, setTimestamps] = useState([])
    const [milliSeconds, setMilliseconds] = useState([])
    const [sensorLabels, setSensorLabels] = useState([])
    const [name, setName] = useState("")
    const [sensorValues, setSensorValuess] = useState([])
    const [sensorValue1, setSensorValue1] = useState([])
    const [sensorValue2, setSensorValue2] = useState([])
    const [sensorValue3, setSensorValue3] = useState([])
    const [renderChart, setRenderChart] = useState(true)
    const [values, setValues] = useState()
    const [labels, setLabels] = useState()
    const [dismiss, setDismiss] = useState(false)
    const [loading, setLoading] = useState(false)
    var optionsInstance = new Options()
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(optionsInstance.successSnackbarOptions)
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar(optionsInstance.errorSnackbarOptions)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;
    const fileReader = new FileReader()

    useEffect(() => {
        setupData()
    }, [file])

    useEffect(() => {
        setRenderChart(true)


    }, [renderChart])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    useEffect(() => {
        if (bundleName)
            setSendWithBundle(true)
        else
            setSendWithBundle(false)
    }, [bundleName])

    const joinSensorValues = (number) => {
        sensorValues[number] = sensorValue1[number]+","+sensorValue2[number]+","+sensorValue3[number]
        sensorValues[number] = sensorValues[number].replace("undefined", "")
        sensorValues[number] = sensorValues[number].replace("undefined", "")
    }

    const handleChangeBundleName = event => {
        setBundleName(event.target.value)
    }

    const handleInputFile = e => {
        setValues([])
        setMilliseconds([])
        setTimestamps([])
        
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const setupData = () => {
        if (file) {
            setLoading(true)
            fileReader.onload = function (event) {
                const csvOutput = event.target.result.replaceAll(`"`, "")
                const csvHeader = csvOutput.slice(0, csvOutput.indexOf("\n")).split(",")
                console.log(csvHeader[2]+","+csvHeader[3]+","+csvHeader[4])
                const csvRows = csvOutput.slice(csvOutput.indexOf("\n") + 1).split("\n")
                console.log(csvRows.length)
                console.log(csvHeader.length)
                console.log(typeof(csvRows[0].split(",")[3]))
                setRowsCount(csvRows.length - 1)
                setLabelCount(csvHeader.length - 2)
                for (let i = 0; i < csvRows.length - 1; i++) {
                    timestamps[i] = csvRows[i].split(",")[0]
                    milliSeconds[i] = parseFloat(csvRows[i].split(",")[1]).toFixed(2)
                    sensorValue1[i] = csvRows[i].split(",")[2].replace(/[^\d.-]/g, "")
                    if (csvRows[i].split(",")[3] != undefined)
                        sensorValue2[i] = csvRows[i].split(",")[3].replace(/[^\d.-]/g, "")
                    if (csvRows[i].split(",")[4] != undefined)
                        sensorValue3[i] = csvRows[i].split(",")[4].replace(/[^\d.-]/g, "")
                    joinSensorValues(i)
                }
                console.log(csvHeader[2])
                setSensorLabels({...sensorLabels, 0: csvHeader[2]})
                if (csvHeader[3] != undefined || csvHeader[3] != "")
                    setSensorLabels({...sensorLabels, 0: csvHeader[2], 1: csvHeader[3]})
                if (csvHeader[4] != undefined || csvHeader[4] != "")
                    setSensorLabels({...sensorLabels, 0: csvHeader[2], 1: csvHeader[3], 2: csvHeader[4]})
                const name = file.name.toString().slice(0, file.name.indexOf("."))
                setName({...name, name: name})
                invokeHelper(true)
                console.log("done")
                console.log(milliSeconds)
                const mergedLabels = [csvHeader[2],csvHeader[3],csvHeader[4]].map(v => v === undefined ? "" : v)
                const mixed = [sensorValue1.map(v => v === undefined ? "" : v), 
                    sensorValue2.map(v => v === undefined ? "" : v), 
                    sensorValue3.map(v => v === undefined ? "" : v)]
                setLabels(mergedLabels)
                setValues(mixed)
                setLoading(false)
                setShowButtons(true)
            }

            fileReader.readAsText(file)
        }
    }

    const handleBackClick = async () => {
        setDismiss(true)
        await new Promise(r => setTimeout(r, 500))
        callback.onBack()
    }

    const handleMouseOver = () => {
        setMouseOver(true)
    }

    const handleMouseOut = () => {
        setMouseOver(false)
    }

    const handlePreviewClick = () => {
        setPreviewView(true)
    }

    const handleSendToBundle = async () => {
        setPreviewView(true)     
        setShowBundleForm(true)
        setShowButtons(false)
        document.getElementById("file-container").style.cursor = "default";
    }

    const handleSensorValue1Change = (event, number) => {
        values[0][number] = event
        setValues(values)
        setRenderChart(false)      
    }

    const handleSensorValue2Change = (event, number) => {
        values[1][number] = event
        setValues(values)
        setRenderChart(false)      
    }

    const handleSensorValue3Change = (event, number) => {
        values[2][number] = event
        setValues(values)
        setRenderChart(false)      
    }

    const handleSensorLabelChange = (event, number) => {
        labels[number] = event
        setLabels(labels)
        setRenderChart(false) 
    }

    const handleMillisecondsChange = (event, number) => {
        milliSeconds[number] = event
        setMilliseconds(milliSeconds)
        setRenderChart(false) 
    }

    const handleTimestampChange = (event, number) => {
        timestamps[number] = event
        setTimestamps(timestamps)
        setRenderChart(false) 
    }

    const handleSendClick = async () => {
        const userModel = JSON.parse(localStorage.getItem("userModel"))
        const userId = userModel._id
        let bundleId = 0
        if (sendWithBundle) {
            let getResponse = { status: "" }
            try {
                getResponse = await api.getBundleByName(bundleName)
            } catch (err) {
                
            } finally {
                if (getResponse.status == 200) {
                    bundleId = getResponse.data.data._id
                } else {
                    let name = bundleName
                    const groupId = 0
                    var bundle = { name, userId, groupId }
                    var createResponse = await api.createBundle(bundle)
                    if (createResponse.status == 201)
                    bundleId = createResponse.data.id
                }
            }
        }
        setLoading(true)
        setShowButtons(false)
        console.log("started")
        joinSensorValues()
        let sensorlabels = sensorLabels[0]+","+sensorLabels[1]+","+sensorLabels[2]
        sensorlabels = sensorlabels.replace("undefined", "")
        sensorlabels = sensorlabels.replace("undefined", "")
        const uuid = uuidv4()
        const name = fileName
        let successes = 0;
        for (let i = 0; i < rowsCount; i++)
        {
            const timestamp = timestamps[i]
            const milliseconds = milliSeconds[i]
            const sensorvalues = sensorValues[i]
            const sensordata = { uuid, userId, name, bundleId, timestamp, milliseconds, sensorlabels, sensorvalues }
            const response = await api.insertReading(sensordata)
            if (response.status == 201)
            {
                successes++;
            }
        }

        setLoading(false)

        if (successes == rowsCount) {
            openSuccessSnackbar("Reading created successfully!")
            callback.onInsert()
            await new Promise(r => setTimeout(r, 1000))
            window.location.href = "/sensordata/list"
        } else
            openErrorSnackbar("Something went wrong while creating data")
    }

    return (
        <>
        <motion.div
            initial = {{ opacity: 1, y: 0 }}
            animate = {{ opacity: dismiss ? 0 : 1, y: dismiss ? 500 : 0 }}
            transition = {{ duration: 0.4 }}> 
            { previewView ?
                <motion.div
                    initial = {{ opacity: 0 }}
                    animate = {{ opacity: previewView ? 1 : 0 }}
                    transition = {{ delay: 0.5, duration: 0.6}}>
                    { renderChart ? 
                    <ReadingChart
                        labels={labels} 
                        milliseconds={milliSeconds} 
                        values={values}
                        className={styles.PreviewChart}/>
                    : null }
                </motion.div> 
            : null }
            <motion.div
                initial = {{ opacity: 0 }}
                animate = {{ opacity: 1 }}
                transition = {{ duration: 0.4 }}>
                { width > breakpoint ?
                <BackButton onClick={handleBackClick}/>
                : <MobileBackButton onClick={handleBackClick}/> }
            </motion.div>
            { width > breakpoint ?
            <>
            <motion.div
                initial = {{ opacity: 0, x: 300}}
                animate = {{ opacity: 1, x: previewView ? "-45%" : 0, y: previewView ? -90 : 0 }}
                transition = {{ duration: 0.4 }}>
                <FileRow>                   
                    <FileContainer id="file-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> 
                        <InputFile disabled={previewView} id="test-input-file" onChange={handleInputFile}/>
                        <motion.div
                            initial = {{ opacity: 0, x: 300}}
                            animate = {{ opacity: previewView ? 0: 1, x: previewView ? -600 : 0 }}
                            transition = {{ duration: 0.4 }}>
                            <PcIcon/>
                        </motion.div>
                        <motion.div
                            initial = {{ opacity: 0, x: 300, y: -120 }}
                            animate = {{ opacity: previewView ? 0: 1, x: previewView ? -500 : 90, y: mouseOver ? -140 : -130 }}
                            transition = {{ duration: 0.2 }}
                            style = {{width: "10%"}}>
                            <PcFileSpanIcon/>
                        </motion.div>
                    </FileContainer>
                    <FileLabel>
                        {fileName}
                        { loading ? <Loading/> : null}
                        <motion.div
                            initial = {{ opacity: 0, x: 100}}
                            animate = {{ opacity: showButtons && !previewView ? 1 : 0, x: showButtons ? 0 : -500 }}
                            transition = {{ duration: 0.4 }}>                    
                            <ActionButton id="test-preview-button" onClick={handlePreviewClick}>
                                PREVIEW
                            </ActionButton>
                        </motion.div>
                        { showBundleForm ?
                        <>
                            <p className={styles.BundleFileLabel}>Bundle:</p>
                            <InputText type="text" value={bundleName} onChange={handleChangeBundleName} className={styles.TypeLabel} />
                            { sendWithBundle ?
                            <motion.div
                                initial = {{ opacity: 0, x: 100}}
                                animate = {{ opacity: sendWithBundle ? 1 : 0, x: sendWithBundle ? 0 : 100 }}
                                transition = {{ duration: 0.4 }}>
                                <ActionButton id="test-send-button" onClick={handleSendClick}>
                                    SEND
                                </ActionButton>
                            </motion.div>
                            : null }
                        </>
                        : 
                        <>
                            <motion.div
                                initial = {{ opacity: 0, x: 100}}
                                animate = {{ opacity: showButtons ? 1 : 0, x: showButtons ? 0 : 100, y: previewView ? -50 : 0 }}
                                transition = {{ duration: 0.4 }}>
                                <ActionButton id="test-send-button" onClick={handleSendClick}>
                                    SEND AS SINGLE
                                </ActionButton>
                            </motion.div>
                            <motion.div
                                initial = {{ opacity: 0, x: 100}}
                                animate = {{ opacity: showButtons ? 1 : 0, x: showButtons ? 0 : 100, y: previewView ? -50 : 0 }}
                                transition = {{ duration: 0.4 }}>
                                <ActionButton id="test-send-button" onClick={handleSendToBundle}>
                                    SEND TO BUNDLE
                                </ActionButton>
                            </motion.div>
                        </>
                        }
                    </FileLabel>
                </FileRow>
            </motion.div>
            </>
            :
            <>
            <motion.div
                initial = {{ opacity: 0, x: 300}}
                animate = {{ opacity: 1, x: previewView ? "-30%" : 0, y: previewView ? "-50%" : 0 }}
                transition = {{ duration: 0.4 }}>
                <MobileFileRow>
                    <MobileFileContainer onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <InputFile onChange={handleInputFile}/>
                        <motion.div
                            initial = {{ opacity: 0, x: 300}}
                            animate = {{ opacity: previewView ? 0: 1, x: previewView ? -200 : 0 }}
                            transition = {{ duration: 0.4 }}>
                            <MobilePcIcon/>
                        </motion.div>
                        <motion.div
                            initial = {{ opacity: 0, x: 300, y: -120, scale: 1.2 }}
                            animate = {{ opacity: previewView ? 0: 1, x: 90, y: mouseOver ? -140 : -130, scale: 1.2 }}
                            transition = {{ duration: 0.2 }}>
                            <MobilePcFileSpanIcon/>
                        </motion.div>
                    </MobileFileContainer>
                    <MobileFileLabel>
                        {fileName}
                        { loading ? <Loading/> : null}
                        <motion.div
                            initial = {{ opacity: 0, x: "100%", y: "-70%" }}
                            animate = {{ opacity: showButtons && !previewView ? 1 : 0, x: showButtons ? "30%" : "100%", y: "-70%" }}
                            transition = {{ duration: 0.4 }}>                    
                            <MobileActionButton onClick={handlePreviewClick}>
                                PREVIEW
                            </MobileActionButton>
                        </motion.div>
                        <motion.div
                            initial = {{ opacity: 0, x: "100%", y: "-70%" }}
                            animate = {{ opacity: showButtons ? 1 : 0, x: showButtons ? previewView ? "80%" : "30%" : "100%", y: previewView ? "-400%" : "-150%" }}
                            transition = {{ duration: 0.4 }}>
                            <MobileActionButton onClick={handleSendClick}>
                                SEND
                            </MobileActionButton>
                        </motion.div>
                    </MobileFileLabel>
                </MobileFileRow>
            </motion.div>           
            </> }
            { previewView ?
                <>
                { width > breakpoint ?
                <>
                <motion.div
                    initial = {{ opacity: 0, y: 200}}
                    animate = {{ opacity: previewView ? 1 : 0, y: previewView ? 0 : 200 }}
                    transition = {{ delay: 0.5, duration: 0.4}}>
                    <DataTable
                        passedLabels={sensorLabels}
                        passedRowsCount={rowsCount}
                        passedLabelCount={labelCount}
                        passedTimestamps={timestamps}
                        passedMilliSeconds={milliSeconds}
                        passedSensorValue1={sensorValue1}
                        passedSensorValue2={sensorValue2}
                        passedSensorValue3={sensorValue3}
                        onSensorValue1Change={handleSensorValue1Change}
                        onSensorValue2Change={handleSensorValue2Change}
                        onSensorValue3Change={handleSensorValue3Change}
                        onSensorLabelChange={handleSensorLabelChange}
                        onMillisecondsChange={handleMillisecondsChange}
                        onTimestampChange={handleTimestampChange}/>
                </motion.div> 
                </>
                :
                <>
                    <motion.div
                        initial = {{ opacity: 0, x: "80%", y: "0%"}}
                        animate = {{ opacity: previewView ? 1 : 0, x: previewView ? "0%" : "100%", y: "-80%" }}
                        transition = {{ delay: 0.5, duration: 0.6}}>
                        { renderChart ? 
                        <ReadingChart
                            labels={labels} 
                            milliseconds={milliSeconds} 
                            values={values}
                            className={styles.PreviewChart}/>
                        : null }
                    </motion.div> 
                    <motion.div
                        initial = {{ opacity: 0, y: "-20%"}}
                        animate = {{ opacity: previewView ? 1 : 0, y: previewView ? "-20%" : "100%" }}
                        transition = {{ delay: 0.5, duration: 0.4}}>
                        <DataTable
                            passedLabels={sensorLabels}
                            passedRowsCount={rowsCount}
                            passedLabelCount={labelCount}
                            passedTimestamps={timestamps}
                            passedMilliSeconds={milliSeconds}
                            passedSensorValue1={sensorValue1}
                            passedSensorValue2={sensorValue2}
                            passedSensorValue3={sensorValue3}
                            onSensorValue1Change={handleSensorValue1Change}
                            onSensorValue2Change={handleSensorValue2Change}
                            onSensorValue3Change={handleSensorValue3Change}
                            onSensorLabelChange={handleSensorLabelChange}
                            onMillisecondsChange={handleMillisecondsChange}
                            onTimestampChange={handleTimestampChange}/>
                    </motion.div>               
                </> }
                </> : null }
            </motion.div>
        </>
    )
}

export default FileView