import { motion } from "framer-motion";
import React from "react";

const Loading = () => {
    const LoadingDot = {
        display: "block",
        width: "1rem",
        height: "1rem",
        backgroundColor: "#ff5900",
        borderRadius: "50%",
    }
      
    const LoadingContainer = {
    width: "5rem",
    height: "2rem",
    display: "flex",
    justifyContent: "space-around"
    }
    
    const ContainerVariants = {
        initial: {
            transition: {
            staggerChildren: 0.2
            }
        },
        animate: {
            transition: {
            staggerChildren: 0.2
            }
        }
    }
    
    const DotVariants = {
        initial: {
            y: "0%"
        },
        animate: {
            y: "100%"
        }
    }
    
    const DotTransition = {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut"
    }

    return (
        <div
        style={{
            paddingTop: "2rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
        >
        <motion.div
            style={LoadingContainer}
            variants={ContainerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
            />
            <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
            />
            <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
            />
        </motion.div>
        </div>
    )
}

export default Loading
