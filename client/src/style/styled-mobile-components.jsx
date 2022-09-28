import React from "react"
import styled, { keyframes } from "styled-components"
import "bootstrap/dist/css/bootstrap.min.css"
import "./fonts/css/all.css"

const MobileBody = styled.div.attrs({
})`
    background-color: #f0f0f0;
    position: absolute;
    padding-top: 5vh;
    height: 100vh;
    left: 0;
    right: 0;
    top: 0;
    padding-left: 2vw;
    padding-right: 2vw;
    padding-bottom: 3vh;
    padding-top: 7vh;
`

const MobileContentBlock = styled.div.attrs({
})`
    flex: 2;
    width: 100%;
    background-color: #ffffff;
    min-height: 93vh;
    max-height: 93vh;
    border-radius: 5px;
    position: relative;
    overflow-y: auto;

    -webkit-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
`

const MobileAuthBody = styled.div.attrs({
})`
    background-color: #f0f0f0;
    position: absolute;
    height: 100vh;
    left: 0;
    right: 0;
    top: 0;
    padding-left: 2vw;
    padding-right: 2vw;
    padding-bottom: 3vh;
    padding-top: 1vh;
`

const UpperContainer = styled.div.attrs({

})`
    background-color: #ffffff;
    position: fixed;
    left: -5%;
    right: -5%;
    top: 0;
    height: 6vh;
    z-index: 1003;

    -webkit-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
`

const UpperNav = styled.nav.attrs({
})`
    position: relative;
    padding: 20px;
    width: 90%;
    left: 5%;
`

const NavRow = styled.div.attrs({

})`
    display: flex;
    width: 100%;
    height: 100%;
`

const NavLogo = styled.div.attrs({

})`
    text-align: center;
    width: 20%;
    margin-left: 8%;
    padding-top: 1%;
    position: relative;
`

const NavElement = styled.div.attrs({

})`
    justify-content: center;
    display: flex;
    position: relative;
    width: 20%;
    text-align: center;
    padding-top: 1.5vh;
    color: #4F4F4F;
    font-family: Trebuchet MS, sans-serif;
    font-size: 4vw;
    font-weight: bold;
`

const NavChartIcon = styled.div.attrs({
    className: "fa-solid fa-chart-line"
})`
    padding-top: 0.5vh;
    padding-right: 2vw;
`

const NavListIcon = styled.div.attrs({
    className: "fa-solid fa-list"
})`
    padding-top: 0.5vh;
    padding-right: 2vw;
`

const UserIcon = styled.div.attrs({
    className: "fa-regular fa-circle-user"
})`
    position: absolute;
    right: 7%;
    top: 1vh;
    font-size: 4vh;
    color: #ff5900; 
`

const MobileAuthUserIcon = styled.div.attrs({
    className: "fa-regular fa-circle-user"
})`
    position: relative;
    font-size: 12vh;
    top: 2vh;
    margin-bottom: 7vh;
    color: #ff5900; 
`

const MobileHomeHeader = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #4F4F4F;
    font-size: 12vw;
    position: absolute;
    top: 3vh;
    left: 7vw;
`

const MobileHomeDescription = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    color: #4F4F4F;
    font-size: 5vw;
    position: absolute;
    top: 14vh;
    text-align: left;
    margin-left: 8vw;
    width: 80%;
`

const MobileListRow = styled.div.attrs({

})`
    width: 100%;
    display: flex;

`
const MobileListHeader = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold; 
    color: #4F4F4F;
    font-size: 6vw;
    padding: 1vw;
    padding-left: 4vw;
    padding-top: 5vw;
    width: 50%;
`

const MobileListTotal = styled.div.attrs({

})`
    padding: 1vw;
    padding-top: 7.5vw;
    padding-right: 4vw;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #7e7e7e;
    font-size: 3vw;
    width: 50%;
    text-align: right;
`

const MobileSortIcon = styled.div.attrs({
    className: "fa-solid fa-sort"
})`
    color: #7e7e7e;
    font-size: 2.5vw;
    padding-left: 1vw;
    margin-top: 0.1vh;
`

const MobileTableFooter = styled.div.attrs({

})`
    width: 100%;
    position: absolute;
    bottom: -4vh;
    display: flex;
    justify-content: center;
`

const MobilePreviousPage = styled.div.attrs({
    className: "fa-solid fa-arrow-left"
})`
    color: #7e7e7e;
    font-size: 4vw;
    width: 5%;
    text-align: right;
    padding-right: 12vw;
    cursor: pointer;
`

const MobileNextPage = styled.div.attrs({
    className: "fa-solid fa-arrow-right"
})`
    color: #7e7e7e;
    font-size: 4vw;
    width: 5%;
    text-align: left;
    cursor: pointer;
`

const MobileEmptyListMessage = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #7e7e7e;
    font-size: 3vw;
    position: absolute;
    top: 40%;
    text-align: center;
    width: 100%;
`

const MobileChooseInfo = styled.div.attrs({

})`
    text-align: center;
    font-size: 6vw;
    width: 80%;
    margin-left: 10%;
    margin-top: 5vh;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #4C4C4C;
    margin-bottom: 3vh;
`

const MobileChooseRow = styled.div.attrs({

})`
    display: flex;
    width: 100%;
`

const MobileInsertIcon = styled.button.attrs({
    className: "fa-solid fa-table-list"
})`
    width: 40%;
    background-color: white;
    color: #ff5900;
    border: none;
    font-size: 10vw;
`

const MobileFileIcon = styled.button.attrs({
    className: "fa-solid fa-file-csv"
})`
    width: 40%;
    background-color: rgba(0,0,0,0);
    color: #ff5900;
    border: none;
    font-size: 10vw;
`

const MobileDropboxIcon = styled.button.attrs({
    className: "fa-brands fa-dropbox"
})`
    width: 40%;
    background-color: white;
    color: #ff5900;
    border: none;
    font-size: 10vw;
`

const MobileJsonIcon = styled.button.attrs({
    className: "fa-solid fa-terminal"
})`
    width: 40%;
    background-color: rgba(0,0,0,0);
    color: #ff5900;
    border: none;
    font-size: 10vw;
`

const MobileInsertView = styled.div.attrs({

})`
    text-align: center;
    width: 100%;
    margin: 1%;
    padding: 0;
    margin-bottom: 15%;
    cursor: pointer;
    margin-top: 10%;
    transition: 0.2s;
    &:hover{
        transform: scale(1.1)
    }
`

const MobileFileView = styled.div.attrs({

})`
    text-align: center;
    width: 100%;
    margin: 1%;
    padding: 0;
    margin-top: 10%;
    margin-bottom: 15%;
    cursor: pointer;
    transition: 0.2s;
    &:hover{
        transform: scale(1.1)
    }
`

const MobileDropboxView = styled.div.attrs({

})`
    text-align: center;
    width: 100%;
    margin: 1%;
    padding: 0;
    margin-top: 10%;
    cursor: pointer;
    margin-bottom: 15%;
    transition: 0.2s;
    &:hover{
        transform: scale(1.1)
    }
`

const MobileViewSpan = styled.div.attrs({

})`
    text-align: center;
    background-color: white;
    margin: 0;
    width: 100%;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 4vw;
    padding: 8% 0;
`

const MobileInputHead = styled.th.attrs({

})`
    padding: 5px;
    text-align: center;
    font-size: 3vw;
`

const MobileInputText = styled.input.attrs({
    className: "form-control", spellcheck: "false",
})`
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 3vw;
    border: none;
    border-bottom: solid 1px rgb(212, 212, 212);
    outline: none;
    width: 100%;
    text-align: center;
    &:focus {
        outline: none;
        border-color: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
`

const MobileInsertNameContainer = styled.div.attrs({

})`
    display: flex;
    width: 100%;
    text-align: center;
    color: #5b5b5b;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.1vw;
    margin-bottom: 3vh;
`

const MobileInputName = styled.input.attrs({
    className: "form-control", spellcheck: "false",
})`
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 3vw;
    margin-right: 2vw;
    border: none;
    border-bottom: solid 1px rgb(212, 212, 212);
    outline: none;
    width: 30%;
    text-align: center;
    margin-top: 2vh;
    &:focus {
        outline: none;
        border-color: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
`

const MobileNameLabel = styled.div.attrs({

})`
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 3vw;
    margin-top: 3.3vh;
    margin-left: 5vw;
    margin-right: 2vw;
`

const MobileBackButton = styled.button.attrs({
    className: "fa-sharp fa-solid fa-arrow-left"
})`
    border: none;
    background-color: white;
    color: #7E7E7E;
    font-size: 8vw;
    margin-left: 2vw;
    margin-top: 5vw;
    transition: 0.2s;
    &:hover {
        color: #4C4C4C;
        transform: scale(1.2)
    }
`

const MobileActionButton = styled.button.attrs({

})`
    display: block;
    color: #ff5900; 
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 3vw; 
    border: 2px solid #ff5900; 
    height: 50%;
    margin-top: 3vh;
    margin-right: 3vw;
    width: 40%;
    background-color: white;
    transition: 0.25s;
    &:hover, focus {
        box-shadow: inset 0 -3.25em 0 0 #ff5900;
        color: white;
    }
`

const MobileFileRow = styled.div.attrs({

})`
    margin-top: 15%;
    width: 100%;
    display: flex;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw;
    padding: 2% 0;
    margin-left: 3%;
`

const MobileFileContainer = styled.label.attrs({

})`
    margin-top: 6%;
    margin-left: 15vw;
    width: 17%;
    cursor: pointer;
`

const MobilePcIcon = styled.span.attrs({
    className: "fa-sharp fa-solid fa-desktop"
})`
    font-size: 20vw;
    color: #ff5900; 
`

const MobileFileLabel = styled.div.attrs({

})`
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 5vw;
    margin-left: 5vw;
    margin-top: 1vh;
    width: 50%;
    text-align: center;
`

const MobilePcFileSpanIcon = styled.span.attrs({
    className: "fa-solid fa-file-csv"
})`
    position: absolute;
    top: 5vh;
    left: -7vw;
    width: 30%;
    background-color: white;
    color: #ff5900;
    filter: drop-shadow(3px 3px 0 white) 
    drop-shadow(-3px -3px 0 white);
    font-size: 10vw;
`

const MobileDropboxRow = styled.div.attrs({

})`
    margin-top: 15%;
    width: 100%;
    display: flex;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw;
    padding: 2% 0;
    margin-left: 3%;
`

const MobileDropboxContainer = styled.div.attrs({

})`
    color: #ff5900; 
    background-color: white;
    text-align: center;
    margin-top: 6%;
    margin-left: 10vw;
    width: 17%;
    cursor: pointer;
`

const MobileDropboxButton = styled.button.attrs({
    className: "fa-brands fa-dropbox"
})`
    margin-top: 5%;
    border: none;
    color: #ff5900; 
    background-color: white;
    font-size: 22vw;
`

const MobileDropboxFile = styled.div.attrs({

})`
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 5vw;
    margin-left: 5vw;
    margin-top: 3.5vh;
    width: 60%;
    text-align: center;
`

const MobileFileSpanIcon = styled.span.attrs({
    className: "fa-solid fa-file-csv"
})`
    position: absolute;
    top: 6vh;
    left: 10vw;
    width: 40%;
    background-color: rgba(0,0,0,0);
    color: #ff5900;
    filter: drop-shadow(3px 3px 0 white) 
    drop-shadow(-3px -3px 0 white);
    font-size: 10vw;
`

const MobileJsonInfoButton = styled.div.attrs({
    className: "fa-solid fa-circle-info"
})`
    color: #7e7e7e;
    margin-top: 0.6vh;
    position: absolute;
    margin-left: 2vw;
`

const MobileJsonInfo = styled.div.attrs({

})`
    position: absolute;
    margin-top: 4vh;
    font-family: Trebuchet MS, sans-serif;
    font-weight: normal;
    color: #7e7e7e;
    font-size 5vw;
    text-align: left;
    width: 160%;
    margin-left: 3vw;
    top: 50vh;
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
`

const MobileJsonTextArea = styled.textarea.attrs({

})`
    position: absolute;
    left: 10%;
    top: 5vh;
    height: 40vh;
    width: 100%;
    resize: none;
`

const MobileValidationMessage = styled.div.attrs({

})`
    text-align: left;
    color: #DC0000;
    font-family: Trebuchet MS, sans-serif;
    font-size: 4vw;
    margin-top: 45vh;
    margin-left: 6vw;
`

const MobileAuthValidationMessage = styled.div.attrs({

})`
    text-align: left;
    color: #DC0000;
    font-family: Trebuchet MS, sans-serif;
    font-size: 3.5vw;
    margin-top: 1%;
`

const MobileJsonLabel = styled.div.attrs({

})`
    position: absolute;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 5vw;
    left: 17vw;
    top: -5vh;
    width: 50%;
    text-align: left;
`

const MobileDetailsName = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #7e7e7e;
    font-size: 5vw;
    position: absolute;
    top: 5vh;
    width: 17vw;
    left: 37vw;
`

const MobileAccountContainer = styled.div.attrs({
})`
    top: 90%;
    right: 8%;
    width: 40%;
    background-color: #ffffff;
    height: 40vh;
    border-radius: 5px;
    position: absolute;
    overflow-y: auto;
    padding-inline: 2vw;

    -webkit-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 5);
    -moz-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 5);
    box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 5);
`

const MobileCurrentUser = styled.div.attrs({
    
})`
    margin-top: 10%;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 4vw;
    overflow-wrap: break-word;
    margin-bottom: 10%;
    text-align: center;
`

const MobileLogoutButton = styled.div.attrs({

})`
    position: absolute;
    bottom: 0;
    width: 90%;
    text-align: center;
    color: white;
    margin-bottom: 1vh;
    background-color: #292929;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 6vw;
    transition: 0.2s;
`

const MobileProgressBarFooter = styled.div.attrs({

})`
    margin-top: 1vh;
    width: 90%;
    display: flex;
    position: relative;
    margin-left: auto;
    margin-right: auto;
`

const MobileNumberOfArrays = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    color: #7e7e7e;
    font-size: 4vw;
`

const MobileInfoButton = styled.div.attrs({
    className: "fa-solid fa-circle-info"
})`
    color: #7e7e7e;
    margin-top: 0.3vh;
    float: right;
    position: absolute;
    right: 0;
`

const MobileCapInfo = styled.div.attrs({

})`
    margin-top: 4vh;
    font-family: Trebuchet MS, sans-serif;
    color: #7e7e7e;
    font-size 3vw;
    text-align: left;
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
`

const MobileAuthForm = styled.div.attrs({

})`
    width: 100%;
    border-radius: 5px;
    padding: 5%;
    padding-right: 7%;
    text-align: center;
`

const MobileAuthLabel = styled.div.attrs({

})`
    text-align: left;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 4vw;
    margin-top: 6%;
`

const MobileForgotPassword = styled.div.attrs({

})`
    text-align: right;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-size: 4vw;
    margin-top: 1%;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        color: #4C4C4C;
    }
`

const MobileAuthSubmit = styled.button.attrs({

})`
    display: block;
    color: #ff5900; 
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 5vw; 
    border: 2px solid #ff5900; 
    padding: 1%;
    margin-top: 10%;
    width: 100%;
    background-color: white;
    transition: 0.25s;
    &:hover, focus {
        box-shadow: inset 0 -3.25em 0 0 #ff5900;
        color: white;
    }
`

const MobileAuthView = styled.div.attrs({
    
})`
color: #7E7E7E;
font-family: Trebuchet MS, sans-serif;
font-size: 4vw;
margin-top: 15%;
cursor: pointer;
transition: 0.2s;
&:hover {
    color: #4C4C4C;
    transform: scale(1.05)
}
`

const MobileGoogleIcon = styled.div.attrs({
    className: "fa-brands fa-google"
})`
    font-size: 10vw;
    color: #ff5900; 
    cursor: pointer;
    border: 3px solid;
    padding: 2vw;
    border-radius: 50%;
    margin-right: 20vw;
    transition: 0.2s;
    &:hover {
        transform: scale(1.1)
    }
`

const MobileAuthMessage = styled.div.attrs({

})`
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 8vw;
    margin-top: 10%;
`

export {
    UpperContainer,
    UpperNav,
    NavRow,
    NavLogo,
    NavElement,
    NavListIcon,
    NavChartIcon,
    UserIcon,
    MobileBody,
    MobileContentBlock,
    MobileHomeHeader,
    MobileHomeDescription,
    MobileListRow,
    MobileListTotal,
    MobileListHeader,
    MobileSortIcon,
    MobileNextPage,
    MobilePreviousPage,
    MobileTableFooter,
    MobileEmptyListMessage,
    MobileChooseInfo,
    MobileChooseRow,
    MobileInsertIcon,
    MobileFileIcon,
    MobileDropboxIcon,
    MobileJsonIcon,
    MobileInsertView,
    MobileFileView,
    MobileDropboxView,
    MobileViewSpan,
    MobileInputHead,
    MobileInputText,
    MobileInsertNameContainer,
    MobileInputName,
    MobileNameLabel,
    MobileBackButton,
    MobileActionButton,
    MobileFileContainer,
    MobileFileRow,
    MobileFileLabel,
    MobilePcIcon,
    MobilePcFileSpanIcon,
    MobileDropboxRow,
    MobileDropboxContainer,
    MobileDropboxButton,
    MobileDropboxFile,
    MobileFileSpanIcon,
    MobileJsonInfo,
    MobileJsonInfoButton,
    MobileJsonTextArea,
    MobileValidationMessage,
    MobileJsonLabel,
    MobileDetailsName,
    MobileAccountContainer,
    MobileCurrentUser,
    MobileLogoutButton,
    MobileInfoButton,
    MobileNumberOfArrays,
    MobileProgressBarFooter,
    MobileCapInfo,
    MobileAuthBody,
    MobileAuthForm,
    MobileAuthUserIcon,
    MobileAuthLabel,
    MobileAuthValidationMessage,
    MobileForgotPassword,
    MobileAuthSubmit,
    MobileAuthView,
    MobileGoogleIcon,
    MobileAuthMessage,}