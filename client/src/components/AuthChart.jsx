import React from "react"
import styles from "../style/site.module.css"
import { motion } from "framer-motion"
import { AuthGrid } from "../components"

const AuthChart = () => {
    const pathVariants = {
        hidden: {
            opacity: 1,
            pathLength: 0
        },
        visible : {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 3,
                ease: "easeInOut"
            },
        }
    }
    return (
        <> 
        <motion.div
            initial = {{ opacity: 0 }}
            animate = {{ opacity: 1 }}
            transition = {{ duration: 0.5 }}>
            <div className={styles.AuthDiv}> 
                <motion.div
                    initial = {{ scaleY : 1, y: 0 }}
                    animate = {{ scaleY : 0.8, y: 30 }}
                    transition = {{ delay: 5, duration: 1 }}
                    className={styles.AuthChart}>
                    <svg xmlns="https://www.w3.org/2000/svg" viewBox="1 -50 1000 550">
                        <g transform="translate(-10,400) scale(6,6)">
                            <motion.path
                                width="200px"
                                strokeWidth="0.08vw"
                                fill="none"
                                //d="M50 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 80 0 40 C0 40 0 0 40 0Z"
                                d="M 1 -16 C 12 -16 17 7 26 7 C 40 7 36 -47 42 -47 C 47 -47 43 -11 53 -11 C 60 -11 63 -29 68 -29 C 73 -29 77 -10 81 -10 C 86 -10 88 -21 93 -21 C 99 -21 102 -33 107 -33"
                                stroke="#ff5900"
                                initial="hidden"
                                animate="visible"
                                variants={pathVariants}/>
                        </g>
                    </svg>
                </motion.div>
                <AuthGrid/> 
            </div> 
        </motion.div>
        </>
    )
}

export default AuthChart

