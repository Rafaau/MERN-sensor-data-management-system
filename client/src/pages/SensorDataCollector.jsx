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
    SolutionStepDescription, } from "../style/styled-components"
import api from "../api"
import { motion } from "framer-motion"
import { useMemo } from "react"
import stepOne from "../style/images/StepOne.jpg"
import stepTwo from "../style/images/StepTwo.jpg"
import stepThree from "../style/images/StepThree.jpg"
import stepFour from "../style/images/StepFour.jpg"
import styles from "../style/site.module.css"

function SensorDataCollector() {
    const didMount = useRef(true)
    const [user, setUser] = useState({})
    const [tasks, setTasks] = useState([])
    const [logged, setLogged] = useState(false)
    const [dismiss, setDismiss] = useState(false)
    const [view, setView] = useState("tasklist")

    useEffect(() => {
        if (didMount.current) {
            setupUser()
            didMount.current = false
            return
        }
    })

    const setupUser = async () => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const parsed = JSON.parse(loggedInUser)
            const foundUser = await api.getUserByEmail(parsed.email)
            console.log(foundUser)
            setUser(foundUser.data.data)
            setLogged(true)
            let response = { status: "" }
            try {
                response = await api.getReadingByUuid(foundUser.data.data._id)
            } catch(err) {

            } finally {
                if (response.status == 200) {
                    setTasks(response.data.data)
                }
            }
        }
    }

    const handleRedirectToTask = async (task) => {
        setDismiss(true)
        await new Promise(p => setTimeout(p, 300))
        window.location.href = `/task/${task.task}`
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
                        <SensorLi>{sensor.name}</SensorLi>
                    </>
                )
            })
            rows.push(
                <>
                    <motion.div
                        initial = {{ y: "-30%", opacity: 0 }}
                        animate = {{ y: !dismiss ? "0%" : "-30%", opacity: !dismiss ? 1 : 0 }}
                        transition = {{ duration: 0.3, delay: i }}>
                        <TaskTab onClick={() => {handleRedirectToTask(task)}}>
                            <TaskLabel>{task.task}</TaskLabel>
                            <SensorUl>Sensors:</SensorUl>
                            {sensors}
                            <TaskDateLabel>First log:</TaskDateLabel>
                            <TaskDate>{firstLog.toLocaleString()}</TaskDate>
                            <TaskDateLabel>Last log:</TaskDateLabel>
                            <TaskDate>{lastLog.toLocaleString()}</TaskDate>
                        </TaskTab>
                    </motion.div>
                </>
            )

            i += 0.2
        })
        
        return rows
    }

    return (
        <ContentBlock>
            <Content>
                { view == "tasklist" ?
                <>
                    <motion.div
                        initial = {{ y: "-20%", opacity: 0 }}
                        animate = {{ y: !dismiss ? "20%" : "-20%", opacity: !dismiss ? 1 : 0 }}
                        transition = {{ duration: 0.3 }}>
                        <TaskHeader style={{ marginBottom: "5vh" }}>Tasks</TaskHeader>
                        <SolutionButton onClick={() => {setView("solution")}} />
                    </motion.div>
                    <TaskContainer>
                        <TaskTabs />
                    </TaskContainer>
                </>
                : 
                <>
                    <BackButton onClick={() => {setView("tasklist")}} />
                    <HomeDescription style={{ textAlign: "center" }}>
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
                        <SolutionStep style={{ marginTop: "10vw" }}>
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
                            </SolutionStepDescription>
                        </SolutionStep>
                    </motion.div>
                </> }
            </Content>
        </ContentBlock>
    )
}

export default SensorDataCollector
