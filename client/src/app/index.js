import React, { useState, useEffect, useRef } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SnackbarProvider from "react-simple-snackbar"
import api from "../api"

import { SensorDataList, HomeContainer, SensorDataInsert, SensorDataDetails, SensorDataBundleDetails, Auth, SensorDataCollector, TaskDetails, TaskReadingDetails } from "../pages"
import { UpperNavBar, SideMenuBar, } from "../components"
import { MobileUpperNavBar, MobileAuth } from "../mobile-components"
import { Body, Row, AuthBody } from "../style/styled-components"
import { MobileBody, MobileAuthBody } from "../style/styled-mobile-components"
import "../style/site.module.css"

function App() {
  const didMount = useRef(true)
  const [render, setRender] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 620;

  useEffect(() => {
    if (didMount.current) {
      setupUser()
      didMount.current = false
      return
    }

    setRender(true)
  })

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize)

    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  const setupUser = async () => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser)
        const response = await api.getUserByEmail(foundUser.email)
        if (response.status == 200) {
          localStorage.setItem("userModel", JSON.stringify(response.data.data))
        } else setupUser()
    }
  }

  const onDelete = () => {
    setRender(false)
  }

  const onInsert = () => {
    setRender(false)
  }

  return (
    <> 
    <Router>
      <SnackbarProvider>  
          <Routes>         
            <Route path = "/" exact element = {
              <>
              { width > breakpoint ?
              <>
                <UpperNavBar/>
                <Body>
                  <Row>
                    { render ? <SideMenuBar/> : null }
                    <HomeContainer/>
                  </Row>
                </Body>
              </>
              : 
              <>
                <MobileUpperNavBar/>
                <MobileBody>
                  <HomeContainer/>
                </MobileBody>
              </> }
              </>
              } />          
            <Route path = "/sensordata/list" exact element = {
              <>
              { width > breakpoint ?
              <>
                <UpperNavBar/>
                <Body>
                  <Row>
                    { render ? <SideMenuBar/> : null }
                    <SensorDataList onDelete={onDelete}/>
                  </Row>
                </Body>
              </>
              : 
              <>
                <MobileUpperNavBar/>
                <MobileBody>
                  <SensorDataList onDelete={onDelete}/>
                </MobileBody>
              </> }
              </>
              } />
            <Route path = "/sensordata/insert" exact element = {
              <>
              { width > breakpoint ?
              <>
                <UpperNavBar/>
                <Body>
                  <Row>
                    { render ? <SideMenuBar/> : null }
                    <SensorDataInsert onInsert={onInsert}/>
                  </Row>
                </Body>
              </>
              :
              <>
                <MobileUpperNavBar/>
                <MobileBody>
                  <SensorDataInsert onInsert={onInsert}/>
                </MobileBody>
              </> }
              </>
            } />
            <Route path = "/sensordata/collector" exact element = {
              <>
              { width > breakpoint ?
              <>
                <UpperNavBar/>
                <Body>
                  <Row>
                    { render ? <SideMenuBar/> : null }
                    <SensorDataCollector/>
                  </Row>
                </Body>
              </>
              :
              <>
                <MobileUpperNavBar/>
                <MobileBody>
                  <SensorDataCollector/>
                </MobileBody>
              </> }
              </>
            } />
            <Route path = "/:userId/task/:task" exact element = {
              <>
              { width > breakpoint ?
              <>
                <UpperNavBar/>
                <Body>
                  <Row>
                    { render ? <SideMenuBar/> : null }
                    <TaskDetails/>
                  </Row>
                </Body>
              </>
              :
              <>
                <MobileUpperNavBar/>
                <MobileBody>
                  <TaskDetails/>
                </MobileBody>
              </> }
              </>
            } />
            <Route path = "/:userId/task/:task/:sensor" exact element = {
              <>
              { width > breakpoint ?
              <>
                <UpperNavBar/>
                <Body>
                  <Row>
                    { render ? <SideMenuBar/> : null }
                    <TaskReadingDetails/>
                  </Row>
                </Body>
              </>
              :
              <>
                <MobileUpperNavBar/>
                <MobileBody>
                  <TaskReadingDetails/>
                </MobileBody>
              </> }
              </>
            } />            
            <Route path = "/sensordata/:uuid" exact element = {
              <>
              { width > breakpoint ?
              <>
                <UpperNavBar/>
                <Body>
                  <Row>
                    { render ? <SideMenuBar/> : null }
                    <SensorDataDetails/>
                  </Row>
                </Body>
              </>
              :
              <>
                <MobileUpperNavBar/>
                <MobileBody>
                  <SensorDataDetails/>
                </MobileBody>
              </> }
              </>
            } />
              <Route path = "/sensordata/bundle/:id" exact element = {
                <>
                { width > breakpoint ?
                <>
                  <UpperNavBar/>
                  <Body>
                    <Row>
                      { render ? <SideMenuBar/> : null }
                      <SensorDataBundleDetails onDelete={onDelete}/>
                    </Row>
                  </Body>
                </>
                :
                <>
                  <MobileUpperNavBar/>
                  <MobileBody>
                    <SensorDataBundleDetails/>
                  </MobileBody>
                </> }
                </>
              } />
            <Route path = "/auth" exact element = {
              <>
              { width > breakpoint ?
              <>
              <AuthBody>
                <Row>
                  <Auth/>
                </Row>
              </AuthBody>
              </>
              :
              <>
                <MobileAuthBody>
                  <MobileAuth/>
                </MobileAuthBody>
              </> }
              </>
              } />
          </Routes>
        </SnackbarProvider>     
    </Router>
    </>
  )
}

export default App