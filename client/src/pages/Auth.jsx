import React, { useEffect, useState, useMemo, useRef } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import api from "../api"
import emailjs from "emailjs-com"
import { v4 as uuidv4 } from "uuid"
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import FacebookLogin from "react-facebook-login"

import { 
    AuthBlock, 
    AuthForm, 
    AuthContent, 
    UserIcon, 
    AuthInput, 
    AuthLabel, 
    AuthSubmit, 
    ForgotPassword, 
    AuthView, 
    ValidationMessage, 
    HiddenInput, 
    AuthMessage, 
    AuthFooter, 
    GoogleIcon, } from "../style/styled-components"
import { AuthChart, Loading } from "../components"
import { motion } from "framer-motion"
import styles from "../style/site.module.css"
import "../style/fonts/css/all.css"

function Auth(callback) {
    const didMount = useRef(true)
    const [helper, invokeHelper] = useState(1)
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerName, setRegisterName] = useState("")
    const [registerFirstPassword, setRegisterFirstPassword] = useState("")
    const [registerSecondPassword, setRegisterSecondPassword] = useState("")
    const [resetFirstPassword, setResetFirstPassword] = useState("")
    const [resetSecondPassword, setResetSecondPassword] = useState("")
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [resetEmail, setResetEmail] = useState("")
    const [view, setView] = useState("login")
    const [dismissLogin, setDismissLogin] = useState(false)
    const [dismissRegister, setDismissRegister] = useState(false)
    const [dismissConfirmation, setDismissConfirmation] = useState(false)
    const [dismissSendReset, setDismissSendReset] = useState(false)
    const [doesNotMatch, setDoesNotMatch] = useState(false)
    const [validEmail, setValidEmail] = useState(true)
    const [weakPassword, setWeakPassword] = useState(false)
    const [emptyEmail, setEmptyEmail] = useState(false)
    const [emptyPassword, setEmptyPassword] = useState(false)
    const [uuid, setUuid] = useState("")
    const [resetUuid, setResetUuid] = useState("")
    const [code, setCode] = useState("")
    const [expectedCode, setExpectedCode] = useState("")
    const [wrongCode, setWrongCode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [expectedPassword, setExpectedPassword] = useState("")
    const [doesAccountExist, setDoesAccountExist] = useState(true)
    const [wrongPassword, setWrongPassword] = useState(false)
    const [emptyLoginEmail, setEmptyLoginEmail] = useState(false)
    const [emptyRegisterName, setEmptyRegisterName] = useState(false)
    const [showResetCode, setShowResetCode] = useState(false)
    const [showResetPassword, setShowResetPassword] = useState(false)
    const [showResetSuccess, setShowResetSuccess] = useState(false)
    const [resetCode, setResetCode] = useState("")
    const [user, setUser] = useState({})
    const clientId = process.env.REACT_APP_GAPI_CLIENT_ID
    const emailServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID
    const emailTemplate1Id = process.env.REACT_APP_EMAILJS_TEMPLATE_1
    const emailTemplate2Id = process.env.REACT_APP_EMAILJS_TEMPLATE_2
    const emailUserId = process.env.REACT_APP_EMAIL_JS_USER_ID

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            })
        }

        if (didMount.current) {
            let confirmationCode = uuidv4()
            confirmationCode = confirmationCode.slice(0,8)
            let resetCode = uuidv4()
            resetCode = resetCode.slice(0,8)
            setExpectedCode(confirmationCode)
            setUuid(confirmationCode)
            setResetUuid(resetCode)
            gapi.load("client:auth2", initClient)
            didMount.current = false
            return
        }
    }, [helper])

    const handleRegisterView = async () => {
        setDismissLogin(true)
        await new Promise(r => setTimeout(r, 700))
        setView("register")
        setDismissRegister(false)
    }

    const handleLoginView = async () => {
        setDismissRegister(true)
        await new Promise(r => setTimeout(r, 700))
        setView("login")
        setDismissLogin(false)
    }

    const handleConfirmationView = async () => {
        setDismissRegister(true)
        await new Promise(r => setTimeout(r, 700))
        setView("confirmation")
    }

    const handleSuccessView = async () => {
        setDismissConfirmation(true)
        await new Promise(r => setTimeout(r, 700))
        setView("success")
    }

    const handleForgotPassword = async () => {
        setDismissLogin(true)
        await new Promise(r => setTimeout(r, 700))
        setView("forgot")
    }

    const handleRegisterEmail = e => {
        setRegisterEmail(e.target.value)
    }

    const handleRegisterName = e => {
        setRegisterName(e.target.value)
    }

    const handleRegisterFirstPassword = e => {
        setRegisterFirstPassword(e.target.value)
    }

    const handleRegisterSecondPassword = e => {
        setRegisterSecondPassword(e.target.value)
    }

    const handleLoginEmail = e => {
        setLoginEmail(e.target.value)
    }

    const handleLoginPassword = e => {
        setLoginPassword(e.target.value)
    }

    const handleResetEmail = e => {
        setResetEmail(e.target.value)
    }

    const handleResetCode = e => {
        setResetCode(e.target.value)
    }

    const onSuccess = async (res) => {
        console.log("success: ", res)
        let response
        try {
            response = await api.getUserByEmail(res.profileObj.email)
        } catch (err) {
            console.log(err.message)
            const name = res.profileObj.name
            const email = res.profileObj.email
            const password = uuidv4()
            const user = { name, email, password }
            const response = await api.createUser(user)
            console.log(response.status)
        } finally {
            localStorage.setItem("user", JSON.stringify(res.profileObj))
            window.location.href = "/"          
        }
    }

    const onFailure = (err) => {
        console.log("failed: ", err)
    }

    const responseFacebook = async (res) => {
        console.log(res)
        let response
        try {
            response = await api.getUserByEmail(res.email)
        } catch (err) {
            console.log(err.message)
            const name = res.name
            const email = res.email
            const password = uuidv4()
            const user = { name, email, password }
            const response = await api.createUser(user)
            console.log(response.status)
        } finally {
                localStorage.setItem("user", JSON.stringify(res))
                window.location.href = "/"          
            }
    }

    const checkEmail = async (email) => {
        let response = null
        try {
            response = await api.getUserByEmail(email)
        } catch (err) {
            setDoesAccountExist(false)
            return Promise.resolve(false)
        } finally {
            if (response.status == 200) {
                setExpectedPassword(response.data.data.password)
                setDoesAccountExist(true)     
                setUser(response.data.data)
                invokeHelper(helper + 1) 
                return Promise.resolve(true)              
            }
        }
        
    }

    const handleLoginClick = async e => {
        setDoesAccountExist(true)
        setWrongPassword(false)
        e.preventDefault()
        if (!loginEmail) 
        setEmptyLoginEmail(true) 
        else {
            let response = { status: "" }
            try {
                response = await api.verifyUserLogin(loginEmail, loginPassword)
            } catch (error) {
                if (error.response.status == 404)
                setDoesAccountExist(false)
                if (error.response.status == 422)
                setWrongPassword(true)
            } finally {
                if (response.status == 200) {
                    localStorage.setItem("user", JSON.stringify(response.data.data))
                    window.location.href = "/"
                }
            }
        }
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
    }

    const checkPassword = (password) => {
        return String(password)
            .match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    }

    const validate = () => {
        let checked = 0;

        if (registerFirstPassword != registerSecondPassword) {
            setDoesNotMatch(true)
        } else {
            setDoesNotMatch(false)
            checked++ 
        }

        if (!validateEmail(registerEmail)) {
            setValidEmail(false)
        } else {
            setValidEmail(true)
            checked++ 
        }

        if (!checkPassword(registerFirstPassword)) {
            setWeakPassword(true)
            setDoesNotMatch(false)
        } else {
            setWeakPassword(false)
            checked++ 
        }

        if (!registerEmail) {
            setEmptyEmail(true)
            setValidEmail(true)
        } else {
            setEmptyEmail(false)
            checked++ 
        }

        if (!registerFirstPassword) {
            setEmptyPassword(true)
            setWeakPassword(false)
        } else {
            setEmptyPassword(false)
            checked++ 
        }

        if (!registerName) {
            setEmptyRegisterName(true)
        } else {
            setEmptyRegisterName(false)
            checked++
        }

        console.log(checked)
        if (checked == 6)
            return true
        else
            return false
    }

    const handleRegisterClick = e => {
        e.preventDefault()
        setLoading(true)
        console.log(e.target)

        if (validate()) {
            emailjs.sendForm(emailServiceId, emailTemplate1Id, e.target, emailUserId)
            .then((result) => {
                handleConfirmationView()
                setLoading(false)
            }, (error) => {
                console.log(error.text);
            });
        }
    }

    const handleSendResetEmail = e => {
        e.preventDefault()
        setLoading(true)
        console.log(e.target)

        if (checkEmail(resetEmail)) {
            emailjs.sendForm(emailServiceId, emailTemplate2Id, e.target, emailUserId)
            .then((result) => {
                setShowResetCode(true)
                setLoading(false)
            }, (error) => {
                console.log(error.text);
            });
        }
    }

    const handleUpdateUser = async () => {
        if (resetFirstPassword == resetSecondPassword) {
        setDoesNotMatch(false)
        const name = user.name
        const email = user.email
        const password = resetFirstPassword
        const userToUpdate = { name, email, password }
        const response = await api.updateUser(resetEmail, userToUpdate)
        if (response.status == 200)
            setShowResetSuccess(true)
        } else {
            setDoesNotMatch(true)
        }
    }

    const handleCode = e => {
        setCode(e.target.value)
    }

    const handleConfirmClick = async e => {
        e.preventDefault()
        setLoading(true)

        if (code != expectedCode) {
            setWrongCode(true)
        } else {
            setWrongCode(false)
            const name = registerName
            const email = registerEmail
            const password = registerFirstPassword
            const user = { name, email, password }
            const response = await api.createUser(user)
            if (response.status == 201) {
                handleSuccessView()
                setLoading(false)
            } else {
                console.log(response.status)
            }
        }
    }

    const handleCheckResetCode = () => {
        if (resetCode == resetUuid)
            setShowResetPassword(true)
        else
            setShowResetPassword(false)
    }

    const Validation = (props) => {
        return (           
            <ValidationMessage>
                {props.message}
            </ValidationMessage>
        )
    }

    const facebookButton = document.getElementById("facebookButton")

    return (
        <AuthBlock>
            <AuthForm>
                <motion.div
                    initial = {{ opacity: 0, y: 200 }}
                    animate = {{ opacity: 1, y: 0 }}
                    transition = {{ type: "spring", duration: 0.5 }}>
                    <UserIcon id="auth-test-confirmer"/>
                </motion.div>
                { view == "login" ?
                <motion.div
                    initial = {{ opacity: 0, y: 200 }}
                    animate = {{ opacity: dismissLogin ? 0 : 1, y: dismissLogin ? 200 : 0 }}
                    transition = {{ type: "spring", duration: 0.5 }}>
                    <>
                    <AuthLabel>
                        EMAIL
                    </AuthLabel>
                    <AuthInput id="test-email-input" type="text" value={loginEmail} onChange={handleLoginEmail}/>
                    { !doesAccountExist ?
                        <Validation message="Not account found with that email address"/>
                    : null }
                    { emptyLoginEmail ?
                        <Validation message="Enter email address"/>
                    : null }
                    <AuthLabel>
                        PASSWORD
                    </AuthLabel>
                    <AuthInput id="test-password-input" type="password" value={loginPassword} onChange={handleLoginPassword}/>
                    { wrongPassword ? 
                        <Validation message="Password is incorrect"/>
                    : null }
                    <ForgotPassword onClick={handleForgotPassword}>
                        Forgot Password?
                    </ForgotPassword>
                    <AuthSubmit id="test-login" onClick={handleLoginClick}>
                        LOG IN
                    </AuthSubmit>
                    <AuthView onClick={handleRegisterView}>
                        Need an Account? <u>SIGN UP</u>
                        <br/>
                    </AuthView>
                    <AuthFooter>
                        <GoogleLogin
                            render = {renderProps => (
                                <GoogleIcon onClick={renderProps.onClick} disabled={renderProps.disabled}/>
                            )}
                            data-type = {"icon"}
                            clientId = {clientId}
                            onSuccess = {onSuccess}
                            onFailure = {onFailure}
                            cookiePolicy = {"single_host_origin"}
                            isSignedIn = {false}/>
                        <FacebookLogin                        
                            appId = {process.env.REACT_APP_FACEBOOK_APP_ID}
                            autoLoad = {false}
                            fields = "name,email"
                            callback = {responseFacebook}
                            cssClass = {styles.FacebookButton}
                            icon = "fa-brands fa-facebook-f"
                            textButton = ""/>
                    </AuthFooter>
                    </> 
                </motion.div> : view == "register" ?
                <>
                <motion.div
                    initial = {{ opacity: 0, y: 200 }}
                    animate = {{ opacity: dismissRegister ? 0 : 1, y: dismissRegister ? 200 : 0 }}
                    transition = {{ type: "spring", duration: 0.5 }}>
                    <>
                    <form className="contact-form" onSubmit={handleRegisterClick}>
                    <AuthLabel>
                        EMAIL
                    </AuthLabel>
                    <AuthInput type="text" value={registerEmail} onChange={handleRegisterEmail} name="to_email"/>
                    { !validEmail ? 
                        <Validation message="Incorrect email address"/>
                    : null }
                    <AuthLabel>
                        NAME
                    </AuthLabel>
                    <AuthInput type="text" value={registerName} onChange={handleRegisterName} name="to_name"/>
                    { emptyRegisterName ? 
                        <Validation message="Name cannot be empty"/>
                    : null }
                    { emptyEmail ? 
                        <Validation message="Enter email address"/>
                    : null }
                    <AuthLabel>
                        PASSWORD
                    </AuthLabel>
                    <AuthInput type="password" value={registerFirstPassword} onChange={handleRegisterFirstPassword}/>
                    { weakPassword ? 
                        <Validation message="Password is too weak"/>
                    : null }
                    { emptyPassword ? 
                        <Validation message="Enter password"/>
                    : null }
                    <AuthLabel>
                        CONFIRM PASSWORD
                    </AuthLabel>
                    <AuthInput type="password" value={registerSecondPassword} onChange={handleRegisterSecondPassword}/>
                    { doesNotMatch ? 
                        <Validation message="Passwords does not match"/>
                    : null }
                    { !loading ? 
                        <motion.div
                            initial = {{ opacity: 1 }}
                            animate = {{ opacity: loading ? 0 : 1 }}
                            transition = {{ duration: 0.2 }}>
                            <AuthSubmit type="submit">
                                SIGN UP
                            </AuthSubmit>
                        </motion.div>
                        : 
                        <motion.div
                            initial = {{ opacity: 1 }}
                            animate = {{ opacity: loading ? 0 : 1 }}
                            transition = {{ duration: 0.2 }}>
                            <Loading/>
                        </motion.div>
                    }
                    <HiddenInput value={uuid} name="message"/>
                    </form>
                    <AuthView onClick={handleLoginView}>
                        Already a user? <u>LOG IN</u>
                    </AuthView>              
                    </> 
                </motion.div>
                </> : view == "confirmation" ? <>
                    <motion.div
                        initial = {{ opacity: 0, y: 200 }}
                        animate = {{ opacity: dismissConfirmation ? 0 : 1, y: dismissConfirmation ? 200 : 0 }}
                        transition = {{ type: "spring", duration: 0.5 }}>
                        <AuthLabel>
                            CODE
                        </AuthLabel>
                        <AuthInput type="text" value={code} onChange={handleCode}/>
                        { wrongCode ? 
                            <Validation message="Confirmation code is not valid"/>
                        : null }
                        { !loading ?
                        <motion.div
                            initial = {{ opacity: 1 }}
                            animate = {{ opacity: loading ? 0 : 1 }}
                            transition = {{ duration: 0.2 }}>
                            <AuthSubmit onClick={handleConfirmClick}>
                                CONFIRM
                            </AuthSubmit>
                        </motion.div>
                        : 
                        <motion.div
                            initial = {{ opacity: 1 }}
                            animate = {{ opacity: loading ? 0 : 1 }}
                            transition = {{ duration: 0.2 }}>
                            <Loading/>
                        </motion.div>       
                        }
                    </motion.div>
                    </>
                     : view == "success" ? <>
                    <motion.div
                        initial = {{ opacity: 0, y: 200 }}
                        animate = {{ opacity: 1, y: 0 }}
                        transition = {{ type: "spring", duration: 0.5 }}>
                        <AuthMessage>
                            SUCCESS!
                        </AuthMessage>
                        <AuthView onClick={handleLoginView}>
                            You account has been created.<br/>
                            Return to <u>log in page</u>
                        </AuthView>
                    </motion.div>
                </> 
                : view == "forgot" ?
                <>
                    { showResetCode ?
                    <>
                        { !showResetPassword ?
                        <>
                            <br/>
                            <AuthLabel>
                                RESET CODE
                            </AuthLabel>
                            <AuthInput type="text" value={resetCode} onChange={handleResetCode} name="to_resetemail"/>
                            <AuthSubmit onClick={handleCheckResetCode}>
                                CHECK
                            </AuthSubmit>
                        </>
                        :
                        <>
                            { !showResetSuccess ?
                            <>
                            <AuthLabel>
                                PASSWORD
                            </AuthLabel>
                            <AuthInput type="password" value={resetFirstPassword} onChange={(e) => setResetFirstPassword(e.target.value)}/>
                            <AuthLabel>
                                CONFIRM PASSWORD
                            </AuthLabel>
                            <AuthInput type="password" value={resetSecondPassword} onChange={(e) => setResetSecondPassword(e.target.value)}/> 
                            { doesNotMatch ? 
                                <Validation message="Passwords does not match"/>
                            : null }
                            <AuthSubmit onClick={handleUpdateUser}>
                                SAVE
                            </AuthSubmit>   
                            </>
                            :
                            <>
                            <AuthMessage>
                                SUCCESS!
                            </AuthMessage>
                            <AuthView onClick={handleLoginView}>
                                Your password has been reset successfuly<br/>
                                You can now <u>log in</u>
                            </AuthView>
                            </> }
                        </> }
                    </>
                    : 
                    <>
                    <form className="contact-form" onSubmit={handleSendResetEmail}>
                        <AuthLabel>
                            EMAIL
                        </AuthLabel>
                        <AuthInput type="text" value={resetEmail} onChange={handleResetEmail} name="to_resetemail"/>
                        { doesAccountExist ?
                        <ForgotPassword>
                            You will receive an email with code required to reset your password.
                        </ForgotPassword>
                        :
                        <>
                        <Validation message="Not account found with that email address"/>
                        </> }
                        <AuthSubmit type="submit">
                            SEND
                        </AuthSubmit>
                        <HiddenInput value={resetUuid} name="resetcode"/>
                    </form>
                    </> }
                </> 
                : 
                <>
                    <AuthLabel>
                        PASSWORD
                    </AuthLabel>
                    <AuthInput type="text" value={resetEmail} onChange={handleResetEmail} name="to_resetemail"/>
                    <AuthLabel>
                        CONFIRM PASSWORD
                    </AuthLabel>
                    <AuthInput type="text" value={resetEmail} onChange={handleResetEmail} name="to_resetemail"/>               
                </> }
            </AuthForm>
            <AuthContent>
                { useMemo(() => <AuthChart/>, []) }
            </AuthContent>
        </AuthBlock>
    )
}

export default Auth