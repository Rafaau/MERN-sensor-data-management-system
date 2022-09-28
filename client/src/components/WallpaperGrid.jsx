import React from "react"
import styles from "../style/site.module.css"
import { motion } from "framer-motion"
import Typical from "react-typical"
import { ResizeIcon, Cursor } from "../style/styled-components"


const WallpaperGrid = () => {
    const Rows = () => {
        let rows = []
            rows.push(
                <>
                <tr className={styles.GridRow}>
                    <td className={styles.GridCell}>
                        <motion.span 
                            initial = {{ y: 500 }}
                            animate = {{ y: 0 }}
                            transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                            className = {styles.YAxis}>
                            62
                        </motion.span>
                    </td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td></td>
                </tr>
                <tr className={styles.GridRow}>
                    <td className={styles.GridCell}>
                        <motion.span 
                            initial = {{ y: 500 }}
                            animate = {{ y: 0 }}
                            transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                            className = {styles.YAxis}>
                            56
                        </motion.span>
                    </td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td></td>
                </tr>
                <tr className={styles.GridRow}>
                    <td className={styles.GridCell}>
                        <motion.span 
                            initial = {{ y: 500 }}
                            animate = {{ y: 0 }}
                            transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                            className = {styles.YAxis}>
                            50
                        </motion.span>
                    </td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td></td>
                </tr>
                <tr className={styles.GridRow}>
                    <td className={styles.GridCell}>
                        <motion.span 
                            initial = {{ y: 500 }}
                            animate = {{ y: 0 }}
                            transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                            className = {styles.YAxis}>
                            44
                        </motion.span>
                    </td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td></td>
                </tr>
                <tr className={styles.GridRow}>
                    <td className={styles.GridCell}>
                        <motion.span 
                            initial = {{ y: 500 }}
                            animate = {{ y: 0 }}
                            transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                            className = {styles.YAxis}>
                            38
                        </motion.span>
                    </td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td></td>
                </tr>
                <tr className={styles.GridRow}>
                    <td className={styles.GridCell}>
                        <motion.span 
                            initial = {{ y: 500 }}
                            animate = {{ y: 0 }}
                            transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                            className = {styles.YAxis}>
                            32
                        </motion.span>
                    </td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td></td>
                </tr>
                <tr className={styles.GridRow}>
                    <td className={styles.GridCell}>
                        <motion.span 
                            initial = {{ y: 500 }}
                            animate = {{ y: 0 }}
                            transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                            className = {styles.YAxis}>
                            26
                        </motion.span>
                    </td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td></td>
                </tr> 
                <tr className={styles.GridRow}>
                    <td className={styles.GridCell}>
                        <motion.span 
                            initial = {{ y: 500 }}
                            animate = {{ y: 0 }}
                            transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                            className = {styles.YAxis}>
                            20
                        </motion.span>
                    </td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td></td>
                </tr> 
                <tr className={styles.GridRow}>
                    <td className={styles.GridCell}>
                        <motion.span 
                            initial = {{ y: 500 }}
                            animate = {{ y: 0 }}
                            transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                            className = {styles.YAxis}>
                            12
                        </motion.span>
                    </td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td></td>
                </tr>  
                <tr className={styles.GridRow}>
                    <td className={styles.GridCell}>
                        <motion.span 
                            initial = {{ y: 500 }}
                            animate = {{ y: 0 }}
                            transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                            className = {styles.YAxis}>
                            0
                        </motion.span>
                    </td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td className={styles.GridCell}></td>
                    <td></td>
                </tr>                                                       
                </>
            ) 

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
                        1
                    </motion.span>
                </td>
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        1001
                    </motion.span>
                </td>
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        2002
                    </motion.span>
                </td>
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        3003
                    </motion.span>
                </td>
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        4004
                    </motion.span>
                </td>  
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        5005
                    </motion.span>
                </td> 
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        6006
                    </motion.span>
                </td> 
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        7007
                    </motion.span>
                </td> 
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        8008
                    </motion.span>
                </td> 
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        9009
                    </motion.span>
                </td> 
                <td className={styles.GridCell}>
                    <motion.span 
                        initial = {{ x: 500 }}
                        animate = {{ x: 0 }}
                        transition = {{ type: "spring", delay: 0.2, duration: 0.5 }}
                        className={styles.XAxis}>
                        10010
                    </motion.span>
                </td>              
            </tr>       
        )
        return rows
    }

    return (
        <>
            <table className={styles.WallpaperGrid}>
                <tbody>
                    <Rows/>
                </tbody>
            </table>
        </>
    )
}

export default WallpaperGrid