import React, { useEffect, useState, useRef, useMemo } from "react"
import { useParams } from "react-router-dom"
import api from "../api"

import { 
    ContentBlock, 
    SingleReadingRow, 
    RemoveButton, 
    ListRow, 
    ListHeader, 
    ListTotal, 
    SortIcon, 
    EmptyListMessage, 
    DownloadFileButton } from "../style/styled-components"
import { 
    MobileContentBlock, 
    MobileListHeader, 
    MobileListTotal, 
    MobileSortIcon, 
    MobileEmptyListMessage } from "../style/styled-mobile-components"
import { NotAuthorizedView, Tooltips, Table } from "../components"
import { MobileTable } from "../mobile-components"
import styles from "../style/site.module.css"
import { motion } from "framer-motion"
import Modal from "react-bootstrap/Modal"
import Options from "../style/options.js"
import { useSnackbar } from "react-simple-snackbar"
import JSZip from "jszip"
import { saveAs } from "file-saver"

function SensorDataBundleDetails(callback) {
    const didMount = useRef(true)
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(false)
    const [readings, setReadings] = useState([])
    const [currentBundle, setCurrentBundle] = useState({})
    const [noReadingsView, setNoReadingsView] = useState(false)
    const { id } = useParams()
    const [readingObj, passReadingObj] = useState({})
    const [show, setShow] = useState(false)
    const [helper, invokeHelper] = useState(1)
    var optionsInstance = new Options()
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(optionsInstance.successSnackbarOptions)
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar(optionsInstance.errorSnackbarOptions)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;
    const zip = new JSZip()

    useEffect(() => {
        async function getUser() {
            const loggedInUser = localStorage.getItem("user")
            if (loggedInUser) {
                const foundUser = loggedInUser
                const user = await api.getUserByEmail(JSON.parse(foundUser).email)
                setUser(user.data.data)
                setLogged(true)
            }
        }

        async function getReadings() {
            let response = { status: "" }
            try {
                response = await api.getReadingByBundle(id)
            } catch (err) {
                setNoReadingsView(true)
            } finally {
                if (response.status == 200) {
                    setReadings(response.data.data)
                    setNoReadingsView(false)
                }
            }
        }

        async function getCurrentBundle() {
            var response = await api.getBundleById(id)
            setCurrentBundle(response.data.data)
        }

        if (didMount.current) {
            getUser()
            getReadings()
            getCurrentBundle()
            didMount.current = false
            return
        }

        getUser()
        getReadings()
        getCurrentBundle()
    }, [helper])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    const generateZip = async () => {
        let zipFile = zip
        distinctedByUuid.forEach(async (reading) => {
            const file = await api.getReadingByUuid(reading.uuid)
            console.log(file.data.data)
            let fileArray = []
            const labels = Object.entries(file.data.data[0]).slice(7,8).map(entry => entry[1]).toString().split(",")
            if(file.data.data.length) {
                file.data.data.forEach(reading => (     
                    fileArray.push({ 
                        Timestamp: reading.timestamp, 
                        Milliseconds: reading.milliseconds, 
                        [labels[0]]: reading.sensorvalues.split(",")[0],
                        [labels[1]]: reading.sensorvalues.split(",")[1],
                        [labels[2]]: reading.sensorvalues.split(",")[2] }) 
                ))
                
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
                    fileString = fileString + string.join(",")+"\n"
                })
                console.log(fileString)
                zipFile.file(reading.name+".csv", fileString)
            }})

            await new Promise((resolve) => setTimeout(resolve, 1000)) // To avoid empty zip
            zipFile.generateAsync({ type: "blob" }).then(content => {
                saveAs(content, currentBundle.name+".zip")
            })
    }

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = (obj) => {
        setShow(true)
        passReadingObj({...obj})
    }

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

    const distinctedByUuid = [...new Map(readings.map(sensordata => [sensordata["uuid"], sensordata])).values()]
    const fixedDate = distinctedByUuid.map(sensordata => { 
        return {...sensordata, createdAt: new Date(sensordata.createdAt).toLocaleString()}
    })

    const data = useMemo(() => fixedDate,
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
                        { props.row.original.userId == user._id ?
                        <>
                            <RemoveButton id="test-remove-button" data-tip data-for="DeleteReading" onClick={() => {handleShow(props.row.original)}}/>
                            <Tooltips/>  
                        </> : null }
                    </>     
                )             
        },
    },
    ]

    return (
        <>
        { width > breakpoint ?
        <ContentBlock>
            { !logged ?
                <NotAuthorizedView/>
                :
                <>
                { !noReadingsView ?
                <>
                    <motion.div
                        initial = {{ opacity: 0, y: "-20%" }}
                        animate = {{ opacity: 1, y: "0%" }}
                        >
                        <ListRow>
                            <ListHeader>
                                {currentBundle.name} readings
                            </ListHeader>
                            <DownloadFileButton style={{ width: "100px", marginTop: "2vw" }} onClick={generateZip}>
                                <span className={styles.DownloadSpan}>. zip</span>
                            </DownloadFileButton>
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
                    <EmptyListMessage style={{marginTop: "20%"}}>
                        You didn't insert any reading yet
                    </EmptyListMessage>
                </motion.div> }
                </> }
        </ContentBlock>
        :
        <MobileContentBlock>
                { !logged ?
                    <NotAuthorizedView/>
                :
                <>
                { !noReadingsView ?
                <>
                    <motion.div
                        initial = {{ opacity: 0, y: "-20%" }}
                        animate = {{ opacity: 1, y: "0%" }}
                        >
                        <ListRow>
                            <MobileListHeader>
                                {currentBundle.name} readings
                            </MobileListHeader>
                            <DownloadFileButton style={{ width: "100px", marginTop: "2vw" }} onClick={generateZip}>
                                <span className={styles.DownloadSpan}>. zip</span>
                            </DownloadFileButton>
                            <MobileListTotal>
                                Total: {distinctedByUuid.length}
                            </MobileListTotal>
                        </ListRow>
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
                    <MobileEmptyListMessage style={{marginTop: "20%"}}>
                        You didn't insert any reading yet
                    </MobileEmptyListMessage>
                </motion.div> }
                </> }
        </MobileContentBlock> }

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
}

export default SensorDataBundleDetails