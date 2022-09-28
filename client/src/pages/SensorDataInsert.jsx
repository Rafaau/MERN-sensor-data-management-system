import React, { useEffect, useState, useRef } from "react"
import api from "../api"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"

import { 
    ContentBlock, 
    Content, 
    Button, 
    InputText, 
    Label, 
    LabelInput, 
    TableCell, 
    AddButton, 
    TypeLabel, 
    RemoveButton, 
    AddRowButton, 
    RemoveRowButton, 
    InputFile,
    ReadingHead,
    ReadingCell, } from "../style/styled-components"
import { MobileContentBlock } from "../style/styled-mobile-components"
import "../style/site.module.css"
import styles from "../style/site.module.css"
import { Tooltips, ChooseView, DropboxView, FileView, InsertView, JsonView, NotAuthorizedView } from "../components"
import ReactTooltip from "react-tooltip"
import DropboxChooser from "react-dropbox-chooser"

function SensorDataInsert(callback) {
    const didMount = useRef(true)
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(false)
    const [view, setView] = useState("")
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
        }
    }

    const handleInsertView = () => {
        setView("insert")
    }

    const handleFileView = () => {
        setView("file")
    }

    const handleDropboxView = () => {
        setView("dropbox")
    }

    const handleJsonView = () => {
        setView("json")
    }

    const handleBackCallback = () => {
        setView("choose")
    }

    const handleInsertInsert = () => {
        callback.onInsert()
    }

    const handleFileInsert = () => {
        callback.onInsert()
    }

    const handleDropboxInsert = () => {
        callback.onInsert()
    }

    const handleJsonInsert = () => {
        callback.onInsert()
    }

    return (
        <>
        { width > breakpoint ?
        <>
        <ContentBlock>
            <Content>
                { logged ? <>
                { view == "insert" ?
                    <div>
                        <InsertView
                            onBack={handleBackCallback}
                            onInsert={handleInsertInsert}/> 
                    </div>
                : view == "file" ? 
                    <div>
                        <FileView
                            onBack={handleBackCallback}
                            onInsert={handleFileInsert}/>
                    </div>
                : view == "dropbox" ?
                    <div>
                        <DropboxView
                            onBack={handleBackCallback}
                            onInsert={handleDropboxInsert}/>                     
                    </div>
                : view == "json" ?
                    <div>
                        <JsonView
                            onBack={handleBackCallback}
                            onInsert={handleJsonInsert}/>                     
                    </div>
                : <><ChooseView onInsert={handleInsertView} onFile={handleFileView} onDropbox={handleDropboxView} onJson={handleJsonView}/></> } </>
                : <NotAuthorizedView/> }
            </Content>
        </ContentBlock>
        </>
        : 
        <>
            <MobileContentBlock>
            { logged ? <>
                { view == "insert" ?
                    <div>
                        <InsertView
                            onBack={handleBackCallback}
                            onInsert={handleInsertInsert}/> 
                    </div>
                : view == "file" ? 
                    <div>
                        <FileView
                            onBack={handleBackCallback}
                            onInsert={handleFileInsert}/>
                    </div>
                : view == "dropbox" ?
                    <div>
                        <DropboxView
                            onBack={handleBackCallback}
                            onInsert={handleDropboxInsert}/>                     
                    </div>
                : view == "json" ?
                    <div>
                        <JsonView
                            onBack={handleBackCallback}
                            onInsert={handleJsonInsert}/>                     
                    </div>
                : <><ChooseView onInsert={handleInsertView} onFile={handleFileView} onDropbox={handleDropboxView} onJson={handleJsonView}/></> } </>
            : <NotAuthorizedView/> }                   
            </MobileContentBlock>
        </> }
        </>
    )
}

export default SensorDataInsert