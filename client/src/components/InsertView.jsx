import React, { useEffect, useState, useRef } from "react"
import styles from "../style/site.module.css"
import { 
    InputText, 
    ActionButton, 
    PcFileSpanIcon, 
    BackButton, 
    InsertContainer, 
    InsertNameContainer } from "../style/styled-components"
import { 
    MobileInsertNameContainer, 
    MobileInputText,
    MobileInputName,
    MobileNameLabel,
    MobileBackButton,
    MobileActionButton, } from "../style/styled-mobile-components"
import { motion } from "framer-motion"
import styled from "styled-components"
import { DataTable, ReadingChart } from "../components"
import api from "../api"
import { v4 as uuidv4 } from "uuid"
import { useSnackbar } from "react-simple-snackbar"
import Options from "../style/options.js"
import axios from "axios"

const InsertView = (callback) => {
    const didMount = useRef(true)
    const [readingName, setReadingName] = useState("")
    const [bundleName, setBundleName] = useState("")
    const [showButtons, setShowButtons] = useState(false)
    const [sendWithBundle, setSendWithBundle] = useState(false)
    const [previewView, setPreviewView] = useState(false)
    const [showBundleForm, setShowBundleForm] = useState(false)
    const [labelCount, setLabelCount] = useState(1)
    const [rowsCount, setRowsCount] = useState(2)
    const [timestamps, setTimestamps] = useState([])
    const [milliSeconds, setMilliseconds] = useState([])
    const [sensorLabels, setSensorLabels] = useState([])
    const [sensorValues, setSensorValuess] = useState([])
    const [sensorValue1, setSensorValue1] = useState([])
    const [sensorValue2, setSensorValue2] = useState([])
    const [sensorValue3, setSensorValue3] = useState([])
    const [renderChart, setRenderChart] = useState(true)
    const [values, setValues] = useState([[]])
    const [labels, setLabels] = useState([])
    const [dismiss, setDismiss] = useState(false)
    var optionsInstance = new Options()
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(optionsInstance.successSnackbarOptions)
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar(optionsInstance.errorSnackbarOptions)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;

    useEffect(() => {
        if (didMount.current ) {          
            setValues([[""],[""],[""]])
            didMount.current = false
            return
        }

        setRenderChart(true)

        if (labels[0]
            && timestamps[0]
            && timestamps[1]
            && milliSeconds[0]
            && milliSeconds[1]
            && values[0][0]
            && values[0][1]
            && readingName) {
                if (showBundleForm)
                {
                    if (bundleName)
                        setSendWithBundle(true)
                    else
                        setSendWithBundle(false)
                } else {
                    setShowButtons(true)
                }                 
            } else {
            setShowButtons(false)
            setSendWithBundle(false)
        }
    }, [renderChart])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    const handleBackClick = async () => {
        setDismiss(true)
        await new Promise(r => setTimeout(r, 500))
        callback.onBack()
    }

    const handleChangeInputName = event => {
        setReadingName(event.target.value)
        setRenderChart(false)  
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

    const handlePreviewClick = () => {
        setPreviewView(true)
    }

    const handleChangeBundleName = event => {
        setBundleName(event.target.value)
        setRenderChart(false)
    }

    const handleSendByBundle = () => {
        setShowButtons(false)
        setShowBundleForm(true)
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
        console.log("started")
        let sensorlabels = labels[0]+","+labels[1]+","+labels[2]
        sensorlabels = sensorlabels.replace("undefined", "")
        sensorlabels = sensorlabels.replace("undefined", "")
        const uuid = uuidv4()
        let name = readingName
        let successes = 0;
        for (let i = 0; i < rowsCount; i++)
        {
            let sensorvalues = values[0][i]+","+values[1][i]+","+values[2][i]
            sensorvalues = sensorvalues.replace("undefined", "")
            sensorvalues = sensorvalues.replace("undefined", "")
            const timestamp = timestamps[i]
            const milliseconds = milliSeconds[i]
            const sensordata = { uuid, userId, name, bundleId, timestamp, milliseconds, sensorlabels, sensorvalues }

            const response = await api.insertReading(sensordata)
            if (response.status == 201)
            {
                successes++;
            }
        }

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
                { width > breakpoint ?
                <motion.div
                    initial = {{ opacity: 0, x: 500}}
                    animate = {{ opacity: 1, x: 0 }}
                    transition = {{ duration: 0.4 }}>     
                    <BackButton onClick={handleBackClick}/>
                </motion.div>
                : null }
                <>
                { width > breakpoint ?
                <>
                <motion.div
                    initial = {{ opacity: 0, x: 500}}
                    animate = {{ opacity: 1, x: 0 }}
                    transition = {{ duration: 0.6 }}>    
                    <InsertContainer>
                        <InsertNameContainer>
                        <p>Name: </p>
                        <InputText id="test-insert-name" type="text" value={readingName.readingName} onChange={handleChangeInputName} className={styles.TypeLabel}/>
                        { showBundleForm ?
                        <>
                            <p className={styles.BundleLabel}>Bundle:</p>
                            <InputText type="text" value={bundleName} onChange={handleChangeBundleName} className={styles.TypeLabel} />
                            { sendWithBundle ?
                                <motion.div
                                    initial = {{ opacity: 0, x: 100}}
                                    animate = {{ opacity: sendWithBundle ? 1 : 0, x: sendWithBundle ? 0 : 100 }}
                                    transition = {{ duration: 0.4 }}>                    
                                    <ActionButton onClick={handleSendClick}>
                                        SEND
                                    </ActionButton>
                                </motion.div>
                            : null }
                        </>
                        : null }
                            { showButtons ?
                            <>
                            <motion.div
                                initial = {{ opacity: 0, x: 100}}
                                animate = {{ opacity: showButtons && !previewView ? 1 : 0, x: showButtons ? 0 : 100 }}
                                transition = {{ duration: 0.4 }}>                    
                                <ActionButton id="test-preview-button" onClick={handlePreviewClick}>
                                    PREVIEW
                                </ActionButton>
                            </motion.div>
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
                                <ActionButton onClick={handleSendByBundle}>
                                    SEND TO BUNDLE
                                </ActionButton>
                            </motion.div>
                            </> : null }
                        </InsertNameContainer>
                        { previewView ?
                        <>
                            { renderChart ?  
                                <ReadingChart
                                    labels={labels} 
                                    milliseconds={milliSeconds} 
                                    values={values}
                                    className={styles.PreviewChart}/>
                            : null }
                        </> : null }
                    </InsertContainer>
                </motion.div>
                </>
                : 
                <>
                    <motion.div
                        initial = {{ opacity: 0, x: 500}}
                        animate = {{ opacity: 1, x: 0 }}
                        transition = {{ duration: 0.6 }}>    
                            <MobileInsertNameContainer>
                            <motion.div
                                initial = {{ opacity: 0, x: 500}}
                                animate = {{ opacity: 1, x: 0 }}
                                transition = {{ duration: 0.4 }}>     
                                <MobileBackButton onClick={handleBackClick}/>
                            </motion.div>
                            <MobileNameLabel>
                                Name:
                            </MobileNameLabel>
                            <MobileInputName type="text" value={readingName.readingName} onChange={handleChangeInputName} className={styles.TypeLabel}/>
                            { showButtons ?
                            <>
                            {/* <motion.div
                                initial = {{ opacity: 0, x: 100}}
                                animate = {{ opacity: showButtons && !previewView ? 1 : 0, x: showButtons ? 0 : 100 }}
                                transition = {{ duration: 0.4 }}>                     */}
                                <MobileActionButton onClick={handlePreviewClick}>
                                    PREVIEW
                                </MobileActionButton>
                            {/* </motion.div> */}
                            {/* <motion.div
                                initial = {{ opacity: 0, x: 100}}
                                animate = {{ opacity: showButtons ? 1 : 0, x: showButtons ? 0 : 100, y: previewView ? -50 : 0 }} 
                                transition = {{ duration: 0.4 }}>*/}
                                <MobileActionButton onClick={handleSendClick}>
                                    SEND
                                </MobileActionButton>
                            {/* </motion.div> */}
                            </> : null }
                            </MobileInsertNameContainer>
                            { previewView ?
                            <>
                                { renderChart ?  
                                    <ReadingChart
                                        labels={labels} 
                                        milliseconds={milliSeconds} 
                                        values={values}
                                        className={styles.PreviewChart}/>
                                : null }
                            </> : null }
                    </motion.div>             
                </> }
                </>
                <motion.div
                    initial = {{ opacity: 0, x: 500}}
                    animate = {{ opacity: 1, x: 0 }}
                    transition = {{ duration: 0.8 }}>    
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
            </motion.div>
        </>
    )
}

export default InsertView