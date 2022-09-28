import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-3"
import styles from "../style/site.module.css"
import * as Zoom from "chartjs-plugin-zoom";

function Chart(props) {
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    let data, options
    if (props.labels.filter(e => String(e).trim()).length == 1) {
        data = {
            labels: props.milliseconds,
            datasets: [
                {
                    label: props.labels[0],
                    data: props.values[0],
                    fill: false,
                    lineTension: 0.5,
                    pointBackgroundColor: "#ff5900",
                    borderColor: "#ff5900"    
                },          
            ]
        }           
    }
    else if (props.labels.filter(e => String(e).trim()).length  == 2) {
        data = {
            labels: props.milliseconds,
            datasets: [
                {
                    label: props.labels[0],
                    data: props.values[0],
                    fill: false,
                    lineTension: 0.5,
                    pointBackgroundColor: "#ff5900",
                    borderColor: "#ff5900"    
                },
                {
                    label: props.labels[1],
                    data: props.values[1],
                    fill: false,
                    lineTension: 0.5,
                    pointBackgroundColor: "#0068D6",
                    borderColor: "#0068D6"
                },          
            ]
        }
    }
    else {
        data = {
            labels: props.milliseconds,
            datasets: [
                {
                    label: props.labels[0],
                    data: props.values[0],
                    fill: false,
                    lineTension: 0.5,
                    pointBackgroundColor: "#ff5900",
                    borderColor: "#ff5900"    
                },
                {
                    label: props.labels[1],
                    data: props.values[1],
                    fill: false,
                    lineTension: 0.5,
                    pointBackgroundColor: "#0068D6",
                    borderColor: "#0068D6"
                },
                {
                    label: props.labels[2],
                    data: props.values[2],
                    fill: false,
                    lineTension: 0.5,
                    pointBackgroundColor: "rgba(141, 196, 51,1)",
                    borderColor: "rgba(141, 196, 51,1)"
                },           
            ]
        }
    }

    options = {
        responsive: true,
        legend: {
            display: true,
            position: "top",
        },
        pan: {
            enabled: true,
            mode: "xy",
            speed: 1,
            treshold: 1,
        },
        zoom: {
            enabled: true,
            drag: false,
            mode: "xy",
            limits: {
                max: 1,
                min: 0.5,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Value",
                },
            },

            x: {
                title: {
                    display: true,
                    text: "Milliseconds",
                },
            },
        },     
    }
    return (
        <>
        { width > breakpoint ?
        <>
        <div className={styles.PreviewChart}>
            <Line id="test-chart" data={data} options={options} />
        </div>
        </>
        : 
        <>
        <div className={styles.MobilePreviewChart}>
            <Line data={data} options={options} />
        </div>
        </> }
        </>
    )
}

export default Chart