import React, { useState, useMemo } from "react"

import { motion } from "framer-motion"
import { NotAuthorizedSign, WarnArea1, WarnArea2, WarnArea3, WarnArea4, } from "../style/styled-components"
import Typical from "react-typical"
import styles from "../style/site.module.css"

const NotAuthorizedView = () => {
    const [mouse1Over, setMouse1Over] = useState(false)
    const [mouse2Over, setMouse2Over] = useState(false)
    const [mouse3Over, setMouse3Over] = useState(false)
    const [mouse4Over, setMouse4Over] = useState(false)

    return (
        <>  
            <motion.div 
                className={styles.WarnBlizzard1}
                initial = {{ opacity: 0, x: 200 }}
                animate = {{ opacity: mouse1Over ? 1 : 0, x: mouse1Over ? 0 : 200 }}
                transition = {{ delay: 0.3, duration: 0.3}}>
                GET OUT
            </motion.div>
            <motion.div 
                className={styles.WarnBlizzard2}
                initial = {{ opacity: 0, x: -200 }}
                animate = {{ opacity: mouse1Over ? 1 : 0, x: mouse1Over ? 0 : -200 }}
                transition = {{ delay: 0.6, duration: 0.3}}>
                GET OUT
            </motion.div>
            <motion.div 
                className={styles.WarnBlizzard3}
                initial = {{ opacity: 0, y: 200 }}
                animate = {{ opacity: mouse1Over ? 1 : 0, y: mouse1Over ? 0 : 200 }}
                transition = {{ delay: 0.9, duration: 0.3}}>
                GET OUT
            </motion.div>
            <motion.div 
                className={styles.WarnBlizzard4}
                initial = {{ opacity: 0, y: 200 }}
                animate = {{ opacity: mouse2Over ? 1 : 0, y: mouse2Over ? 0 : 200 }}
                transition = {{ delay: 0.3, duration: 0.3}}>
                GET OUT
            </motion.div>
            <motion.div 
                className={styles.WarnBlizzard5}
                initial = {{ opacity: 0, x: -200 }}
                animate = {{ opacity: mouse2Over ? 1 : 0, x: mouse2Over ? 0 : -200 }}
                transition = {{ delay: 0.6, duration: 0.3}}>
                GET OUT
            </motion.div>
            <motion.div 
                className={styles.WarnBlizzard6}
                initial = {{ opacity: 0, y: -200 }}
                animate = {{ opacity: mouse2Over ? 1 : 0, y: mouse2Over ? 0 : -200 }}
                transition = {{ delay: 0.9, duration: 0.3}}>
                GET OUT
            </motion.div>
            <motion.div 
                className={styles.WarnBlizzard7}
                initial = {{ opacity: 0, y: -200 }}
                animate = {{ opacity: mouse3Over ? 1 : 0, y: mouse3Over ? 0 : -200 }}
                transition = {{ delay: 0.3, duration: 0.3}}>
                GET OUT
            </motion.div>
            <motion.div 
                className={styles.WarnBlizzard8}
                initial = {{ opacity: 0, x: -200 }}
                animate = {{ opacity: mouse3Over ? 1 : 0, x: mouse3Over ? 0 : -200 }}
                transition = {{ delay: 0.6, duration: 0.3}}>
                GET OUT
            </motion.div>
            <motion.div 
                className={styles.WarnBlizzard9}
                initial = {{ opacity: 0, x: 200 }}
                animate = {{ opacity: mouse4Over ? 1 : 0, x: mouse4Over ? 0 : 200 }}
                transition = {{ delay: 0.3, duration: 0.3}}>
                GET OUT
            </motion.div>  
            <motion.div 
                className={styles.WarnBlizzard10}
                initial = {{ opacity: 0, x: 200 }}
                animate = {{ opacity: mouse4Over ? 1 : 0, x: mouse4Over ? 0 : 200 }}
                transition = {{ delay: 0.6, duration: 0.3}}>
                GET OUT
            </motion.div>
            <WarnArea1 onMouseOver={() => setMouse1Over(true)}/>   
            <WarnArea2 onMouseOver={() => setMouse2Over(true)}/> 
            <WarnArea3 onMouseOver={() => setMouse3Over(true)}/> 
            <WarnArea4 onMouseOver={() => setMouse4Over(true)}/> 
            <motion.div
            initial = {{ y: -300 }}
            animate = {{ y: 100 }}
            transition = {{ type: "spring", delay: 0.5, duration: 0.5, bounce: 0.5}}>
                <NotAuthorizedSign/>
            </motion.div>
            { useMemo(() => <Typical steps={["",900,"YOU CANNOT BE HERE"]} className={styles.TypicalWarn}/>, []) }
        </>
    )
}

export default NotAuthorizedView