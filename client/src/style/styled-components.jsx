import React from "react"
import styled, { keyframes } from "styled-components"
import "bootstrap/dist/css/bootstrap.min.css"
import "./fonts/css/all.css"

const UpperContainer = styled.div.attrs({

})`
    background-color: #ffffff;
    position: fixed;
    left: -5%;
    right: -5%;
    top: 0;
    height: 10vh;
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

const SideColumn = styled.div.attrs({
})`
    width: 14.5vw;
`

const SideContainer = styled.div.attrs({
})`
    flex: 1;
    background-color: #ffffff;
    height: 79vh;
    border-radius: 5px;
    position: relative;

    -webkit-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
`

const BottomActions = styled.div.attrs({

})`
    background-color: #ffffff;
    height: 10vh;
    border-radius: 5px;
    position: relative;
    margin-top: 4vh;
    background-color: #292929;

    -webkit-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
`

const SideMenu = styled.nav.attrs({
})`
    position: relative;
    width: 90%;
    left: 5%;
    text-align: center;
    padding-top: 20%;
`

const CurrentUser = styled.div.attrs({
    
})`
    margin-top: 10%;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.1vw;
    overflow-wrap: break-word;
    margin-bottom: 10%;
`

const LogoutButton = styled.div.attrs({

})`
    top: 25%;
    position: absolute;
    height: 100%;
    width: 100%;
    text-align: center;
    color: white;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.6vw;
    transition: 0.2s;
    &:hover {
        transform: scale(1.15)
    }
`

const ContentBlock = styled.div.attrs({
})`
    flex: 2;
    width: 70.5vw;
    background-color: #ffffff;
    min-height: 93vh;
    max-height: 93vh;
    border-radius: 5px;
    margin-left: 2vw;
    position: relative;
    overflow-y: auto;
    padding: 0;

    -webkit-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
`

const Content = styled.nav.attrs({
})`
    padding-top: 4%;
    position: relative;
    width: 90%;
    left: 5%;
    height: 100%;
`

const AuthBlock = styled.div.attrs({
    className: "col-lg-8 col-11",
})`
    background-color: #ffffff;
    min-height: 80vh;
    border-radius: 5px;
    position: relative;
    overflow-y: auto;
    margin-left: 12vw;
    display: flex;
    padding: 0;
    overflow: hidden;

    -webkit-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
`

const AuthForm = styled.div.attrs({

})`
    width: 40%;
    border-radius: 5px;
    padding: 5%;
    padding-right: 7%;
    text-align: center;
`

const AuthContent = styled.div.attrs({

})`

    width: 60%;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
`

const Row = styled.nav.attrs({
})`
    display: flex;
    width: 95%;
`

const AuthBody = styled.nav.attrs({
    className: "row"
})`
    background-color: #f0f0f0;
    position: absolute;
    padding-top: 8vh;
    padding-bottom: 12vh;
    left: 0;
    right: 0;
    top: 0;
    padding-left: 10vw;
    padding-right: 5vw;
`

const Body = styled.div.attrs({
})`
    background-color: #f0f0f0;
    position: absolute;
    padding-top: 15vh;
    left: 0;
    right: 0;
    top: 0;
    padding-left: 10vw;
    padding-right: 5vw;
    padding-bottom: 3vh;
`

const Label = styled.label`
    margin: 5px;
    font-size: 10px;
`

const InputText = styled.input.attrs({
    className: "form-control", spellcheck: "false",
})`
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw;
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

const InputFile = styled.input.attrs({
    type: "file", accept: ".csv"   
})`
    display: none;
`

const Button = styled.button.attrs({
})`
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw; 
    width: 100%;
    height: 35px;
    padding: 0;
    margin-left: 7px;
    background-color: white;
    border: 2px solid #ff5900;
    color: #ff5900;
    transition: 0.2s;
    padding-inline: 5px;
    &:hover {
        box-shadow: inset 0 -3.25em 0 0 #ff5900;
        color: white;
    }
`

const AddButton = styled.button.attrs({
    className: "fa-solid fa-plus add-button"
})` 
    font-size: 16px;
    float: right;
    background-color: white;
    width: 28px;
    height: 28px;
    color: #ff5900;
    padding: 0;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    transition: 0.2s;
    float: left;
    &:hover {
        transform: scale(1.3)
    }
`

const AddGroupButton = styled.button.attrs({
    className: "fa-solid fa-plus add-button"
})` 
    font-size: 24px;
    position: absolute;
    right: 2vw;
    background-color: white;
    width: 28px;
    height: 28px;
    color: #ff5900;
    border: none;
    border-radius: 5px;
    transition: 0.2s;
    &:hover {
        transform: scale(1.3)
    }
`

const AddRowButton = styled.button.attrs({
    className: "fa-solid fa-plus add-button"
})` 
    font-size: 16px;
    background-color: white;
    width: 28px;
    height: 28px;
    color: #ff5900;
    padding: 0;
    border: none;
    border-radius: 5px;
    transition: 0.2s;
    padding-inline: 7px;
    &:hover {
        transform: scale(1.3)
    }
`

const RemoveButton = styled.button.attrs({
    className: "fa-solid fa-trash-can add-button", type: "button"
})` 
    font-size: 16px;
    background-color: rgba(0,0,0,0);
    width: 28px;
    height: 28px;
    color: #ff5900;
    padding: 0;
    border: none;
    border-radius: 5px;
    margin-right: 5px;
    transition: 0.2s;
    float: right;
    &:hover {
        transform: scale(1.3)
    }
`

const MoveButton = styled.button.attrs({
    className: "fa-solid fa-arrow-right-arrow-left", type: "button"
})` 
    font-size: 16px;
    background-color: rgba(0,0,0,0);
    width: 28px;
    height: 28px;
    color: #ff5900;
    padding: 0;
    border: none;
    border-radius: 5px;
    margin-right: 5px;
    transition: 0.2s;
    float: right;
    &:hover {
        transform: scale(1.3)
    }
`

const ShareButton = styled.button.attrs({
    className: "fa-solid fa-share-nodes", type: "button"
})` 
    font-size: 16px;
    background-color: rgba(0,0,0,0);
    width: 28px;
    height: 28px;
    color: #ff5900;
    padding: 0;
    border: none;
    border-radius: 5px;
    margin-right: 5px;
    transition: 0.2s;
    float: right;
    &:hover {
        transform: scale(1.3)
    }
`

const RemoveRowButton = styled.button.attrs({
    className: "fa-solid fa-trash-can add-button"
})` 
    font-size: 16px;
    margin-left: 5px;
    background-color: white;
    width: 28px;
    height: 28px;
    color: #ff5900;
    padding: 0;
    border: none;
    border-radius: 5px;
    transition: 0.2s;
    padding-inline: 7px;
    &:hover {
        transform: scale(1.3)
    }
`

const DownloadFileButton = styled.button.attrs({
    className: "fa-solid fa-download add-button"
})` 
    border: 1px solid #ff5900;
    font-size: 15px;
    position: relative;
    top: 5px;
    background-color: white;
    width: auto;
    height: 28px;
    color: #ff5900;
    padding-inline: 5px;
    margin-bottom: 10px;
    margin-top: 10px;
    float: right;
    transition: 0.2s;
    &:hover, focus {
        box-shadow: inset 0 -3.25em 0 0 #ff5900;
        color: white;
    }
`

const FilterButton = styled.button.attrs({

})` 
    border: 1px solid #ff5900;
    font-size: 15px;
    position: relative;
    top: 5px;
    background-color: white;
    width: auto;
    height: 28px;
    color: #ff5900;
    padding-inline: 5px;
    margin-bottom: 10px;
    margin-top: 10px;
    float: right;
    transition: 0.2s;
    &:hover, focus {
        box-shadow: inset 0 -3.25em 0 0 #ff5900;
        color: white;
    }
`

const SingleReadingRow = styled.div.attrs({

})`
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding: 2vh;
    padding-left: 2vw;
`

const ReadingHead = styled.th.attrs({

})`
    padding: 5px;
    text-align: left;
`

const InputHead = styled.th.attrs({

})`
    padding: 5px;
    text-align: center;
`

const ReadingCell = styled.td.attrs({

})`
    padding: 5px;
    border-bottom: solid 1px rgb(212, 212, 212);
`

const ViewsRow = styled.div.attrs({
    className: "row"
})`
    width: 100%;
    margin: 0;
    margin-top: 3%;
    display: flex;
`

const ViewsCol = styled.div.attrs({
    className: "col-lg-6"
})`

`

const ChooseDescription = styled.div.attrs({

})`
    position: absolute;
    font-size: 1.5vw;
    font-family: Trebuchet MS, sans-serif;
    color: #4C4C4C;
    margin-top: 10%;
    margin-left: 5%;
    width: 90%;
`

const InsertView = styled.div.attrs({

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

const FileView = styled.div.attrs({

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

const DropboxView = styled.div.attrs({

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

const ViewSpan = styled.div.attrs({

})`
    text-align: center;
    background-color: rgba(0,0,0,0);
    margin: 0;
    width: 100%;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw;
    padding: 8% 0;
`

const InsertIcon = styled.button.attrs({
    className: "fa-solid fa-table-list"
})`
    width: 40%;
    background-color: white;
    color: #ff5900;
    border: none;
    font-size: 4vw;
`

const FileIcon = styled.button.attrs({
    className: "fa-solid fa-file-csv"
})`
    width: 40%;
    background-color: rgba(0,0,0,0);
    color: #ff5900;
    border: none;
    font-size: 4vw;
`

const JsonIcon = styled.button.attrs({
    className: "fa-solid fa-terminal"
})`
    width: 40%;
    background-color: rgba(0,0,0,0);
    color: #ff5900;
    border: none;
    font-size: 4vw;
`

const FileSpanIcon = styled.span.attrs({
    className: "fa-solid fa-file-csv"
})`
    width: 40%;
    background-color: rgba(0,0,0,0);
    color: #ff5900;
    filter: drop-shadow(3px 3px 0 white) 
    drop-shadow(-3px -3px 0 white);
    font-size: 4vw;
`

const PcFileSpanIcon = styled.span.attrs({
    className: "fa-solid fa-file-csv"
})`
    width: 30%;
    background-color: white;
    color: #ff5900;
    filter: drop-shadow(5px 5px 0 white) 
    drop-shadow(-5px -5px 0 white);
    font-size: 5vw;
`

const DropboxIcon = styled.button.attrs({
    className: "fa-brands fa-dropbox"
})`
    width: 40%;
    background-color: white;
    color: #ff5900;
    border: none;
    font-size: 4vw;
`

const ChooseInfo = styled.div.attrs({

})`
    text-align: center;
    font-size: 2.2vw;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #4C4C4C;
`

const DropboxRow = styled.div.attrs({

})`
    margin-top: 15%;
    width: 100%;
    display: flex;
`

const DropboxContainer = styled.div.attrs({

})`
    margin-left: 25%;
    width: 20%;
    color: #ff5900; 
    background-color: white;
    text-align: center;
    cursor: pointer;
`

const DropboxButton = styled.button.attrs({
    className: "fa-brands fa-dropbox"
})`
    margin-top: 5%;
    border: none;
    color: #ff5900; 
    background-color: white;
    font-size: 10vw;
`

const DropboxFile = styled.div.attrs({

})`
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw;
    padding: 2% 0;
    margin-left: 3%;
    width: 20%;
    text-align: center;
`

const ActionButton = styled.button.attrs({

})`
    display: block;
    color: #ff5900; 
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw; 
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

const BackButton = styled.button.attrs({
    className: "fa-sharp fa-solid fa-arrow-left"
})`
    border: none;
    background-color: white;
    color: #7E7E7E;
    font-size: 2vw;
    transition: 0.2s;
    &:hover {
        color: #4C4C4C;
        transform: scale(1.2)
    }
`

const FileRow = styled.div.attrs({

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

const JsonRow = styled.div.attrs({

})`
    margin-top: 5%;
    width: 80%;
    display: flex;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw;
    padding: 2% 0;
    margin-left: 3%;
`

const FileContainer = styled.label.attrs({

})`
    margin-top: 4%;
    margin-left: 28%;
    width: 17%;
    cursor: pointer;
`

const PcIcon = styled.span.attrs({
    className: "fa-sharp fa-solid fa-desktop"
})`
    font-size: 8vw;
    color: #ff5900; 
`

const FileLabel = styled.div.attrs({

})`
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw;
    margin-left: 2%;
    width: 20%;
    text-align: center;
`

const InsertContainer = styled.div.attrs({

})`
    width: 100%;
    margin-top: 5%;
    margin-bottom: 7%;
    display: flex;
`

const InsertNameContainer = styled.div.attrs({

})`
    width: 20%;
    text-align: center;
    color: #5b5b5b;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.1vw;
`

const ResizeIcon = styled.div.attrs({
    className: "fa-solid fa-arrows-left-right-to-line"
})`
    position: absolute;
    color: #5b5b5b;
    font-size: 1.5vw;
    bottom: 0;
`

const Cursor = styled.div.attrs({
    className: "fa-solid fa-arrow-pointer"
})`
    position: absolute;
    color: white;
    filter: drop-shadow(1px 1px 1px black) 
    drop-shadow(0px 0px 1px black);
    font-size: 1.5vw;
    bottom: 0;
`

const UserIcon = styled.div.attrs({
    className: "fa-regular fa-circle-user"
})`
    font-size: 5vw;
    color: #ff5900; 
`

const AuthInput = styled.input.attrs({

})`
    width: 100%;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    padding: 1%;
    padding-inline: 3%;
`

const AuthLabel = styled.div.attrs({

})`
    text-align: left;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw;
    margin-top: 6%;
`

const AuthSubmit = styled.button.attrs({

})`
    display: block;
    color: #ff5900; 
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.2vw; 
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

const ForgotPassword = styled.div.attrs({

})`
    text-align: right;
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-size: 1vw;
    margin-top: 1%;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        color: #4C4C4C;
    }
`

const ValidationMessage = styled.div.attrs({

})`
    text-align: left;
    color: #DC0000;
    font-family: Trebuchet MS, sans-serif;
    font-size: 1vw;
    margin-top: 1%;
`

const AuthView = styled.div.attrs({
    
})`
color: #7E7E7E;
font-family: Trebuchet MS, sans-serif;
font-size: 1.2vw;
margin-top: 15%;
cursor: pointer;
transition: 0.2s;
&:hover {
    color: #4C4C4C;
    transform: scale(1.05)
}
`

const HiddenInput = styled.input.attrs({
    
})`
    display: none;
`

const AuthMessage = styled.div.attrs({

})`
    color: #7E7E7E;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    font-size: 1.4vw;
    margin-top: 10%;
`

const NotAuthorizedSign = styled.div.attrs({
    className: "fa-solid fa-triangle-exclamation"
})`
    color: #ff5900; 
    font-size: 15vw;
    position: absolute;
    top: 15%;
    left: 35%;
`

const Intruder = styled.div.attrs({
    className: "fa-solid fa-user-secret"
})`
    font-size: 5vw;
    color: #4F4F4F;  
`

const WarnArea1 = styled.div.attrs({

})`
    position: absolute;
    width: 40%;
    height: 50%;
`

const WarnArea2 = styled.div.attrs({

})`
    position: absolute;
    width: 60%;
    height: 50%;
    right: 0;
`

const WarnArea3 = styled.div.attrs({

})`
    position: absolute;
    width: 60%;
    height: 50%;
    bottom: 0;
`

const WarnArea4 = styled.div.attrs({

})`
    position: absolute;
    width: 40%;
    height: 50%;
    bottom: 0;
    right: 0;
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
    margin-left: 5%;
    padding-top: 1%;
    position: relative;
`

const NavElement = styled.div.attrs({

})`
    justify-content: center;
    display: flex;
    position: relative;
    width: 22%;
    text-align: center;
    padding-top: 1%;
    color: #4F4F4F;
    font-family: Trebuchet MS, sans-serif;
    font-size: 1.4vw;
`

const NavChartIcon = styled.div.attrs({
    className: "fa-solid fa-chart-line"
})`
    padding-top: 1%;
    padding-right: 2%;
`

const NavStreamIcon = styled.div.attrs({
    className: "fa-solid fa-satellite-dish"
})`
    padding-top: 1%;
    padding-right: 2%;
`


const NavListIcon = styled.div.attrs({
    className: "fa-solid fa-list"
})`
    padding-top: 1%;
    padding-right: 2%;
`

const DetailsRow = styled.div.attrs({

})`
    height: 20vw;
    margin-bottom: 10vh;
    position: relative;
`

const SensorNode = styled.div.attrs({
    className: "fa-solid fa-map-pin"
})`
    position: absolute;
    color: #4F4F4F;
    font-size: 7vw;
    top: -1vh;
    left: 2vw;
    transform: rotate(180deg);
`

const SensorPin = styled.div.attrs({
    className: "fa-solid fa-map-pin"
})`
    left: 10%;
    position: absolute;
    color: #4F4F4F;
    font-size: 9vw;
`

const SensorContainer = styled.div.attrs({

})`
    position: relative;
    display: block;
    height: 9vw;
    width: 200%;
`

const HomeContent = styled.div.attrs({

})`
    height: 100%;
    width: 35%;
    overflow: hidden;
    z-index: 100;
    position: relative;
    background-color: white;
`

const WallpaperContainer = styled.div.attrs({

})`
    position: relative;
    height: 100%;
    width: 65%;
`

const HomeRow = styled.div.attrs({

})`
    display: flex;
    justify-content: center;
    height: 100%;
    overflow: hidden;
`

const Table = styled.div.attrs({

})`
    position: absolute;
    top: 0;
    left: 0;
    width: 17%;
    margin-left: 1vw;
    font-family: Trebuchet MS, sans-serif;
`

const Th = styled.div.attrs({

})`
    min-width: 4vw;
    padding-inline: 1vw;
    font-size: 1vw;
`

const Thead = styled.div.attrs({

})`
    width: 100%;
    color: #4F4F4F;
    border: 2px solid;
    font-weight: bold;
    -webkit-box-shadow: 0px 0px 9px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 9px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 9px -3px rgba(66, 68, 90, 1);
`

const Td = styled.div.attrs({

})`
    border-bottom: 1px solid;
    padding-inline: 1vw;
    width: 100%;
`

const Tr = styled.div.attrs({
    
})`
    display: flex;
`

const Tbody = styled.div.attrs({

})`
    position: relative;
    width: 100%;
    background-color: rgba(0,0,0,0);
`

const WallpaperSpanOne = styled.div.attrs({

})`
    top: -30vh;
    position: absolute;
    font-size: 5vw;
    color: #4F4F4F;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
`

const WallpaperSpanTwo = styled.div.attrs({

})`
    top: -45vh;
    position: absolute;
    font-size: 5vw;
    color: #4F4F4F;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
`

const WallpaperTape = styled.div.attrs({

})`
    position: relative;
    display: flex;
    top: 35vh;
    width: 600%;
`

const HomeHeader = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #4F4F4F;
    font-size: 2.5vw;
    position: absolute;
    top: 5%;
    right: 20%;
`

const HomeDescription = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #4F4F4F;
    font-size: 1.3vw;
    text-align: right;
    padding-left: 4%;
    padding-right: 4%;
`

const ListRow = styled.div.attrs({

})`
    width: 100%;
    display: flex;

`
const ListHeader = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold; 
    color: #4F4F4F;
    font-size: 2vw;
    padding: 1vw;
    padding-left: 2vw;
    padding-top: 2vw;
    width: 50%;
`

const ListTotal = styled.div.attrs({

})`
    padding: 1vw;
    padding-top: 2.5vw;
    padding-right: 2vw;
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #7e7e7e;
    font-size: 1.3vw;
    width: 50%;
    text-align: right;
`

const SortIcon = styled.div.attrs({
    className: "fa-solid fa-sort"
})`
    color: #7e7e7e;
    font-size: 1vw;
    padding-left: 1vw;
`

const TableFooter = styled.div.attrs({

})`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    padding-bottom: 2vh;
    padding-top: 2vh;
`

const PreviousPage = styled.div.attrs({
    className: "fa-solid fa-arrow-left"
})`
    margin-left: 2vw;
    color: #7e7e7e;
    font-size: 1.6vw;
    text-align: left;
    width: 100%;
    cursor: pointer;
`

const NextPage = styled.div.attrs({
    className: "fa-solid fa-arrow-right"
})`
    margin-right: 2vw;
    color: #7e7e7e;
    font-size: 1.6vw;
    width: 100%;
    text-align: right;
    cursor: pointer;
`

const AuthFooter = styled.div.attrs({

})`
    width: 100%;
    position: relative;
    margin-top: 3vh;
`
const GoogleIcon = styled.div.attrs({
    className: "fa-brands fa-google"
})`
    font-size: 2vw;
    color: #ff5900; 
    cursor: pointer;
    border: 3px solid;
    padding: 0.5vw;
    border-radius: 50%;
    margin-right: 6vw;
    transition: 0.2s;
    &:hover {
        transform: scale(1.1)
    }
`

const DetailsName = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #7e7e7e;
    font-size: 2vw;
    position: absolute;
    top: 8vh;
    width: 17vw;
`

const EmptyListMessage = styled.div.attrs({

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

const ProgressBarFooter = styled.div.attrs({

})`
    margin-top: 1vh;
    width: 90%;
    display: flex;
    position: relative;
    margin-left: auto;
    margin-right: auto;
`

const NumberOfArrays = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    color: #7e7e7e;
    font-size: 1vw;
`

const InfoButton = styled.div.attrs({
    className: "fa-solid fa-circle-info"
})`
    color: #7e7e7e;
    margin-top: 0.6vh;
    float: right;
    position: absolute;
    right: 0;
`

const JsonInfoButton = styled.div.attrs({
    className: "fa-solid fa-circle-info"
})`
    color: #7e7e7e;
    margin-top: 0.6vh;
    position: absolute;
    margin-left: 2vw;
`

const JsonInfo = styled.div.attrs({

})`
    position: absolute;
    margin-top: 4vh;
    font-family: Trebuchet MS, sans-serif;
    font-weight: normal;
    color: #7e7e7e;
    font-size 1vw;
    text-align: left;
    width: 30%;
    margin-left: 1vw;
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
`

const CapInfo = styled.div.attrs({

})`
    margin-top: 4vh;
    font-family: Trebuchet MS, sans-serif;
    color: #7e7e7e;
    font-size 1vw;
    text-align: left;
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
`

const JsonTextArea = styled.textarea.attrs({

})`
    height: 50vh;
    width: 100%;
    right: 0;
    resize: none;
`

const GroupListLabel = styled.div.attrs({

})`
    padding: 1vw;
    padding-inline: 2vw;
    font-weight: bold;
    font-family: Trebuchet MS, sans-serif;
    color: #7e7e7e;
    background-color: #F0F0F0;
    font-size: 1.3vw;
    -webkit-box-shadow: 0px 2px 9px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 2px 9px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 2px 9px -3px rgba(66, 68, 90, 1);
    margin-top: 0.3vh;
    margin-bottom: 1vh;
`

const EmptyList = styled.div.attrs({

})`
    font-weight: bold;
    font-family: Trebuchet MS, sans-serif;
    color: #7e7e7e;
    text-align: center;
    padding: 2vw;
    font-size: 1.5vw;
`

const ExpandIcon = styled.div.attrs({
    className: "fa-solid fa-chevron-down"
})`
    float: right;
    padding-top: 0.1vw;
    font-size: 1.8vw;
    cursor: pointer;
`

const DeleteGray = styled.div.attrs({
    className: "fa-solid fa-trash-can"
})`
    float: right;
    padding-top: 0.5vw;
    padding-right: 1.5vw;
    font-size: 1.3vw;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        transform: scale(1.2);
        padding-top: 0.3vw;
        padding-right: 1.3vw;
    }
`

const DeleteTask = styled.div.attrs({
    className: "fa-solid fa-trash-can"
})`
    float: right;
    padding: 0.8vw;
    padding-top: 1vw;
    font-size: 1.3vw;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        transform: scale(1.2);
        padding-top: 0.7vw;
    }
`

const CollapseIcon = styled.div.attrs({
    className: "fa-solid fa-chevron-up"
})`
    float: right;
    padding-top: 0.1vw;
    font-size: 1.8vw;
    cursor: pointer;
`

const Flex = styled.div.attrs({

})`
    display: flex;
`

const TaskTab = styled.div.attrs({

})`
    padding: 1vw;
    width: 100%;
    height: auto;
    margin-right: 4.5vw;
    margin-bottom: 2vw;
    font-family: Trebuchet MS, sans-serif;
    color: #7e7e7e;
    background-color: #F0F0F0;
    -webkit-box-shadow: 0px 2px 9px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 2px 9px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 2px 9px -3px rgba(66, 68, 90, 1);
    transition: 0.2s;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
`

const TaskContainer = styled.div.attrs({

})`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`

const TaskLabel = styled.div.attrs({

})`
    font-weight: bold;
    font-size: 2vw;
`

const SensorUl = styled.div.attrs({

})`
    font-size: 1.4vw;
`

const SensorLi = styled.div.attrs({

})`
    font-size: 1.1vw;
    padding-left: 0.5vw;
`

const TaskDateLabel = styled.div.attrs({

})`
    font-size: 1.4vw;
    text-align: right;
    font-weight: bold;
    color: #7e7e7e;
`

const TaskDate = styled.div.attrs({

})`
    font-size: 1.1vw;
    text-align: right;
`

const TaskReadingTab = styled.div.attrs({

})`
    margin-bottom: 2vh;
    padding: 1vw;
    width: 100%;
    height: auto;
    font-family: Trebuchet MS, sans-serif;
    color: #7e7e7e;
    background-color: #F0F0F0;
    -webkit-box-shadow: 0px 2px 9px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 2px 9px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 2px 9px -3px rgba(66, 68, 90, 1);
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background-color: #E8E8E8;
        font-weight: bold;
    }
`

const TaskHeader = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    font-size: 2.5vw;
    font-weight: bold;
    color: #4F4F4F;
`

const TaskUpper = styled.div.attrs({

})`
    padding: 2vw;
    display: flex;
`

const SolutionButton = styled.div.attrs({
    className: "fa-solid fa-circle-question"
})`
    font-size: 2.5vw;
    color: #7e7e7e;
    position: absolute;
    top: 0;
    right: 0;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
`

const SolutionStep = styled.div.attrs({

})`
    margin-bottom: 5vw;
    width: 100%;
    padding-inline: 2%;
    display: flex;
`

const SolutionStepDescription = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
    color: #4F4F4F;
    font-size: 1.3vw;
`

const IsNotMonotonous = styled.div.attrs({

})`
    font-family: Trebuchet MS, sans-serif;
    color: #AE0000;
    position: absolute;
    width: 30%;
    top: 20vh;
    font-size: 1vw;
`

export { 
    UpperContainer, 
    UpperNav, 
    SideColumn, 
    SideContainer, 
    SideMenu, 
    BottomActions, 
    ContentBlock, 
    Content, 
    Row, 
    Body, 
    Button, 
    InputText,
    Label,
    AddButton,
    RemoveButton,
    AddRowButton,
    RemoveRowButton, 
    SingleReadingRow,
    ReadingCell,
    InputFile,
    ReadingHead,
    DownloadFileButton,
    ViewsRow,
    InsertView,
    FileView,
    DropboxView,
    ViewSpan,
    InsertIcon,
    FileIcon,
    DropboxIcon,
    ViewsCol,
    ChooseInfo,
    ChooseDescription,
    DropboxButton,
    DropboxContainer,
    DropboxRow,
    DropboxFile,
    ActionButton,
    FileSpanIcon,
    BackButton,
    PcIcon,
    FileRow,
    FileContainer,
    PcFileSpanIcon,
    FileLabel,
    InsertContainer,
    InsertNameContainer,
    AuthBlock,
    AuthForm,
    AuthContent,
    ResizeIcon,
    Cursor,
    UserIcon,
    AuthInput,
    AuthLabel,
    AuthSubmit,
    ForgotPassword,
    AuthView,
    ValidationMessage,
    HiddenInput,
    AuthMessage,
    LogoutButton,
    NotAuthorizedSign,
    CurrentUser,
    Intruder,
    WarnArea1,
    WarnArea2,
    WarnArea3,
    WarnArea4,
    NavRow,
    NavLogo,
    NavElement,
    NavChartIcon,
    NavListIcon,
    AuthBody,
    DetailsRow,
    SensorNode,
    WallpaperContainer,
    HomeContent,
    HomeRow,
    Table,
    Td,
    Th,
    Thead,
    Tr,
    Tbody,
    SensorPin,
    SensorContainer,
    WallpaperSpanOne,
    WallpaperSpanTwo,
    WallpaperTape,
    HomeHeader,
    HomeDescription,
    ListRow,
    ListHeader,
    ListTotal,
    SortIcon,
    TableFooter,
    NextPage,
    PreviousPage,
    AuthFooter,
    GoogleIcon,
    DetailsName,
    InputHead,
    EmptyListMessage,
    NumberOfArrays,
    InfoButton,
    ProgressBarFooter,
    CapInfo,
    JsonTextArea,
    JsonRow,
    JsonInfoButton, 
    JsonInfo,
    JsonIcon,
    GroupListLabel,
    ExpandIcon,
    CollapseIcon,
    MoveButton,
    Flex,
    AddGroupButton,
    EmptyList,
    DeleteGray,
    NavStreamIcon,
    TaskTab,
    TaskLabel,
    SensorLi,
    SensorUl,
    TaskDate,
    TaskDateLabel,
    TaskReadingTab,
    TaskHeader,
    TaskUpper,
    FilterButton,
    SolutionButton,
    TaskContainer,
    SolutionStep,
    SolutionStepDescription,
    DeleteTask,
    ShareButton,
    IsNotMonotonous,}


