import React, { useState, useEffect, useRef } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { ContentBlock, Content, HomeContent, WallpaperContainer, HomeRow, HomeHeader, HomeDescription } from "../style/styled-components"
import { MobileContentBlock, MobileHomeHeader, MobileHomeDescription } from "../style/styled-mobile-components"
import { NotAuthorizedView, HomeWallpaper, HomeWallpaper3 } from "../components"
import { motion } from "framer-motion"
import styles from "../style/site.module.css"

function HomeContainer() {
    const didMount = useRef(true)
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;

    useEffect(() => {
        if (didMount.current) {
            setupUser()
            didMount.current = false
            return
        }

    })

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])
 
    const setupUser = () => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = loggedInUser
            setUser(JSON.parse(foundUser))
            setLogged(true)
        } else {
            window.location.href = "/auth"   
        }
    }

    return (
        <>
        { width > breakpoint ?
        <>
            <ContentBlock>
                    { logged ? 
                    <>
                    <HomeRow>
                        <HomeContent>
                            <motion.div
                                initial = {{ opacity: 0, x: "-100%", y: "0%" }}
                                animate = {{ opacity: 1, x: "10%", y: "0%" }}
                                transition = {{ duration: 0.5 }}
                                className = {styles.HomeHeader}>
                                <HomeHeader id="home-test-confirmer">
                                    Welcome
                                </HomeHeader>
                            </motion.div>
                            <motion.div
                                initial = {{ opacity: 0, x: "-100%", y: "0%" }}
                                animate = {{ opacity: 1, x: "10%", y: "0%" }}
                                transition = {{ delay: 0.5, duration: 0.5 }}
                                className = {styles.HomeDescription}>
                                <HomeDescription>
                                    This simple application allows to collect, share and analyze data from IoT sensors by uploading files with a previously made reading or entering data by yourself.
                                    <br/><br/>
                                    Please, choose one of the two actions in the upper menu.
                                </HomeDescription>
                            </motion.div>
                        </HomeContent>
                        <WallpaperContainer>
                            <HomeWallpaper3/>
                        </WallpaperContainer>
                    </HomeRow>
                    </>
                    : <NotAuthorizedView/> }
            </ContentBlock>
        </>
        :
        <>
            <MobileContentBlock>
            { logged ? 
                <>
                <motion.div
                    initial = {{ opacity: 0, x: "-100%", y: "0%" }}
                    animate = {{ opacity: 1, x: "0%", y: "0%" }}
                    transition = {{ duration: 0.5 }}
                    className = {styles.HomeHeader}>
                    <MobileHomeHeader>
                        Welcome
                    </MobileHomeHeader>
                </motion.div>
                <motion.div
                    initial = {{ opacity: 0, x: "-100%", y: "0%" }}
                    animate = {{ opacity: 1, x: "10%", y: "0%" }}
                    transition = {{ delay: 0.5, duration: 0.5 }}
                    className = {styles.HomeDescription}>
                    <MobileHomeDescription style={{ marginTop: "15vh" }}>
                        This simple application allows to collect, share and analyze data from IoT sensors by uploading files with a previously made reading or entering data by yourself.
                        <br/><br/>
                        Please, choose one of the two actions in the upper menu.

                    </MobileHomeDescription>
                </motion.div>   
                </>
                :
                <>
                    <NotAuthorizedView/>
                </> }
            </MobileContentBlock>
        </> }
        </>
    )
}

export default HomeContainer