import React, { useEffect, useState, useRef } from "react"
import styles from "../style/site.module.css"
import { 
    InputHead, 
    InputText, 
    RemoveButton, 
    AddButton, 
    RemoveRowButton, 
    AddRowButton,} from "../style/styled-components"
import { MobileInputHead, MobileInputText } from "../style/styled-mobile-components"
import { Tooltips } from "../components"

const DataTable = (props) => {
    const [timestamps, setTimestamps] = useState(props.passedTimestamps)
    const [milliSeconds, setMilliseconds] = useState(props.passedMilliSeconds)
    const [sensorLabels, setSensorLabels] = useState(props.passedLabels)
    const [sensorValues, setSensorValuess] = useState([[]])
    const [sensorValue1, setSensorValue1] = useState(props.passedSensorValue1)
    const [sensorValue2, setSensorValue2] = useState(props.passedSensorValue2)
    const [sensorValue3, setSensorValue3] = useState(props.passedSensorValue3)
    const [showSecondLabel, setShowSecondLabel] = useState(false)
    const [showThirdLabel, setShowThirdLabel] = useState(false)
    const [showAddButton, setShowAddButton] = useState(true)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [labelCount, setLabelCount] = useState(props.passedLabelCount)
    const [rowsCount, setRowsCount] = useState(props.passedRowsCount)
    const [showRemoveRowButton, setShowRemoveRowButton] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 620;

    useEffect(() => {
        if (labelCount == 1)
        {
            setShowSecondLabel(false)
            setShowThirdLabel(false)    
            setShowAddButton(true)      
            setShowRemoveButton(false) 
        }
        if (labelCount == 2)
        {
            setShowSecondLabel(true)
            setShowThirdLabel(false)
            setShowRemoveButton(true)
            setShowAddButton(true)
        }
        if (labelCount == 3)
        {
            setShowSecondLabel(true)
            setShowThirdLabel(true)
            setShowRemoveButton(true)
            setShowAddButton(false)
        } 
        if (rowsCount == 2)
        {
            setShowRemoveRowButton(false)
        } 
        if (rowsCount > 2)
        {
            setShowRemoveRowButton(true)
        }
    }, [rowsCount, labelCount])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    const Head = (props) => {
        return (
            <InputHead>{props.span}</InputHead>
        )
    }

    const MobileHead = (props) => {
        return (
            <MobileInputHead>{props.span}</MobileInputHead>
        )
    }

    const joinSensorValues = (number) => {
        sensorValues[number] = sensorValue1[number]+","+sensorValue2[number]+","+sensorValue3[number]
        sensorValues[number] = sensorValues[number].replace("undefined", "")
        sensorValues[number] = sensorValues[number].replace("undefined", "")
    }

    const handleChangeInputTimestamp = (event, number) => {
        props.onTimestampChange(event.target.value, number)
        const thisTimestamp = event.target.value
        timestamps[number] = thisTimestamp
        setTimestamps({...timestamps})
        console.log(Object.values(timestamps))
    }

    const handleChangeInputMilliseconds = async (event, number) => {
        props.onMillisecondsChange(event.target.value, number)
        const thisMilliseconds = event.target.value
        milliSeconds[number] = thisMilliseconds
        setMilliseconds({...milliSeconds})
    }

    const handleChangeInputSensorLabel = async (event, number) => {
        console.log(event.target.value)
        props.onSensorLabelChange(event.target.value, number)
        const sensorlabel = event.target.value
        sensorLabels[number] = sensorlabel
        setSensorLabels({...sensorLabels})
    }

    const handleChangeInputSensorValue1 = async (event, number)  => {     
        props.onSensorValue1Change(event.target.value, number)
        const sensorvalue = event.target.value
        sensorValue1[number] = sensorvalue
        setSensorValue1({...sensorValue1})
        joinSensorValues(number)
    }

    const handleChangeInputSensorValue2 = async (event, number)  => {
        props.onSensorValue2Change(event.target.value, number)
        const sensorvalue = event.target.value
        sensorValue2[number] = sensorvalue
        setSensorValue2({...sensorValue2})
        joinSensorValues(number)
    }

    const handleChangeInputSensorValue3 = async (event, number)  => {
        props.onSensorValue3Change(event.target.value, number)
        const sensorvalue = event.target.value
        sensorValue3[number] = sensorvalue
        setSensorValue3({...sensorValue3})
        joinSensorValues(number)
    }

    const handleAddLabelEvent = () => {
        setLabelCount(labelCount + 1)         
    }

    const handleRemoveLabelEvent = () => {
        setLabelCount(labelCount - 1)
        const eventObj = {target: {value:""}}
        handleChangeInputSensorLabel(eventObj, labelCount - 1)
        if (labelCount - 1 == 2)
            setSensorValue3("")
        if (labelCount - 1 == 1)
            setSensorValue2("")
    }

    const handleAddRowEvent = () => {
        setRowsCount(rowsCount + 1)      
    }   

    const handleRemoveRowEvent = () => {
        setRowsCount(rowsCount - 1)
        const eventObj = {target: {value:""}}
        handleChangeInputTimestamp(eventObj, rowsCount - 1)
        handleChangeInputMilliseconds(eventObj, rowsCount - 1)
        handleChangeInputSensorValue1(eventObj, rowsCount - 1)
        handleChangeInputSensorValue2(eventObj, rowsCount - 1)
        handleChangeInputSensorValue3(eventObj, rowsCount - 1)
    }

    return (
        <>
        { width > breakpoint ?
        <>
            <table className={styles.InputTable}>
                <thead  className={styles.InputHead}>
                    <tr>
                        <Head span="Timestamps"/>
                        <Head span="Milliseconds"/>
                        <InputHead>
                            <InputText id="test-insert-label1" type="text" spellcheck="false" value={sensorLabels[0]} onChange={ function(e){ handleChangeInputSensorLabel(e, 0)} } className={styles.LabelInput}/>
                        </InputHead>
                        { showSecondLabel? 
                        <InputHead>
                            <InputText type="text" spellcheck="false" value={sensorLabels[1]} onChange={ function(e){ handleChangeInputSensorLabel(e, 1)} } className={styles.LabelInput}/>
                        </InputHead>
                        : null }
                        { showThirdLabel? 
                        <InputHead>
                            <InputText type="text" spellcheck="false" value={sensorLabels[2]} onChange={ function(e){ handleChangeInputSensorLabel(e, 2)} } className={styles.LabelInput}/>
                        </InputHead>
                        : null}
                        <InputHead>
                            <div className={styles.ButtonWrapper}>
                                { showRemoveButton? <><RemoveButton data-tip data-for="RemoveLabelTooltip" onClick={handleRemoveLabelEvent}/><Tooltips/></> : null }
                                { showAddButton? <><AddButton data-tip data-for="AddLabelTooltip" onClick={handleAddLabelEvent}/><Tooltips/></> : null }                                   
                            </div>
                        </InputHead>
                    </tr>
                </thead>
                <tbody className={styles.ReadingBody}>
                    <DataTableRows 
                        rowsCount={rowsCount}
                        timestamps={timestamps}
                        milliSeconds={milliSeconds}
                        sensorValue1={sensorValue1}
                        sensorValue2={sensorValue2}
                        sensorValue3={sensorValue3}
                        showSecondLabel={showSecondLabel}
                        showThirdLabel={showThirdLabel}
                        handleChangeInputTimestamp={handleChangeInputTimestamp}
                        handleChangeInputMilliseconds={handleChangeInputMilliseconds}
                        handleChangeInputSensorValue1={handleChangeInputSensorValue1}
                        handleChangeInputSensorValue2={handleChangeInputSensorValue2}
                        handleChangeInputSensorValue3={handleChangeInputSensorValue3}
                    />
                </tbody>                    
            </table>
            <div className={styles.TableFooter}>
                <AddRowButton data-tip data-for="AddRowTooltip" onClick={handleAddRowEvent}/>
                { showRemoveRowButton? <><RemoveRowButton data-tip data-for="RemoveRowTooltip" onClick={handleRemoveRowEvent}/><Tooltips/></> : null }
                <Tooltips/>
            </div>           
        </>
        : 
        <>
            <table className={styles.InputTable}>
                <thead  className={styles.InputHead}>
                    <tr>
                        <MobileHead span="Timest."/>
                        <MobileHead span="Millisec."/>
                        <MobileInputHead>
                            <MobileInputText type="text" spellcheck="false" value={sensorLabels[0]} onChange={ function(e){ handleChangeInputSensorLabel(e, 0)} } className={styles.MobileLabelInput}/>
                        </MobileInputHead>
                        { showSecondLabel? 
                        <MobileInputHead>
                            <MobileInputText type="text" spellcheck="false" value={sensorLabels[1]} onChange={ function(e){ handleChangeInputSensorLabel(e, 1)} } className={styles.MobileLabelInput}/>
                        </MobileInputHead>
                        : null }
                        { showThirdLabel? 
                        <MobileInputHead>
                            <MobileInputText type="text" spellcheck="false" value={sensorLabels[2]} onChange={ function(e){ handleChangeInputSensorLabel(e, 2)} } className={styles.MobileLabelInput}/>
                        </MobileInputHead>
                        : null}
                        <MobileInputHead>
                            <div className={styles.ButtonWrapper}>
                                { showRemoveButton? <><RemoveButton data-tip data-for="RemoveLabelTooltip" onClick={handleRemoveLabelEvent}/><Tooltips/></> : null }
                                { showAddButton? <><AddButton data-tip data-for="AddLabelTooltip" onClick={handleAddLabelEvent}/><Tooltips/></> : null }                                   
                            </div>
                        </MobileInputHead>
                    </tr>
                </thead>
                <tbody className={styles.ReadingBody}>
                    <MobileDataTableRows 
                        rowsCount={rowsCount}
                        timestamps={timestamps}
                        milliSeconds={milliSeconds}
                        sensorValue1={sensorValue1}
                        sensorValue2={sensorValue2}
                        sensorValue3={sensorValue3}
                        showSecondLabel={showSecondLabel}
                        showThirdLabel={showThirdLabel}
                        handleChangeInputTimestamp={handleChangeInputTimestamp}
                        handleChangeInputMilliseconds={handleChangeInputMilliseconds}
                        handleChangeInputSensorValue1={handleChangeInputSensorValue1}
                        handleChangeInputSensorValue2={handleChangeInputSensorValue2}
                        handleChangeInputSensorValue3={handleChangeInputSensorValue3}
                    />
                </tbody>                    
            </table>
            <div className={styles.TableFooter}>
                <AddRowButton data-tip data-for="AddRowTooltip" onClick={handleAddRowEvent}/>
                { showRemoveRowButton? <><RemoveRowButton data-tip data-for="RemoveRowTooltip" onClick={handleRemoveRowEvent}/><Tooltips/></> : null }
                <Tooltips/>
            </div>             
        </> }
        </>
    )
}

const DataTableRows = (rowsCount, showSecondLabel, showThirdLabel, timestamps, milliSeconds, sensorValue1, sensorValue2, sensorValue3, handleChangeInputTimestamp, handleChangeInputMilliseconds, handleChangeInputSensorValue1, handleChangeInputSensorValue2, handleChangeInputSensorValue3) => {
    var rows = []
    for (let i = 0; i < rowsCount.rowsCount; i++) {       
        rows.push(
            <tr>
                <InputHead>
                    <InputText id={`test-timestamp-${i}`} type="text" value={rowsCount.timestamps[i]} onChange={ function(e){ rowsCount.handleChangeInputTimestamp(e, i) } } className={styles.TableInput}/>
                </InputHead>
                <InputHead>
                    <InputText id={`test-milliseconds-${i}`} type="text" value={rowsCount.milliSeconds[i]} onChange={ function(e){ rowsCount.handleChangeInputMilliseconds(e, i) } } className={styles.TableInput}/>
                </InputHead>
                <InputHead>
                    <InputText id={`test-value1-${i}`} type="text" value={rowsCount.sensorValue1[i]} onChange={ function(e){ rowsCount.handleChangeInputSensorValue1(e, i) } } className={styles.TableInput}/>
                </InputHead>
                { rowsCount.showSecondLabel? 
                    <InputHead>
                        <InputText type="text" value={rowsCount.sensorValue2[i]} onChange={ function(e){ rowsCount.handleChangeInputSensorValue2(e, i) } } className={styles.TableInput}/>
                    </InputHead>
                : null}
                { rowsCount.showThirdLabel? 
                    <InputHead>
                        <InputText type="text" value={rowsCount.sensorValue3[i]} onChange={ function(e){ rowsCount.handleChangeInputSensorValue3(e, i) } } className={styles.TableInput}/>
                    </InputHead>
                : null}
            </tr>
        )
    }

    return rows;
}

const MobileDataTableRows = (rowsCount, showSecondLabel, showThirdLabel, timestamps, milliSeconds, sensorValue1, sensorValue2, sensorValue3, handleChangeInputTimestamp, handleChangeInputMilliseconds, handleChangeInputSensorValue1, handleChangeInputSensorValue2, handleChangeInputSensorValue3) => {
    var rows = []
    for (let i = 0; i < rowsCount.rowsCount; i++) {
        rows.push(
            <tr>
                <MobileInputHead>
                    <MobileInputText type="text" value={rowsCount.timestamps[i]} onChange={ function(e){ rowsCount.handleChangeInputTimestamp(e, i) } } className={styles.TableInput}/>
                </MobileInputHead>
                <MobileInputHead>
                    <MobileInputText type="text" value={rowsCount.milliSeconds[i]} onChange={ function(e){ rowsCount.handleChangeInputMilliseconds(e, i) } } className={styles.TableInput}/>
                </MobileInputHead>
                <MobileInputHead>
                    <MobileInputText type="text" value={rowsCount.sensorValue1[i]} onChange={ function(e){ rowsCount.handleChangeInputSensorValue1(e, i) } } className={styles.TableInput}/>
                </MobileInputHead>
                { rowsCount.showSecondLabel? 
                    <MobileInputHead>
                        <MobileInputText type="text" value={rowsCount.sensorValue2[i]} onChange={ function(e){ rowsCount.handleChangeInputSensorValue2(e, i) } } className={styles.TableInput}/>
                    </MobileInputHead>
                : null}
                { rowsCount.showThirdLabel? 
                    <MobileInputHead>
                        <MobileInputText type="text" value={rowsCount.sensorValue3[i]} onChange={ function(e){ rowsCount.handleChangeInputSensorValue3(e, i) } } className={styles.TableInput}/>
                    </MobileInputHead>
                : null}
            </tr>
        )
    }

    return rows;
}

export default DataTable