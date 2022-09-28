import React from "react"
import styles from "../style/site.module.css"
import { motion } from "framer-motion"
import Typical from "react-typical"
import { ResizeIcon, Cursor } from "../style/styled-components"


const AuthGrid = () => {
    const Rows = () => {
        let rows = []
        for (let i = 100; i < 114; i++) {
            if (i == 102) {
                rows.push(
                    <>
                        <tr className={styles.GridRow}>
                            <td className={styles.GridCell}>
                                <motion.span 
                                    initial = {{ y: 500 }}
                                    animate = {{ y: 0 }}
                                    transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                                    className = {styles.YAxis}>
                                    {(i+452)-(i*5)}
                                </motion.span>
                            </td>
                            <td className={styles.GridCell}></td>
                            <td className={styles.GridCell}></td>
                            <td className={styles.GridCell}>
                            </td>
                            <motion.td 
                                initial = {{ "width": "6vw", "height": "5vh"}}
                                animate = {{ "width": "13vw", "height": "15vh"}}
                                transition = {{ delay: 5, duration: 1}}
                                className = {styles.GridCellMotion}>
                                <motion.div
                                    initial = {{ x: 300, y: 200 }}
                                    animate = {{ x: 0, y: 0 }}
                                    transition = {{ delay: 4, duration: 0.5 }}
                                    className={styles.MotionResize}>
                                    <motion.div
                                        initial = {{ opacity: 1 }}
                                        animate = {{ opacity: 0 }}
                                        transition = {{ delay: 4.5, duration: 0.01 }}>
                                        <Cursor/>
                                    </motion.div>
                                </motion.div>
                                    <motion.div
                                        initial = {{ opacity: 0 }}
                                        animate = {{ opacity: 1 }}
                                        transition = {{ delay: 4.5, duration: 0.01 }}
                                        className={styles.MotionResize}>
                                        <motion.div
                                            initial = {{ opacity: 1 }}
                                            animate = {{ opacity: 0 }}
                                            transition = {{ delay: 6, duration: 0.01 }}>
                                            <ResizeIcon/>    
                                        </motion.div>                          
                                </motion.div> 
                                <motion.div
                                    initial = {{ opacity: 0 }}
                                    animate = {{ opacity: 1 }}
                                    transition = {{ delay: 6, duration: 0.01 }}
                                    className={styles.MotionResize}>
                                    <motion.div
                                        initial = {{ x: 0, y: 0 }}
                                        animate = {{ x: 300, y: 200 }}
                                        transition = {{ delay: 6, duration: 0.8 }}>
                                        <Cursor/>
                                    </motion.div>
                                </motion.div>    
                                <Typical steps={["",3000,"sensordata",2000,"sensordata management system"]} className={styles.Typical}/>
                            </motion.td>
                            <td>
                            </td>
                        </tr>
                    </>
                )
            } else {
                rows.push(
                    <>
                    <tr className={styles.GridRow}>
                        <td className={styles.GridCell}>
                            <motion.span 
                                initial = {{ y: 500 }}
                                animate = {{ y: 0 }}
                                transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                                className = {styles.YAxis}>
                                {(i+452)-(i*5)}
                            </motion.span>
                        </td>
                        <td className={styles.GridCell}></td>
                        <td className={styles.GridCell}></td>
                        <td className={styles.GridCell}></td>
                        <td className={styles.GridCell}></td>
                        <td></td>
                    </tr>
                    </>
                )
            }
        }
        rows.push(
            <tr>
                <td className={styles.GridCell}>
                </td>
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        101
                    </motion.span>
                </td>
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        202
                    </motion.span>
                </td>
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        303
                    </motion.span>
                </td>
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        404
                    </motion.span>
                </td>
                <td>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        505
                    </motion.span>
                </td>
            </tr>       
        )
        return rows
    }

    return (
        <>
            <table className={styles.Grid}>
                <tbody>
                    <Rows/>
                </tbody>
            </table>
        </>
    )
}

export default AuthGrid