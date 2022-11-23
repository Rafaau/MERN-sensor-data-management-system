import React, { useState, useEffect, useRef } from "react"
import { 
    Content,
    ContentBlock,
    SensorLi,
    SensorUl,
    TaskDate,
    TaskDateLabel,
    TaskHeader,
    TaskLabel,
    TaskTab,
    SolutionButton,
    HomeDescription,
    BackButton,
    TaskContainer,
    SolutionStep,
    SolutionStepDescription,
    DeleteTask,
    ShareButton,
    EmptyList, } from "../style/styled-components"
import api from "../api"
import { motion } from "framer-motion"
import { useMemo } from "react"
import stepOne from "../style/images/StepOne.jpg"
import stepTwo from "../style/images/StepTwo.jpg"
import stepThree from "../style/images/StepThree.jpg"
import stepFour from "../style/images/StepFour.jpg"
import styles from "../style/site.module.css"
import Modal from "react-bootstrap/Modal"
import Options from "../style/options.js"
import { useSnackbar } from "react-simple-snackbar"
import { MobileBackButton, 
    MobileContentBlock, 
    MobileDeleteTask, 
    MobileEmptyListMessage, 
    MobileHomeDescription, 
    MobileSensorLi, 
    MobileSensorUl, 
    MobileSolutionButton, 
    MobileSolutionStep, 
    MobileSolutionStepDescription, 
    MobileTaskContainer, 
    MobileTaskDate, 
    MobileTaskDateLabel, 
    MobileTaskHeader, 
    MobileTaskLabel, 
    MobileTaskTab } from "../style/styled-mobile-components"
import { NotAuthorizedView } from "../components"

function SensorDataCollector() {
    const didMount = useRef(true)
    const [user, setUser] = useState({})
    const [tasks, setTasks] = useState([])
    const [sharedTasks, setSharedTasks] = useState([])
    const [logged, setLogged] = useState(false)
    const [dismiss, setDismiss] = useState(false)
    const [view, setView] = useState("tasklist")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [taskObj, passTaskObj] = useState({})
    const [helper, invokeHelper] = useState(1)
    const [taskRefresh, setTaskRefresh] = useState(1)
    var optionsInstance = new Options()
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(optionsInstance.successSnackbarOptions)
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar(optionsInstance.errorSnackbarOptions)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;

    useEffect(() => {
        if (didMount.current) {
            setupUser()
            didMount.current = false
            return
        }
        setupTasks(user._id)
        setupSharedTasks()
    }, [helper])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    const setupUser = async () => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const parsed = JSON.parse(loggedInUser)
            const foundUser = await api.getUserByEmail(parsed.email)
            console.log(foundUser)
            setUser(foundUser.data.data)
            setLogged(true)
            setupTasks(foundUser.data.data._id)
            setupSharedTasks()
        }
    }

    const setupTasks = async (id) => {
        let response = { status: "" }
        try {
            response = await api.getReadingByUuid(id)
        } catch(err) {

        } finally {
            if (response.status == 200) {
                setTasks(response.data.data)
            }
        }
    }

    const setupSharedTasks = async () => {
        let response = { status: "" }
        try {
            response = await api.getSharedTasks()
        } catch(err) {

        } finally {
            if (response.status == 200) {
                setSharedTasks(response.data.data)
            }
        }      
    }

    const handleRedirectToTask = async (e, task) => {
        e.preventDefault()
        if (e.target.className != "sc-gzzPqb bfHMkW fa-solid fa-trash-can" 
            && e.target.className != "sc-kgflAQ kqIqOo fa-solid fa-share-nodes"
            && e.target.className != "sc-hxWoir eeaFnH fa-solid fa-trash-can")
        {
            setDismiss(true)
            await new Promise(p => setTimeout(p, 300))
            window.location.href = `/${user._id}/task/${task.task}`
        }
    }

    const handleShowDeleteModal = (e, obj) => {
        invokeHelper(helper + 1)
        e.preventDefault()
        console.log(e.target.className)

        passTaskObj({...obj})
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    }

    const handleDeleteTask = async e => {
        e.preventDefault()
        var response = await api.deleteReadingsByTask(taskObj.task, user._id)
        if (response.status == 200)
            openSuccessSnackbar("Task deleted successfully!")
        else
            openErrorSnackbar("Something went wrong while deleting task")

        invokeHelper(helper + 1)
        setShowDeleteModal(false)
    }

    const handleShareTask = async (e, obj) => {
        e.preventDefault()
        console.log(e.target.className)
        const response = await api.shareTaskByName(user._id, obj.task) 
        if (response.status == 200) {
            if (!obj.isShared)
                openSuccessSnackbar("Task shared successfully!")
            else
                openSuccessSnackbar("Task is no more shared")
                invokeHelper({...helper})      
        } 
        else {
            openErrorSnackbar("Something went wrong")
            invokeHelper({...helper}) 
        }
    }

    const groupedByTasks = [...new Map(tasks.map(task => [task["task"], task])).values()]

    const TaskTabs = () => {
        let rows = []
        let i = 0
        groupedByTasks.forEach(task => {
            const sensorsInTask = tasks.filter(t => t.task == task.task)
            const firstLog = new Date(Math.min(...sensorsInTask.map(s => new Date(s.createdAt))))
            const lastLog = new Date(Math.max(...sensorsInTask.map(s => new Date(s.createdAt))))
            const groupedBySensor = [...new Map(sensorsInTask.map(task => [task["name"], task])).values()]
            let sensors = []
            groupedBySensor.forEach(sensor => {
                sensors.push(
                    <>
                        { width > breakpoint ?
                        <SensorLi>
                            {sensor.name}
                        </SensorLi>
                        :
                        <MobileSensorLi>
                            {sensor.name}
                        </MobileSensorLi> }
                    </>
                )
            })
            rows.push(
                <>
                    <motion.div
                        initial = {{ y: helper < 2 ? "-30%" : "0%", opacity: helper < 2 ? 0 : 1 }}
                        animate = {{ y: !dismiss ? "0%" : "-30%", opacity: !dismiss ? 1 : 0 }}
                        transition = {{ duration: 0.3, delay: i }}>
                        { width > breakpoint ?
                        <div style={{ marginRight: "1.5vw" }}>
                            <TaskTab onClick={(e) => {handleRedirectToTask(e, task)}}>
                                <DeleteTask onClick = { (e) => {handleShowDeleteModal(e, task)} } />
                                <TaskLabel>{task.task}</TaskLabel>
                                <SensorUl>Sensors:</SensorUl>
                                { !task.isShared ?
                                    <ShareButton style={{ color: "gray" }} onClick={(e) => {handleShareTask(e, task)}} />
                                : <ShareButton onClick={(e) => {handleShareTask(e, task)}} /> }
                                {sensors}
                                <TaskDateLabel style={{ marginTop: "1vw" }}>First log:</TaskDateLabel>
                                <TaskDate>{firstLog.toLocaleString()}</TaskDate>
                                <TaskDateLabel>Last log:</TaskDateLabel>
                                <TaskDate>{lastLog.toLocaleString()}</TaskDate>
                            </TaskTab>
                        </div>
                        :
                        <div style={{ marginRight: "4vw" }}>
                            <MobileTaskTab onClick={(e) => {handleRedirectToTask(e, task)}}>
                                <MobileDeleteTask onClick = { (e) => {handleShowDeleteModal(e, task)} } />
                                <MobileTaskLabel>{task.task}</MobileTaskLabel>
                                <MobileSensorUl>Sensors:</MobileSensorUl>
                                { !task.isShared ?
                                    <ShareButton style={{ color: "gray" }} onClick={(e) => {handleShareTask(e, task)}} />
                                : <ShareButton onClick={(e) => {handleShareTask(e, task)}} /> }
                                {sensors}
                                <MobileTaskDateLabel style={{ marginTop: "4vw" }}>First log:</MobileTaskDateLabel>
                                <MobileTaskDate>{firstLog.toLocaleString()}</MobileTaskDate>
                                <MobileTaskDateLabel>Last log:</MobileTaskDateLabel>
                                <MobileTaskDate>{lastLog.toLocaleString()}</MobileTaskDate>
                            </MobileTaskTab>                         
                        </div> }
                    </motion.div>
                </>
            )

            i += 0.2
        })
        
        return rows
    }

    const filteredShared = sharedTasks.filter(task => task.userId != user._id)
    const groupedByShared = [...new Map(filteredShared.map(task => [task["task"], task])).values()]

    const SharedTaskTabs = () => {
        let rows = []
        let i = 0
        groupedByShared.forEach(task => {
            const sensorsInTask = filteredShared.filter(t => t.task == task.task)
            const firstLog = new Date(Math.min(...sensorsInTask.map(s => new Date(s.createdAt))))
            const lastLog = new Date(Math.max(...sensorsInTask.map(s => new Date(s.createdAt))))
            const groupedBySensor = [...new Map(sensorsInTask.map(task => [task["name"], task])).values()]
            let sensors = []
            groupedBySensor.forEach(sensor => {
                sensors.push(
                    <>
                        <SensorLi>
                            {sensor.name}
                        </SensorLi>
                    </>
                )
            })
            rows.push(
                <>
                    <motion.div
                        initial = {{ y: helper < 2 ? "-30%" : "0%", opacity: helper < 2 ? 0 : 1 }}
                        animate = {{ y: !dismiss ? "0%" : "-30%", opacity: !dismiss ? 1 : 0 }}
                        transition = {{ duration: 0.3, delay: i }}>
                        <div style={{ marginRight: "1.5vw" }}>
                            <TaskTab onClick={(e) => {handleRedirectToTask(e, task)}}>
                                <TaskLabel>{task.task}</TaskLabel>
                                <SensorUl>Sensors:</SensorUl>
                                {sensors}
                                <TaskDateLabel style={{ marginTop: "1vw" }}>First log:</TaskDateLabel>
                                <TaskDate>{firstLog.toLocaleString()}</TaskDate>
                                <TaskDateLabel>Last log:</TaskDateLabel>
                                <TaskDate>{lastLog.toLocaleString()}</TaskDate>
                            </TaskTab>
                        </div>
                    </motion.div>
                </>
            )

            i += 0.2
        })
        
        return rows
    }

    return (
        <>
        { width > breakpoint ?
        <>
        <ContentBlock>
            { !logged ?
            <NotAuthorizedView/>
            :           
            <Content>
                { view == "tasklist" ?
                <>
                    <motion.div
                        initial = {{ y: "-20%", opacity: 0 }}
                        animate = {{ y: !dismiss ? "20%" : "-20%", opacity: !dismiss ? 1 : 0 }}
                        transition = {{ duration: 0.3 }}>
                        <TaskHeader style={{ marginBottom: "5vh" }}>Tasks</TaskHeader>
                        { !tasks.length ? 
                            <EmptyList className="mb-5">
                                You didn't provide any task yet
                            </EmptyList>
                        : null }
                        <SolutionButton onClick={() => {setView("solution")}} />
                    </motion.div>
                    <TaskContainer>
                        <TaskTabs />
                    </TaskContainer>
                    { groupedByShared.length ?
                    <>
                        <motion.div
                            initial = {{ y: "-20%", opacity: 0 }}
                            animate = {{ y: !dismiss ? "20%" : "-20%", opacity: !dismiss ? 1 : 0 }}
                            transition = {{ duration: 0.3 }}>
                            <TaskHeader style={{ marginBottom: "5vh" }}>Shared</TaskHeader>
                        </motion.div>
                        <TaskContainer>
                            <SharedTaskTabs />
                        </TaskContainer>
                    </>
                    : null }
                </>
                : 
                <>
                    <BackButton onClick={() => {setView("tasklist")}} />
                    <HomeDescription style={{ textAlign: "center", marginTop: "5vw" }}>
                        <motion.div
                        initial = {{ y: "-50%", opacity: 0 }}
                        animate = {{ y: "0%", opacity: 1 }}
                        transition = {{ duration: 0.3, delay: 0.1, type: "spring" }}>
                        This feature provides receiving data from <a href="https://play.google.com/store/apps/details?id=tech.unismart.dc&hl=en">Data Collector app</a> by unismart.tech
                        Follow these steps to configure connection between apps correctly
                        </motion.div>
                    </HomeDescription>
                    <motion.div
                        initial = {{ x: "-100%", opacity: 0 }}
                        animate = {{ x: "0%", opacity: 1 }}
                        transition = {{ duration: 0.5, delay: 0.3, type: "spring" }}>
                        <SolutionStep style={{ marginTop: "5vw" }}>
                            <img src={stepOne} className={styles.SolutionStepImage}/>
                            <SolutionStepDescription style={{ marginTop: "20%" }}>
                                Check all fields in the Data format options,
                            </SolutionStepDescription>
                        </SolutionStep>
                        <SolutionStep>
                            <img src={stepTwo} className={styles.SolutionStepImage}/>
                            <SolutionStepDescription style={{ marginTop: "10%" }}>
                                Also in General Settings enter the following UUID:
                                <br/>
                                {user._id}
                                <br/> (this is you unique user id)
                            </SolutionStepDescription>
                        </SolutionStep>
                        <SolutionStep>
                            <img src={stepThree} className={styles.SolutionStepImage}/>
                            <SolutionStepDescription style={{ marginTop: "30%" }}>
                                Create a new server with any name and url like this:
                                http://192.168.1.101:5000/api/stream
                                <br/>By default all IPv4 addresses are allowed but port must match the server port,
                            </SolutionStepDescription>
                        </SolutionStep>
                        <SolutionStep>
                            <img src={stepFour} className={styles.SolutionStepImage} style={{ marginBottom: "3vw" }} />
                            <SolutionStepDescription style={{ marginTop: "20%" }}>
                                Create task, insert name, choose the server you created before, the sensors you are interested in and the sampling period.
                                <br/>Then, you can enable task and click Save.
                                <br/>Don't forget to refresh the page to update list of tasks.
                            </SolutionStepDescription>
                        </SolutionStep>
                    </motion.div>
                </> }
            </Content> }
        </ContentBlock>
        </>
        :
        <>
            <MobileContentBlock>
            { !logged ?
            <NotAuthorizedView/>
            :
            <>
            { view == "tasklist" ?
                <>
                    <motion.div
                        initial = {{ y: "-20%", opacity: 0 }}
                        animate = {{ y: !dismiss ? "20%" : "-20%", opacity: !dismiss ? 1 : 0 }}
                        transition = {{ duration: 0.3 }}>
                        <MobileTaskHeader style={{ marginBottom: "5vh" }}>Tasks</MobileTaskHeader>
                        { !tasks.length ? 
                            <MobileEmptyListMessage className="mb-5">
                                You didn't provide any task yet
                            </MobileEmptyListMessage>
                        : null }
                        <MobileSolutionButton onClick={() => {setView("solution")}} />
                    </motion.div>
                    <MobileTaskContainer>
                        <TaskTabs />
                    </MobileTaskContainer>
                    { groupedByShared.length ?
                    <>
                        <motion.div
                            initial = {{ y: "-20%", opacity: 0 }}
                            animate = {{ y: !dismiss ? "20%" : "-20%", opacity: !dismiss ? 1 : 0 }}
                            transition = {{ duration: 0.3 }}>
                            <MobileTaskHeader style={{ marginBottom: "5vh" }}>Shared</MobileTaskHeader>
                        </motion.div>
                        <TaskContainer>
                            <SharedTaskTabs />
                        </TaskContainer>
                    </>
                    : null }
                </>
                : 
                <>
                    <MobileBackButton onClick={() => {setView("tasklist")}} />
                    <MobileHomeDescription style={{ textAlign: "center", marginTop: "2vh" }}>
                        <motion.div
                        initial = {{ y: "-50%", opacity: 0 }}
                        animate = {{ y: "0%", opacity: 1 }}
                        transition = {{ duration: 0.3, delay: 0.1, type: "spring" }}>
                        This feature provides receiving data from <a href="https://play.google.com/store/apps/details?id=tech.unismart.dc&hl=en">Data Collector app</a> by unismart.tech
                        Follow these steps to configure connection between apps correctly
                        </motion.div>
                    </MobileHomeDescription>
                    <motion.div
                        initial = {{ x: "-100%", opacity: 0 }}
                        animate = {{ x: "0%", opacity: 1 }}
                        transition = {{ duration: 0.5, delay: 0.3, type: "spring" }}>
                        <MobileSolutionStepDescription style={{ marginTop: "10vw" }}>
                            Check all fields in the Data format options,
                        </MobileSolutionStepDescription>
                        <MobileSolutionStep>
                            <img src={stepOne} className={styles.MobileSolutionStepImage}/>
                        </MobileSolutionStep>
                        <MobileSolutionStepDescription>
                            Also in General Settings enter the following UUID:
                            <br/>
                            {user._id}
                            <br/> (this is you unique user id)
                        </MobileSolutionStepDescription>
                        <MobileSolutionStep>
                            <img src={stepTwo} className={styles.MobileSolutionStepImage}/>
                        </MobileSolutionStep>
                        <MobileSolutionStepDescription style={{ marginTop: "10%" }}>
                            Create a new server with any name and url like this:
                            http://192.168.1.101:5000/api/stream
                            <br/>By default all IPv4 addresses are allowed but port must match the server port.
                            <br/> Make sure you have NodeJS server on the Windows Defender whitelist.
                        </MobileSolutionStepDescription>
                        <MobileSolutionStep>
                            <img src={stepThree} className={styles.MobileSolutionStepImage}/>
                        </MobileSolutionStep>
                        <MobileSolutionStepDescription>
                            Create task, insert name, choose the server you created before, the sensors you are interested in and the sampling period.
                            <br/>Then, you can enable task and click Save.
                            <br/>Don't forget to refresh the page to update list of tasks.
                        </MobileSolutionStepDescription>
                        <MobileSolutionStep>
                            <img src={stepFour} className={styles.MobileSolutionStepImage} style={{ marginBottom: "3vw" }} />
                        </MobileSolutionStep>
                    </motion.div>
                </> }
                </> }              
            </MobileContentBlock>
        </> }

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} animation={true} centered backdrop="static" backdropClassName={styles.ModalBackdrop}>
            <Modal.Header closeButton>
                <h4>Confirm task delete</h4>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to permanent remove this task from list? {taskObj.task}
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleCloseDeleteModal} className={styles.CancelButton}>
                    Cancel
                </button>
                <button id="test-confirm-button" onClick={ (e) => {handleDeleteTask(e)} } className={styles.DeleteButton}>
                    Delete
                </button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default SensorDataCollector
