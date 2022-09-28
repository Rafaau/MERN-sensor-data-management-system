import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import api from "../api"

import styles from "../style/site.module.css"
import "../style/site.module.css"
import { motion } from "framer-motion"
import { SideColumn, SideContainer, SideMenu, BottomActions, LogoutButton, UserIcon, CurrentUser, Intruder, ProgressBarFooter, NumberOfArrays, InfoButton, CapInfo } from "../style/styled-components"
import ProgressBar from "react-bootstrap/ProgressBar"

function SideMenuBar() {
    const didMount = useRef(true)
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(false)
    const [sensorDatas, setSensorDatas] = useState([])
    const [mouseOver, setMouseOver] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    useEffect(() => {
        async function getSensorDatas() {
            setupUser()
            const userModel = JSON.parse(localStorage.getItem("userModel"))
            console.log(userModel)
            let response = { status: ""}
            try {
                response = await api.getReadingByUserId(userModel._id)
            } catch (err) {
                console.log(err)
                localStorage.setItem("numberOfArrays", JSON.stringify([]))
            } finally {
                if (response.status == 200) {
                    localStorage.setItem("numberOfArrays", JSON.stringify(response.data.data.length))
                    console.log(JSON.parse(localStorage.getItem("numberOfArrays")))
                    setSensorDatas(response.data.data)
                }
            }
        }

        if (didMount.current) {
            setupUser()
            getSensorDatas()
            didMount.current = false
            return
        }

    })

    const setupUser = () => {
        const loggedInUser = localStorage.getItem("user")
        console.log(loggedInUser)
        if (loggedInUser) {
            const foundUser = loggedInUser
            setUser(JSON.parse(foundUser))
            setLogged(true)
        }
    }

    const handleMouseOver = () => {
        setMouseOver(true)
    }

    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("numberOfArrays")
    }

    return (
        <SideColumn>
            <SideContainer onMouseOver={handleMouseOver}>
                <SideMenu>
                    { logged ? 
                    <>  
                    <style type="text/css">
                    {`
                        .bg-custom {
                        background-color: #ff5900;
                        font-family: Trebuchet MS, sans-serif;
                        color: white;
                        }
                    `}
                    </style>         
                        <UserIcon/>
                        <CurrentUser>
                            {user.name}
                        </CurrentUser>
                        <ProgressBar now={sensorDatas.length/500} label={sensorDatas.length/500+"%"} variant="custom"/>
                        <ProgressBarFooter>
                            <NumberOfArrays>
                                {JSON.parse(localStorage.getItem("numberOfArrays"))}/50000
                            </NumberOfArrays>
                            <InfoButton onMouseOver={() => setShowInfo(true)} onMouseOut={() => setShowInfo(false)}/>
                        </ProgressBarFooter>
                        <motion.div
                            initial = {{ opacity: 0, y: "-10%" }}
                            animate = {{ opacity: showInfo ? 1 : 0, y: showInfo ? 0 : "-20%"}}
                            transition = {{ duration: 0.5 }}>
                            <CapInfo>
                                    You have a limited number of readings that can be sent. 
                                    Deleting existing readings will free up some of the space.
                            </CapInfo>
                        </motion.div>
                    </>
                    : 
                    <>
                        <motion.div 
                            initial = {{ opacity: 0, y: -100 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ duration: 0.2 }}>
                            <Intruder/>
                        </motion.div>
                        <motion.div 
                            initial = {{ opacity: 0, x: -100 }}
                            animate = {{ opacity: 1, x: 0 }}
                            transition = {{ delay: 0.2, duration: 0.5 }}>
                            <CurrentUser>
                                Intruder
                            </CurrentUser>
                        </motion.div>
                        <motion.div 
                            className = {styles.SideTypical1}
                            initial = {{ opacity: 0, x: -100 }}
                            animate = {{ opacity: mouseOver ? 1 : 0, x: mouseOver ? 0 : -100 }}
                            transition = {{ delay: 0.2, duration: 0.2 }}>
                            GET OUT
                        </motion.div>
                        <motion.div 
                            className = {styles.SideTypical2}
                            initial = {{ opacity: 0, x: 100 }}
                            animate = {{ opacity: mouseOver ? 1 : 0, x: mouseOver ? 0 : 100 }}
                            transition = {{ delay: 0.5, duration: 0.2 }}>
                            GET OUT
                        </motion.div>
                        <motion.div 
                            className = {styles.SideTypical3}
                            initial = {{ opacity: 0, y: 100 }}
                            animate = {{ opacity: mouseOver ? 1 : 0, y: mouseOver ? 0 : 100 }}
                            transition = {{ delay: 0.9, duration: 0.2 }}>
                            GET OUT
                        </motion.div>
                    </> }
                </SideMenu>
            </SideContainer>
            <BottomActions>
                { logged ?
                <Link to="/auth" className="nav-link" onClick={handleLogout}>
                    <LogoutButton>LOGOUT</LogoutButton>
                </Link>
                : 
                <Link to="/auth" className="nav-link" onClick={handleLogout}>
                    <LogoutButton>LOG IN PAGE</LogoutButton>
                </Link> }
            </BottomActions>       
        </SideColumn>
    )
}

export default SideMenuBar