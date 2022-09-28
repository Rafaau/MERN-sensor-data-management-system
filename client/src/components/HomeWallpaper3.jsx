import React from "react"

import styles from "../style/site.module.css"
import { SensorPin, Table, Td, Th, Thead, Tr, Tbody, SensorContainer, WallpaperSpanOne, WallpaperSpanTwo, WallpaperTape } from "../style/styled-components"
import { motion } from "framer-motion"
import { WallpaperGrid } from "../components"

const HomeWallpaper3 = () => {
    const pathVariants = {
        hidden: {
            opacity: 1,
            pathLength: 0
        },
        visible : {
            opacity: 1,
            pathLength: 1,
            transition: {
                delay: 1.5,
                duration: 6,
                ease: "easeInOut"
            },
        }
    }

    const pathVariants2 = {
        hidden: {
            opacity: 1,
            pathLength: 0
        },
        visible : {
            opacity: 1,
            pathLength: 1,
            transition: {
                delay: 9,
                duration: 3,
                ease: "easeInOut"
            },
        }
    }

    const pathVariants3 = {
        hidden: {
            opacity: 1,
            pathLength: 0
        },
        visible : {
            opacity: 1,
            pathLength: 1,
            transition: {
                delay: 14,
                duration: 3,
                ease: "easeInOut"
            },
        }
    }

    const pathVariants4 = {
        hidden: {
            opacity: 1,
            pathLength: 0
        },
        visible : {
            opacity: 1,
            pathLength: 1,
            transition: {
                delay: 15,
                duration: 3,
                ease: "easeInOut"
            },
        }
    }

    const pathVariants5 = {
        hidden: {
            opacity: 1,
            pathLength: 0
        },
        visible : {
            opacity: 1,
            pathLength: 1,
            transition: {
                delay: 16,
                duration: 3,
                ease: "easeInOut"
            },
        }
    }

    return (
        <>
            <motion.div
                initial = {{ opacity: 0, y: -1000 }}
                animate = {{ opacity: 1, y: 0 }}
                transition = {{ delay: 0, duration: 0.5 }}
                className = {styles.WallpaperBackground}>
            </motion.div>
            <WallpaperTape>
                <motion.div 
                    initial = {{ x: 0 }}
                    animate = {{ x: "-150%" }}
                    transition = {{ delay: 8.8, duration: 6}}
                    style = {{ "width": "100%"}}>
                <motion.div 
                    initial = {{ x: 0 }}
                    animate = {{ x: "-190%" }}
                    transition = {{ delay: 2, duration: 6}}
                    style = {{ "width": "100%"}}>
                    <SensorContainer>
                        <motion.div
                            initial = {{ opacity: 0, y: 300 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ type: "spring", delay: 0.5, duration: 0.5}}>
                            <SensorPin/>
                        </motion.div>
                        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 50 50" className = {styles.WaveOne}>
                            <g transform="scale(0.3,0.25)">
                                <motion.path
                                    strokeWidth="0.14vh"
                                    fill="none"
                                    //d="M50 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 80 0 40 C0 40 0 0 40 0Z"
                                    d="M 1 3 C 2 0 6 0 7 3"
                                    stroke="#4F4F4F"
                                    initial = {{ opacity: 0 }}
                                    animate = {{ opacity: 1 }}
                                    transition = {{ delay: 0.6, repeatType: "reverse",  repeat: Infinity, duration: 1.5 }}/>
                            </g>
                        </svg>  
                        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 50 50" className = {styles.WaveTwo}>
                            <g transform="scale(0.3,0.25)">
                                <motion.path
                                    width="200px"
                                    strokeWidth="0.14vh"
                                    fill="none"
                                    //d="M50 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 80 0 40 C0 40 0 0 40 0Z"
                                    d="M 1 5 C 2 1 8 1 9 5"
                                    stroke="#4F4F4F"
                                    initial = {{ opacity: 0 }}
                                    animate = {{ opacity: 1 }}
                                    transition = {{ delay: 1.0, repeatType: "reverse",  repeat: Infinity, duration: 1.5 }}/>
                            </g>
                        </svg>
                        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 50 50" className = {styles.WaveThree}>
                            <g transform="scale(0.3,0.25)">
                                <motion.path
                                    width="200px"
                                    strokeWidth="0.14vh"
                                    fill="none"
                                    //d="M50 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 80 0 40 C0 40 0 0 40 0Z"
                                    d="M 1 6 C 2 1 10 1 11 6"
                                    stroke="#4F4F4F"
                                    initial = {{ opacity: 0 }}
                                    animate = {{ opacity: 1 }}
                                    transition = {{ delay: 1.4, repeatType: "reverse", repeat: Infinity, duration: 1.5 }}/>
                            </g>
                        </svg>
                        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 50 50" className = {styles.FirstWire}>
                            <g transform="scale(1.7,0.35)">
                                <motion.path
                                    width="200px"
                                    strokeWidth="0.04vh"
                                    fill="none"
                                    //d="M50 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 80 0 40 C0 40 0 0 40 0Z"
                                    d="M 1 14 C 1 16 16 16 18 13 C 20 10 19 6 33 6"
                                    stroke="#4F4F4F"
                                    initial="hidden"
                                    animate="visible"
                                    variants={pathVariants}/>
                            </g>
                        </svg>
                        <motion.div
                            initial = {{ x: "0%" }}
                            animate = {{ x: "-15%" }}
                            transition = {{ delay: 1.2, duration: 4 }}>
                            <motion.div
                                initial = {{ opacity: 0, x: "30%" }}
                                animate = {{ opacity: 1, x: "15%" }}
                                transition = {{ delay: 0.8, duration: 0.5}}>
                                <WallpaperSpanOne>
                                    sense
                                </WallpaperSpanOne>
                            </motion.div>
                        </motion.div>
                    </SensorContainer>
                    </motion.div>
                </motion.div>
                <motion.div 
                    initial = {{ x: "0" }}
                    animate = {{ x: "-190%" }}
                    transition = {{ delay: 9, duration: 6}}
                    style = {{ "width": "100%"}}>
                <motion.div 
                    initial = {{ x: "0" }}
                    animate = {{ x: "-90%" }}
                    transition = {{ delay: 5.3, duration: 2.5}}
                    style = {{ "width": "100%"}}>
                <SensorContainer>
                <motion.div
                initial = {{ opacity: 0 }}
                animate = {{ opacity: 1}}
                transition = {{ delay: 7, duration: 0.4 }}>
                <Table>
                    <Thead>
                        <motion.Th
                            initial = {{ opacity: 0 }}
                            animate = {{ opacity: 1 }}
                            transition = {{ delay: 8.4, duration: 0.3 }}
                            className = {styles.WallFirstTh}>
                            Timestamps
                        </motion.Th>
                        <motion.Th
                            initial = {{ opacity: 0 }}
                            animate = {{ opacity: 1 }}
                            transition = {{ delay: 8.8, duration: 0.3 }}
                            className = {styles.WallTh}>
                            Milliseconds
                        </motion.Th>
                        <motion.Th
                            initial = {{ opacity: 0 }}
                            animate = {{ opacity: 1 }}
                            transition = {{ delay: 9.2, duration: 0.3 }}
                            className = {styles.WallTh}>
                            X
                        </motion.Th>
                        <motion.Th
                            initial = {{ opacity: 0 }}
                            animate = {{ opacity: 1 }}
                            transition = {{ delay: 9.6, duration: 0.3 }}
                            className = {styles.WallTh}>
                            Y
                        </motion.Th>
                        <motion.Th
                            initial = {{ opacity: 0 }}
                            animate = {{ opacity: 1 }}
                            transition = {{ delay: 10.0, duration: 0.3 }}
                            className = {styles.WallThFix}>
                            Z
                        </motion.Th>
                    </Thead>
                    <Tbody>
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 7.5, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()}
                            </Td>
                            <Td className={styles.TdFix}>
                                1
                            </Td>
                            <Td>
                                0.0
                            </Td>
                            <Td>
                                2.0
                            </Td>
                            <Td>
                                1.0
                            </Td>
                        </motion.div>
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 7.8, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()+1}
                            </Td>
                            <Td className={styles.TdFix}>
                                1001        
                            </Td>
                            <Td>
                                7.0
                            </Td>
                            <Td>
                                11.0
                            </Td>
                            <Td>
                                4.0
                            </Td>
                            </motion.div>
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 8.1, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()+2}
                            </Td>
                            <Td className={styles.TdFix}>
                                2002
                            </Td>
                            <Td>
                                19.0
                            </Td>
                            <Td>
                                33.0
                            </Td>
                            <Td>
                                13.0
                            </Td>
                            </motion.div>
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 8.4, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()+3}
                            </Td>
                            <Td className={styles.TdFix}>
                                3003
                            </Td>
                            <Td>
                                14.0
                            </Td>
                            <Td>
                                25.0
                            </Td>
                            <Td>
                                29.0
                            </Td>
                            </motion.div>
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 8.7, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()+4}
                            </Td>
                            <Td className={styles.TdFix}>
                                4004
                            </Td>
                            <Td>
                                21.0
                            </Td>
                            <Td>
                                42.0
                            </Td>
                            <Td>
                                35.0
                            </Td>
                        </motion.div>
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 9.0, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()+5}
                            </Td>
                            <Td className={styles.TdFix}>
                                5005
                            </Td>
                            <Td>
                                29.0
                            </Td>
                            <Td>
                                44.0
                            </Td>
                            <Td>
                                31.0
                            </Td>
                        </motion.div> 
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 9.3, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()+6}
                            </Td>
                            <Td className={styles.TdFix}>
                                6006
                            </Td>
                            <Td>
                                36.0
                            </Td>
                            <Td>
                                31.0
                            </Td>
                            <Td>
                                25.0
                            </Td>
                        </motion.div> 
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 9.6, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()+7}
                            </Td>
                            <Td className={styles.TdFix}>
                                7007
                            </Td>
                            <Td>
                                17.0
                            </Td>
                            <Td>
                                22.0
                            </Td>
                            <Td>
                                45.0
                            </Td>
                        </motion.div> 
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 9.9, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()+8}
                            </Td>
                            <Td className={styles.TdFix}>
                                8008
                            </Td>
                            <Td>
                                53.0
                            </Td>
                            <Td>
                                36.0
                            </Td>
                            <Td>
                                23.0
                            </Td>
                        </motion.div>  
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 10.2, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()+9}
                            </Td>
                            <Td className={styles.TdFix}>
                                9009
                            </Td>
                            <Td>
                                21.0
                            </Td>
                            <Td>
                                37.0
                            </Td>
                            <Td>
                                15.0
                            </Td>
                        </motion.div> 
                        <motion.div
                            initial = {{ opacity: 0, y: -10 }}
                            animate = {{ opacity: 1, y: 0 }}
                            transition = {{ delay: 10.5, type: "spring", duration: 0.5 }}
                            className = {styles.WallTr}>
                            <Td>
                                {new Date(Date.now()).getHours()}:
                                {new Date(Date.now()).getMinutes()}:
                                {new Date(Date.now()).getSeconds()+10}
                            </Td>
                            <Td className={styles.TdFix}>
                                10010
                            </Td>
                            <Td>
                                31.0
                            </Td>
                            <Td>
                                62.0
                            </Td>
                            <Td>
                                8.0
                            </Td>
                        </motion.div>                                                                                                                                                                                 
                    </Tbody>
                </Table>
                </motion.div>
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 50 50" className = {styles.SecondWire}>
                            <g transform="scale(1.40,0.85)">
                                <motion.path
                                    width="200px"
                                    strokeWidth="0.03vh"
                                    fill="none"
                                    //d="M50 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 80 0 40 C0 40 0 0 40 0Z"
                                    d="M 1 6 C 5 6 5 9 16 9 C 25 9 26 14 33 14"
                                    stroke="#4F4F4F"
                                    initial="hidden"
                                    animate="visible"
                                    variants={pathVariants2}/>
                            </g>
                </svg>
                <motion.div
                    initial = {{ x: "0%" }}
                    animate = {{ x: "-15%" }}
                    transition = {{ delay: 6.6, duration: 4 }}>
                    <motion.div
                        initial = {{ opacity: 0, x: "30%" }}
                        animate = {{ opacity: 1, x: "15%" }}
                        transition = {{ delay: 6.2, duration: 0.5}}>
                        <WallpaperSpanOne>
                            read
                        </WallpaperSpanOne>
                    </motion.div>
                </motion.div>
                </SensorContainer>
                </motion.div>
                </motion.div>
                <motion.div 
                    initial = {{ x: "0" }}
                    animate = {{ x: "-190%" }}
                    transition = {{ delay: 11, duration: 4}}
                    style = {{ "width": "100%"}}>
                <SensorContainer>                    
                    <motion.div
                        initial = {{ opacity: 0 }}
                        animate = {{ opacity: 1 }}
                        transition = {{ delay: 12 }}> 
                        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 50 50" className = {styles.ChartOne}>
                            <g transform="scale(1.10,0.75)">
                                <motion.path
                                    width="200px"
                                    strokeWidth="0.03vh"
                                    fill="none"
                                    //d="M50 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 80 0 40 C0 40 0 0 40 0Z"
                                    d="M 1 10 C 3 9 3 6 5 5 C 7 4 5 10 7 8 C 9 6 7 4 10 2"
                                    stroke="#ff5900"
                                    initial="hidden"
                                    animate="visible"
                                    variants={pathVariants3}/>
                            </g>
                        </svg> 
                        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 50 50" className = {styles.ChartTwo}>
                            <g transform="scale(1.10,0.75)">
                                <motion.path
                                    width="200px"
                                    strokeWidth="0.03vh"
                                    fill="none"
                                    //d="M50 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 80 0 40 C0 40 0 0 40 0Z"
                                    d="M 1 10 C 1 10 5 10 5 10 C 7 10 7 10 8 9 C 9 8 9 7 10 6"
                                    stroke="#4494B6"
                                    initial="hidden"
                                    animate="visible"
                                    variants={pathVariants4}/>
                            </g>
                        </svg> 
                        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 50 50" className = {styles.ChartThree}>
                            <g transform="scale(1.10,0.75)">
                                <motion.path
                                    width="200px"
                                    strokeWidth="0.03vh"
                                    fill="none"
                                    //d="M50 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 80 0 40 C0 40 0 0 40 0Z"
                                    d="M 1 8 C 2 5 4 9 5 9 C 6 9 6 7 8 7 C 9 7 9 6 10 5"
                                    stroke="#93EA4F"
                                    initial="hidden"
                                    animate="visible"
                                    variants={pathVariants5}/>
                            </g>
                        </svg>                                                                      
                        <WallpaperGrid/> 
                    </motion.div>
                    <motion.div
                        initial = {{ x: "0%" }}
                        animate = {{ x: "-15%" }}
                        transition = {{ delay: 13.6, duration: 4 }}>
                        <motion.div
                            initial = {{ opacity: 0, x: "30%" }}
                            animate = {{ opacity: 1, x: "15%" }}
                            transition = {{ delay: 13.2, duration: 0.5}}>
                            <WallpaperSpanOne>
                                analyze
                            </WallpaperSpanOne>
                        </motion.div>
                    </motion.div>                  
                </SensorContainer>
                </motion.div>
            </WallpaperTape>
        </>
    )
}

export default HomeWallpaper3