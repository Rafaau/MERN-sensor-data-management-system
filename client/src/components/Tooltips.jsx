import * as React from "react"
import ReactTooltip from "react-tooltip"
import styles from "../style/site.module.css"

const Tooltips = () => {  
    return (
        <>
            <ReactTooltip id="AddLabelTooltip" type="dark" effect="solid" className={styles.Tooltip}>
                <span>Add column</span>
            </ReactTooltip>
            <ReactTooltip id="RemoveLabelTooltip" type="dark" effect="solid">
                <span>Remove column</span>
            </ReactTooltip>        
            <ReactTooltip id="AddRowTooltip" type="dark" effect="solid">
                <span>Add row</span>
            </ReactTooltip>
            <ReactTooltip id="RemoveRowTooltip" type="dark" effect="solid">
                <span>Remove row</span>
            </ReactTooltip>   
            <ReactTooltip id="DeleteReading" type="dark" effect="solid">
                <span>Delete reading</span>
            </ReactTooltip>       
        </>                    
    )
}

export default Tooltips