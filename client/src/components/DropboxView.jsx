import React, { useEffect, useState, useRef } from "react"
import styles from "../style/site.module.css"
import { 
    InputText,
    DropboxButton, 
    DropboxContainer, 
    DropboxRow, 
    DropboxFile, 
    ActionButton, 
    FileSpanIcon, 
    BackButton } from "../style/styled-components"
import { 
    MobileBackButton,
    MobileDropboxButton,
    MobileDropboxContainer,
    MobileDropboxRow,
    MobileDropboxFile,
    MobileDropboxIcon, 
    MobileActionButton, 
    MobileFileSpanIcon, } from "../style/styled-mobile-components"
import { motion } from "framer-motion"
import DropboxChooser from "react-dropbox-chooser"
import styled from "styled-components"
import { DataTable, ReadingChart, Loading } from "../components"
import api from "../api"
import { v4 as uuidv4 } from "uuid"
import { useSnackbar } from "react-simple-snackbar"
import Options from "../style/options.js"

const DropboxView = (callback) => {
    const didMount = useRef(true)
    const [dropboxFile, setDropboxFile] = useState()
    const [fileName, setFileName] = useState("NO FILE CHOSEN")
    const [helper, invokeHelper] = useState(1)
    const [showButtons, setShowButtons] = useState(false)
    const [previewView, setPreviewView] = useState(false)
    const [bundleName, setBundleName] = useState("")
    const [sendWithBundle, setSendWithBundle] = useState(false)
    const [showBundleForm, setShowBundleForm] = useState(false)
    const [labelCount, setLabelCount] = useState(1)
    const [rowsCount, setRowsCount] = useState(2)
    const [timestamps, setTimestamps] = useState([])
    const [milliSeconds, setMilliseconds] = useState([])
    const [sensorLabels, setSensorLabels] = useState([])
    const [name, setName] = useState("")
    const [sensorValues, setSensorValuess] = useState([])
    const [sensorValue1, setSensorValue1] = useState([])
    const [sensorValue2, setSensorValue2] = useState([])
    const [sensorValue3, setSensorValue3] = useState([])
    const [values, setValues] = useState()
    const [labels, setLabels] = useState()
    const [mouseOver, setMouseOver] = useState(false)
    const [renderChart, setRenderChart] = useState(true)
    const [dismiss, setDismiss] = useState(false)
    const [loading, setLoading] = useState(false)
    var optionsInstance = new Options()
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(optionsInstance.successSnackbarOptions)
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar(optionsInstance.errorSnackbarOptions)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;
    const APP_KEY = process.env.REACT_APP_DROPBOX_APP_KEY

    useEffect(() => {     
        if (didMount.current ) {
            didMount.current = false
            return
        }
        
        if (dropboxFile == undefined) {
            invokeHelper(helper + 1)
        }
        else {
            setFileName(dropboxFile.name)
            setupData()
        }

        if (!sensorLabels.length) {
            invokeHelper(helper + 1)
        }

    }, [dropboxFile, sensorLabels.length])

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
    
    const handleSuccess = (file) => {
        setDropboxFile({...file[0]})
    }

    const handleMouseOver = () => {
        setMouseOver(true)
    }

    const handleMouseOut = () => {
        setMouseOver(false)
    }

    const handleDropboxClick = () => {
        if (!previewView) {
            setValues([])
            setMilliseconds([])
            setTimestamps([])
            setLabels(",undefined,undefined")    
            invokeHelper(helper + 1)
            setShowButtons(false)
        }
    }

    const setupData = async () => {
        if (dropboxFile) {
            setLoading(true)
            console.log("not done")
            const urlObj = { link: dropboxFile.link }
            const downloadResponse = await api.downloadFile(urlObj)
            if (downloadResponse.status == 200)
            {
                const readResponse = await api.readFile(dropboxFile.name)
                const csvOutput = readResponse.data.data
                const csvHeaders = Object.keys(csvOutput[0])
                const csvLabels = csvHeaders.slice(2)
                setRowsCount(csvOutput.length)
                setLabelCount(csvHeaders.length - 2)
                for (let i = 0; i < csvOutput.length; i++) {
                    timestamps[i] = Object.entries(csvOutput[i]).slice(0,1).map(entry => entry[1])[0]
                    milliSeconds[i] = parseFloat(Object.entries(csvOutput[i]).slice(1,2).map(entry => entry[1])).toFixed(2)
                    sensorValue1[i] = (Object.entries(csvOutput[i]).slice(2,3).map(entry => entry[1])).toString().replace(/[^\d.-]/g, "")
                    sensorValue2[i] = (Object.entries(csvOutput[i]).slice(3,4).map(entry => entry[1])).toString().replace(/[^\d.-]/g, "")
                    sensorValue3[i] = (Object.entries(csvOutput[i]).slice(4).map(entry => entry[1])).toString().replace(/[^\d.-]/g, "")
                    joinSensorValues(i)               
                }
                setSensorLabels({...sensorLabels, 0: csvLabels[0], 1: csvLabels[1], 2: csvLabels[2]})   
                setName({ ...name, name: dropboxFile.name })
                const mixed = [[].concat.apply([], sensorValue1),[].concat.apply([], sensorValue2),[].concat.apply([], sensorValue3)]
                setValues(mixed)
                var merged = sensorLabels[0]+","+sensorLabels[1]+","+sensorLabels[2]
                merged  = merged.replace("undefined", "")
                merged  = merged.replace("undefined", "")
                setLabels(merged.split(","))
                console.log("done")
                setLoading(false)
                setShowButtons(true)
            }
        }
    }

    const handlePreviewClick = () => {
        setPreviewView(true)
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

    const handleBackClick = async () => {
        setDismiss(true)
        await new Promise(r => setTimeout(r, 500))
        callback.onBack()
    }

    const handleChangeBundleName = event => {
        setBundleName(event.target.value)
    }

    const handleSendToBundle = async () => {
        setPreviewView(true)     
        setShowBundleForm(true)
        setShowButtons(false)
        document.getElementById("dropbox-container").style.cursor = "default";
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
                animate = {{ opacity: 1, x: previewView ? "-45%" : 0, y: previewView ? -90 : 0, scale: previewView ? 1 : 1 }}
                transition = {{ duration: 0.4 }}> 
                <DropboxRow>
                    <DropboxContainer id="dropbox-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleDropboxClick}>
                        { !previewView ?
                        <DropboxChooser
                            appKey={APP_KEY}
                            success={handleSuccess}
                            cancel={() => console.log("closed")}
                            multiselect={false}
                            extensions={[".csv"]}
                            disabled={previewView}>
                            <motion.div
                                initial = {{ opacity: 1 }}
                                animate = {{ opacity: previewView ? 0 : 1, scale: mouseOver && !previewView ? 1.2 : 1}}
                                transition = {{ duration: 0.2 }}> 
                                <DropboxButton/>
                            </motion.div>
                            <motion.div
                                initial = {{ opacity: 0, y: -120}}
                                animate = {{ opacity: mouseOver && !previewView ? 1 : 0, y: mouseOver ? -140 : -120}}
                                transition = {{ duration: 0.2 }}> 
                                <FileSpanIcon/>
                            </motion.div>
                        </DropboxChooser>
                        : null }
                    </DropboxContainer>
                    <DropboxFile>
                        {fileName}
                        { loading ? <Loading/> : null }
                            <motion.div
                                initial = {{ opacity: 0, x: 100}}
                                animate = {{ opacity: showButtons && !previewView ? 1 : 0, x: showButtons ? 0 : 100 }}
                                transition = {{ duration: 0.4 }}>                    
                                <ActionButton onClick={handlePreviewClick}>
                                    PREVIEW
                                </ActionButton>
                            </motion.div>
                            { showBundleForm ?
                            <>
                                <p className={styles.BundleFileLabel}>Bundle:</p>
                                <InputText type="text" value={bundleName} onChange={handleChangeBundleName} className={styles.TypeLabel} />
                                <motion.div
                                    initial = {{ opacity: 0, x: 100}}
                                    animate = {{ opacity: sendWithBundle ? 1 : 0, x: sendWithBundle ? 0 : 100 }}
                                    transition = {{ duration: 0.4 }}>
                                    <ActionButton id="test-send-button" onClick={handleSendClick}>
                                        SEND
                                    </ActionButton>
                                </motion.div>
                            </>
                            : 
                            <>
                                <motion.div
                                    initial = {{ opacity: 0, x: 100}}
                                    animate = {{ opacity: showButtons ? 1 : 0, x: showButtons ? 0 : -500, y: previewView ? -50 : 0 }}
                                    transition = {{ duration: 0.4 }}>
                                    <ActionButton onClick={handleSendClick}>
                                        SEND AS SINGLE
                                    </ActionButton>
                                </motion.div>
                                <motion.div
                                    initial = {{ opacity: 0, x: 100}}
                                    animate = {{ opacity: showButtons ? 1 : 0, x: showButtons ? 0 : -500, y: previewView ? -50 : 0 }}
                                    transition = {{ duration: 0.4 }}>
                                    <ActionButton onClick={handleSendToBundle}>
                                        SEND TO BUNDLE
                                    </ActionButton>
                                </motion.div>
                            </>
                            }
                    </DropboxFile>
                </DropboxRow>
            </motion.div>
            </>
            :
            <>
            <motion.div
                initial = {{ opacity: 0, x: 300}}
                animate = {{ opacity: 1, x: previewView ? "-30%" : 0, y: previewView ? "-45%" : 0 }}
                transition = {{ duration: 0.4 }}> 
                <MobileDropboxRow>
                    <MobileDropboxContainer onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleDropboxClick}>
                        { !previewView ?
                        <DropboxChooser
                            appKey={APP_KEY}
                            success={handleSuccess}
                            cancel={() => console.log("closed")}
                            multiselect={false}
                            extensions={[".csv"]}>
                            <motion.div
                                initial = {{ opacity: 1 }}
                                animate = {{ opacity: previewView ? 0 : 1, scale: mouseOver && !previewView ? 1.2 : 1}}
                                transition = {{ duration: 0.2 }}> 
                                <MobileDropboxButton/>
                            </motion.div>
                            <motion.div
                                initial = {{ opacity: 0, y: -120}}
                                animate = {{ opacity: mouseOver && !previewView ? 1 : 0, y: mouseOver ? -140 : -120}}
                                transition = {{ duration: 0.2 }}> 
                                <MobileFileSpanIcon/>
                            </motion.div>
                        </DropboxChooser>
                        : null }
                    </MobileDropboxContainer>
                    <MobileDropboxFile>
                        {fileName}
                        { loading ? <Loading/> : null }
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
                    </MobileDropboxFile>
                </MobileDropboxRow>
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

export default DropboxView