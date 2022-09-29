import React, { useEffect, useState, useRef } from "react"
import styles from "../style/site.module.css"
import { 
    ViewsRow, 
    ViewsCol, 
    InsertView, 
    FileView, 
    DropboxView, 
    ViewSpan, 
    InsertIcon, 
    FileIcon, 
    DropboxIcon, 
    JsonIcon, 
    ChooseInfo, 
    ChooseDescription } from "../style/styled-components"
import { 
    MobileChooseInfo, 
    MobileChooseRow, 
    MobileInsertIcon, 
    MobileFileIcon, 
    MobileDropboxIcon, 
    MobileJsonIcon,
    MobileInsertView,
    MobileFileView,
    MobileDropboxView,
    MobileViewSpan } from "../style/styled-mobile-components"
import { motion } from "framer-motion"

const ChooseView = (callback) => {
    const [showTitle, setShowTitle] = useState(true)
    const [showViews, setShowViews] = useState(true)
    const [showInsert, setShowInsert] = useState(false)
    const [showFile, setShowFile] = useState(false)
    const [showDropbox, setShowDropbox] = useState(false)
    const [showJson, setShowJson] = useState(false)
    const [isBlocked, setIsBlocked] = useState(false)
    const [showCapMessage, setShowCapMessage] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;

    useEffect(() => {
        setupBlock()
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    const setupBlock = async () => {
        const isTrueSet = (localStorage.getItem("isBlocked") === "true")
        console.log(isTrueSet)
        setIsBlocked(isTrueSet)
    }

    const handleInsertClick = async () => {
        if (isBlocked)
            setShowCapMessage(true)
        else {
            setShowTitle(false)
            setShowViews(false)
            await new Promise(r => setTimeout(r, 1250))
            callback.onInsert()
        }
    }

    const handleFileClick = async () => {
        if (isBlocked)
            setShowCapMessage(true)
        else {
            setShowTitle(false)
            setShowViews(false)
            await new Promise(r => setTimeout(r, 1250))
            callback.onFile()
        }
    }

    const handleDropboxClick = async () => {
        if (isBlocked)
            setShowCapMessage(true)
        else {
            setShowTitle(false)
            setShowViews(false)
            await new Promise(r => setTimeout(r, 1250))
            callback.onDropbox()
        }
    }

    const handleJsonClick = async () => {
        if (isBlocked)
            setShowCapMessage(true)
        else {
            setShowTitle(false)
            setShowViews(false)
            await new Promise(r => setTimeout(r, 1250))
            callback.onJson()
        }
    }

    return (
        <>
        { width > breakpoint ?
        <>
        <motion.div
            initial = {{ opacity: 0, y: -100}}
            animate = {{ opacity: showTitle ? 1 : 0, y: 0, x: showTitle ? 0 : -300 }}
            transition = {{ duration: 0.4 }}>
            <ChooseInfo id="insert-test-confirmer">
                Choose how do you want to send sensor reading
            </ChooseInfo>
        </motion.div>
        <ViewsRow>
            <motion.div
                initial = {{ opacity: 0, y: -100}}
                animate = {{ opacity: showViews? 1 : 0, y: 0, x: showViews? 0 : -300 }}
                transition = {{ type: "spring", delay: 0.2, duration: 0.4 }}
                className = {styles.ChooseOptionDiv}>
                <InsertView id="test-insert-button" onMouseOver={() => setShowInsert(true)} onMouseOut={() => setShowInsert(false)} onClick={handleInsertClick}>
                    <ViewSpan>
                        VIA INSERTING
                    </ViewSpan>
                    <InsertIcon/>
                </InsertView>
            </motion.div>
            <motion.div
                initial = {{ opacity: 0, y: -100}}
                animate = {{ opacity: showViews? 1 : 0, y: 0, x: showViews? 0 : -300 }}
                transition = {{ type: "spring", delay: 0.4, duration: 0.4 }}
                className = {styles.ChooseOptionDiv}>
                <FileView id="test-csv-button" onMouseOver={() => setShowFile(true)} onMouseOut={() => setShowFile(false)} onClick={handleFileClick}>
                    <ViewSpan>
                        VIA .CSV FILE
                    </ViewSpan>
                    <FileIcon/>
                </FileView>
            </motion.div>
            <motion.div
                initial = {{ opacity: 0, y: -100}}
                animate = {{ opacity: showViews? 1 : 0, y: 0, x: showViews ? 0 : -300 }}
                transition = {{ type: "spring", delay: 0.6, duration: 0.4 }}
                className = {styles.ChooseOptionDiv}>
                <DropboxView id="test-dropbox-button" onMouseOver={() => setShowDropbox(true)} onMouseOut={() => setShowDropbox(false)} onClick={handleDropboxClick}>
                    <ViewSpan>
                        VIA DROPBOX FILE
                    </ViewSpan>               
                    <DropboxIcon/>
                </DropboxView>
            </motion.div>
            <motion.div
                initial = {{ opacity: 0, y: -100}}
                animate = {{ opacity: showViews? 1 : 0, y: 0, x: showViews ? 0 : -300 }}
                transition = {{ type: "spring", delay: 0.8, duration: 0.4 }}
                className = {styles.ChooseOptionDiv}>
                <DropboxView id="test-json-button" onMouseOver={() => setShowJson(true)} onMouseOut={() => setShowJson(false)} onClick={handleJsonClick}>
                    <ViewSpan>
                        VIA JSON 
                    </ViewSpan>               
                    <JsonIcon/>
                </DropboxView>
            </motion.div>
            <motion.div
                    initial = {{ opacity: 0 }}
                    animate = {{ opacity: showInsert && showViews ? 1 : 0 }}
                    transition = {{ duration: 0.4 }}>
                    <ChooseDescription>
                        { !showCapMessage ?
                            <p>Insert sensor data into a responsive table by yourself and save it to database.</p>
                        : 
                            <p style={{"color": "#CB0000"}}>
                                You have exceeded the allowable number of arrays you can send to database.
                                Remove some readings to free up memory.
                            </p> 
                        }
                    </ChooseDescription>
            </motion.div>
            <motion.div
                initial = {{ opacity: 0 }}
                animate = {{ opacity: showFile && showViews ? 1 : 0 }}
                transition = {{ duration: 0.4 }}>
                <ChooseDescription>
                    { !showCapMessage ?
                        <p>Upload .csv file from your device and preview data in the table. You can edit the data, before sending to database.</p>
                    :
                        <p style={{"color": "#CB0000"}}>
                            You have exceeded the allowable number of arrays you can send to database.
                            Remove some readings to free up memory.
                        </p> 
                    }
                </ChooseDescription>
            </motion.div>
            <motion.div
                initial = {{ opacity: 0 }}
                animate = {{ opacity: showDropbox && showViews ? 1 : 0 }}
                transition = {{ duration: 0.4 }}>
                <ChooseDescription>
                    { !showCapMessage ?
                        <p>Open a Dropbox widget and choose one of the shared files. You can edit the data, before sending to database.</p>
                    :
                        <p style={{"color": "#CB0000"}}>
                            You have exceeded the allowable number of arrays you can send to database.
                            Remove some readings to free up memory.
                        </p> 
                    }
                </ChooseDescription>
            </motion.div>
            <motion.div
                initial = {{ opacity: 0 }}
                animate = {{ opacity: showJson && showViews ? 1 : 0 }}
                transition = {{ duration: 0.4 }}>
                <ChooseDescription>
                    { !showCapMessage ?
                        <p>Insert JSON code block to textarea, preview data and edit before sending.</p>
                    :
                        <p style={{"color": "#CB0000"}}>
                            You have exceeded the allowable number of arrays you can send to database.
                            Remove some readings to free up memory.
                        </p> 
                    }
                </ChooseDescription>
            </motion.div>
        </ViewsRow>
        </>
        : 
        <>
            <motion.div
                initial = {{ opacity: 0, y: -100}}
                animate = {{ opacity: showTitle ? 1 : 0, y: 0, x: showTitle ? 0 : -300 }}
                transition = {{ duration: 0.4 }}>
                <MobileChooseInfo>
                    Choose how do you want to send sensor reading
                </MobileChooseInfo>
            </motion.div>
            <MobileChooseRow>
                <motion.div
                    initial = {{ opacity: 0, y: -100}}
                    animate = {{ opacity: showViews? 1 : 0, y: 0, x: showViews? 0 : -300 }}
                    transition = {{ type: "spring", delay: 0.2, duration: 0.4 }}
                    className = {styles.MobileChooseOptionDiv}>
                    <MobileInsertView onMouseOver={() => setShowInsert(true)} onMouseOut={() => setShowInsert(false)} onClick={handleInsertClick}>
                        <MobileViewSpan>
                            VIA INSERTING
                        </MobileViewSpan>
                        <MobileInsertIcon/>
                    </MobileInsertView>
                </motion.div>
                <motion.div
                    initial = {{ opacity: 0, y: -100}}
                    animate = {{ opacity: showViews? 1 : 0, y: 0, x: showViews? 0 : -300 }}
                    transition = {{ type: "spring", delay: 0.4, duration: 0.4 }}
                    className = {styles.MobileChooseOptionDiv}>
                    <MobileFileView onMouseOver={() => setShowFile(true)} onMouseOut={() => setShowFile(false)} onClick={handleFileClick}>
                        <MobileViewSpan>
                            VIA .CSV FILE
                        </MobileViewSpan>
                        <MobileFileIcon/>
                    </MobileFileView>
                </motion.div>
            </MobileChooseRow>
            <MobileChooseRow>
            <motion.div
                initial = {{ opacity: 0, y: -100}}
                animate = {{ opacity: showViews? 1 : 0, y: 0, x: showViews ? 0 : -300 }}
                transition = {{ type: "spring", delay: 0.6, duration: 0.4 }}
                className = {styles.MobileChooseOptionDiv}>
                <MobileDropboxView onMouseOver={() => setShowDropbox(true)} onMouseOut={() => setShowDropbox(false)} onClick={handleDropboxClick}>
                    <MobileViewSpan>
                        VIA DROPBOX FILE
                    </MobileViewSpan>               
                    <MobileDropboxIcon/>
                </MobileDropboxView>
            </motion.div>
            <motion.div
                initial = {{ opacity: 0, y: -100}}
                animate = {{ opacity: showViews? 1 : 0, y: 0, x: showViews ? 0 : -300 }}
                transition = {{ type: "spring", delay: 0.8, duration: 0.4 }}
                className = {styles.MobileChooseOptionDiv}>
                <MobileDropboxView onMouseOver={() => setShowJson(true)} onMouseOut={() => setShowJson(false)} onClick={handleJsonClick}>
                    <MobileViewSpan>
                        VIA JSON 
                    </MobileViewSpan>               
                    <MobileJsonIcon/>
                </MobileDropboxView>
            </motion.div>           
            </MobileChooseRow>
        </> }
        </>
    )
}

export default ChooseView