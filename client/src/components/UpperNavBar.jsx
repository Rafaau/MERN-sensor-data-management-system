import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import { UpperContainer, UpperNav, NavRow, NavLogo, NavElement, NavChartIcon, NavListIcon, NavStreamIcon } from "../style/styled-components"
import { motion } from "framer-motion"
import styles from "../style/site.module.css"
import logo from "../style/images/logo.png"

function UpperNavBar() {
    const didMount = useRef(true)
    const [helper, invokeHelper] = useState(1)
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(false)
    const [currentPage, setCurrentPage] = useState("")

    useEffect(() => {
        if (didMount.current) {
            setupUser()
            setupPath()
            didMount.current = false
            return
        }
        setupPath()
    })    

    const setupUser = () => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = loggedInUser
            setUser(JSON.parse(foundUser))
            setLogged(true)
        }
    }

    const setupPath = () => {
        const currentPath = window.location.pathname
        setCurrentPage(currentPath)
    }

    const invokeStateChange = () => {
        invokeHelper(helper + 1)
    }

    return (
        <UpperContainer>
            { logged ?
                <NavRow>
                    <NavLogo>
                        <motion.div 
                            className = {styles.Underline}
                            initial = {{ opacity: 0 }}
                            animate = {{ opacity: currentPage == "/" ? 1 : 0, x: currentPage == "/" ? 0 : 400 }}
                            transition = {{ duration: 0.2 }}>
                        </motion.div>
                        <Link to="/" className="nav-link" onClick={invokeStateChange}>      
                            <motion.img 
                                animate = {{ opacity: currentPage == "/" ? 1 : 0 }}
                                transition = {{ duration: 0.2 }}
                                src={logo} 
                                className={styles.OrangeLogo}/>
                            <motion.img 
                                animate = {{ opacity: currentPage == "/" ? 0 : 1 }}
                                transition = {{ duration: 0.2 }}
                                src={logo} 
                                className={styles.GrayLogo}/>
                        </Link>
                    </NavLogo>
                        <NavElement>
                            <motion.div 
                                className = {styles.Underline}
                                initial = {{ opacity: 0 }}
                                animate = {{ opacity: currentPage == "/sensordata/list" ? 1 : 0, x: currentPage == "/sensordata/insert" ? 400 : 0 }}
                                transition = {{ duration: 0.2 }}>
                            </motion.div>
                            <motion.div
                                className = {styles.FlexFix}
                                animate = {{ "color": currentPage == "/sensordata/list" ? "#ff5900" : "#4F4F4F" }}
                                transition = {{ duration: 0.1 }}>
                                <NavListIcon/>
                                <Link to="/sensordata/list" className="nav-link" onClick={invokeStateChange}>Saved readings</Link>
                            </motion.div>
                        </NavElement>
                        <NavElement>
                            <motion.div 
                                className = {styles.Underline}
                                initial = {{ opacity: 0 }}
                                animate = {{ opacity: currentPage == "/sensordata/insert" ? 1 : 0, x: currentPage == "/sensordata/list" ? -400 : 0 }}
                                transition = {{ duration: 0.2 }}>
                            </motion.div>
                            <motion.div
                                className = {styles.FlexFix}
                                animate = {{ "color": currentPage == "/sensordata/insert" ? "#ff5900" : "#4F4F4F" }}
                                transition = {{ duration: 0.1 }}>
                                <NavChartIcon/>
                                <Link to="/sensordata/insert" id="test-insert-link" className="nav-link" onClick={invokeStateChange}>Insert new reading</Link>
                            </motion.div>
                        </NavElement>
                        <NavElement>
                            <motion.div 
                                className = {styles.Underline}
                                initial = {{ opacity: 0 }}
                                animate = {{ opacity: currentPage == "/sensordata/collector" ? 1 : 0, x: currentPage == "/sensordata/list" ? -600 : currentPage == "/sensordata/insert" ? -400 : currentPage == "/" ? -800 : 0 }}
                                transition = {{ duration: 0.2 }}>
                            </motion.div>
                            <motion.div
                                className = {styles.FlexFix}
                                animate = {{ "color": currentPage == "/sensordata/collector" ? "#ff5900" : "#4F4F4F" }}
                                transition = {{ duration: 0.1 }}>
                                <NavStreamIcon/>
                                <Link to="/sensordata/collector" id="test-insert-link" className="nav-link" onClick={invokeStateChange}>Data Collector</Link>
                            </motion.div>
                        </NavElement>
                </NavRow>
                : 
                <NavRow>
                    <NavLogo>
                        <img src={logo} className={styles.DisabledLogo}/>
                    </NavLogo>
                    <NavElement style={{"color" : "#bdbdbd"}}>
                        <NavListIcon/>
                        Saved readings
                    </NavElement>
                    <NavElement style={{"color" : "#bdbdbd"}}>
                        <NavChartIcon/>
                        Insert new reading
                    </NavElement>
                </NavRow>
            }
        </UpperContainer>
    )
}

export default UpperNavBar