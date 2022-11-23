import React, { useEffect, useState, useRef, useMemo } from "react"
import api, { getBundles } from "../api"
import { useSortBy, useTable, usePagination } from "react-table"
import { useSnackbar } from "react-simple-snackbar"

import { 
    ContentBlock, 
    Content, 
    SingleReadingRow, 
    RemoveButton, 
    ListRow, 
    ListHeader, 
    ListTotal, 
    SortIcon, 
    TableFooter, 
    NextPage, 
    PreviousPage, 
    EmptyListMessage, 
    GroupListLabel, 
    ExpandIcon, 
    CollapseIcon,
    MoveButton,
    Flex,
    AddGroupButton,
    InputText,
    EmptyList,
    DeleteGray,
    ShareButton, } from "../style/styled-components"
import { 
    MobileContentBlock, 
    MobileListRow, 
    MobileListHeader, 
    MobileListTotal,
    MobileSortIcon, 
    MobileTableFooter, 
    MobileNextPage, 
    MobilePreviousPage, 
    MobileEmptyListMessage, 
    MobileGroupListLabel,
    MobileExpandIcon,
    MobileCollapseIcon,
    MobileDeleteGray} from "../style/styled-mobile-components"
import styles from "../style/site.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Modal from "react-bootstrap/Modal"
import Options from "../style/options.js"
import ReactTooltip from "react-tooltip"
import { Tooltips, NotAuthorizedView } from "../components"
import { checkTargetForNewValues, motion } from "framer-motion"
import Select from "react-select"

function Table({columns, data}) {
    var optionsInstance = new Options()

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,

    } = useTable({ columns, data, initialState: { pageSize: 3 } }, useSortBy, usePagination)

    return (
        <>
        <div>
            <table {...getTableProps()} className={styles.ListTable}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.ListHeader}>
                                    {column.render('Header')}
                                </th>
                    ))}
                </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()} className={styles.ListTr}>
                  {row.cells.map(cell => {
                    return (
                        <td {...cell.getCellProps()} className={styles.ListCell}>
                          {cell.render('Cell')}
                        </td>
                    )
                  })}
                </tr>
            )
          })}
          </tbody>
        </table>
        </div>   
        <TableFooter>
            { canPreviousPage ?
            <PreviousPage onClick={() => previousPage()} disabled={!canPreviousPage}></PreviousPage>
            : null }
            { canNextPage ?
            <NextPage onClick={() => nextPage()} disabled={!canNextPage}></NextPage>
            : null }
        </TableFooter> 
      </>       
    )
}

function MobileTable({columns, data}) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,

    } = useTable({ columns, data, initialState: { pageSize: 11 } }, useSortBy, usePagination)

    return (
        <>
        <div>
            <table {...getTableProps()} className={styles.MobileListTable}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.MobileListHeader}>
                                    {column.render('Header')}
                                </th>
                    ))}
                </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()} className={styles.MobileListTr}>
                  {row.cells.map(cell => {
                    return (
                        <td {...cell.getCellProps()} className={styles.MobileListCell}>
                          {cell.render('Cell')}
                        </td>
                    )
                  })}
                </tr>
            )
          })}
          </tbody>
        </table>
        </div>   
        <MobileTableFooter>
        { canPreviousPage ?
            <MobilePreviousPage onClick={() => previousPage()} disabled={!canPreviousPage}/>
            : null }
            { canNextPage ?
            <MobileNextPage onClick={() => nextPage()} disabled={!canNextPage}/>
            : null }
        </MobileTableFooter> 
      </>       
    )
} 


function SensorDataList(callback) {
    const didMount = useRef(true)
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(false)
    const [sensordatas, setSensorDatas] = useState([])
    const [readingBundles, setReadingBundles] = useState([])
    const [bundleGroups, setBundleGroups] = useState([])
    const [sharedBundles, setSharedBundles] = useState([])
    const [show, setShow] = useState(false)
    const [showMove, setShowMove] = useState(false)
    const [helper, invokeHelper] = useState(1)
    var optionsInstance = new Options()
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(optionsInstance.successSnackbarOptions)
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar(optionsInstance.errorSnackbarOptions)
    const [readingObj, passReadingObj] = useState({})
    const [bundleObj, passBundleObj] = useState({})
    const [groupObj, passGroupObj] = useState({})
    const [noReadingsView, setNoReadingsView] = useState(false)
    const [noBundlesView, setNoBundlesView] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [showSingleReadings, setShowSingleReadings] = useState(false)
    const [showReadingBundle, setShowReadingBundle] = useState(false)
    const [showBundleGroup, setShowBundleGroup] = useState("")
    const [showShared, setShowShared] = useState(false)
    const [currentBundleGroup, setCurrentBundleGroup] = useState([])
    const [moveSelect, setMoveSelect] = useState([])
    const [selectValue, setSelectValue] = useState("")
    const [showCreate, setShowCreate] = useState(false)
    const [createInput, setCreateInput] = useState("")
    const [showBundleRemove, setShowBundleRemove] = useState(false)
    const [showGroupRemove, setShowGroupRemove] = useState(false)
    const breakpoint = 620;

    useEffect(() => {
        const userModel = JSON.parse(localStorage.getItem("userModel"))

        async function getSensorDatas() {
            setupUser()
            let response = { status: "" }
            try {
                response = await api.getReadingByUserId(userModel._id)
            } catch (err) {
                setNoReadingsView(true)
            } finally {
                if (response.status == 200) {
                    setSensorDatas(response.data.data)
                    localStorage.setItem("numberOfArrays", JSON.stringify(response.data.data.length))
                    setNoReadingsView(false)
                }
            }
        }

        async function getReadingBundles() {
            let response = { status: "" }
            try {
                response = await api.getBundlesByUserId(userModel._id)
            } catch (err) {
                setNoBundlesView(true)
            } finally {
                if (response.status == 200) {
                    setReadingBundles(response.data.data)
                    setNoBundlesView(false)
                }
            }
        }

        async function getSharedBundles() {
            let response = { status: "" }
            try {
                response = await api.getSharedBundles()
            } catch (err) {
                setSharedBundles([])
            } finally {
                if (response.status == 200) {
                    setSharedBundles(response.data.data)
                }
            }
        }

        async function getBundleGroups() {
            let response = { status: "" }
            try {
                response = await api.getBundleGroupsByUserId(userModel._id)
            } catch (err) {
            } finally {
                if (response.status == 200) {
                    setBundleGroups(response.data.data)
                }
            }
        }

        if (didMount.current ) {
            setupUser()
            getSensorDatas()
            getReadingBundles()
            getBundleGroups()
            getSharedBundles()
            didMount.current = false
            return
        }

        getSensorDatas()
        getReadingBundles()
        getBundleGroups()
        getSharedBundles()
    }, [helper])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
    
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    const setupUser = async () => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = loggedInUser
            const user = await api.getUserByEmail(JSON.parse(foundUser).email)
            setUser(user.data.data)
            setLogged(true)
        }
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleCloseBundleRemove = () => {
        setShowBundleRemove(false)
    }

    const handleCloseMove = () => {
        setShowMove(false)
    }

    const handleShow = (obj) => {
        setShow(true)
        passReadingObj({...obj})
    }

    const handleCloseCreate = () => {
        setShowCreate(false)
    }

    const handleShowCreate = () => {
        setShowCreate(true)
    }

    const handleShowBundleModal = (obj) => {
        setShowBundleRemove(true)
        passBundleObj({...obj})
    }

    const handleShowMoveBundleModal = (obj) => {
        setShowMove(true)
        passBundleObj({...obj})
        const options = []
        bundleGroups.forEach(group => {
            if (group._id != obj.groupId)
                options.push({ value: group._id, label: group.name })
        })
        if (obj.groupId != 0)
            options.push({ value: 0, label: "Reading bundles" })
        setMoveSelect(options)
    }

    let showData = true
    if (!sensordatas.length) {
        showData = false
    }

    const filteredByBundleId = sensordatas.filter(sensordata => sensordata.bundleId == 0)
    const readingCount = [...new Map(sensordatas.map(sensordata => [sensordata["uuid"], sensordata])).values()].length
    const distinctedByUuid = [...new Map(filteredByBundleId.map(sensordata => [sensordata["uuid"], sensordata])).values()]
    const fixedDate = distinctedByUuid.map(sensordata => { 
        return {...sensordata, createdAt: new Date(sensordata.createdAt).toLocaleString()}
    })

    const data = useMemo(() => fixedDate,
    [
        {
            delCol: "",
        },
    ],
    [])

    const columns = [
        {
            Header: <>CREATED AT { width > breakpoint ? <SortIcon/> : <MobileSortIcon/> }</>,
            accessor: "createdAt",
            Cell: props => 
                <SingleReadingRow onClick={(e) => {viewDetails(e, props.row.original.uuid)}}>{props.value}</SingleReadingRow>,
        },
        {
            Header: <>NAME { width > breakpoint ? <SortIcon/> : <MobileSortIcon/> }</>,
            accessor: "name",
            Cell: props => 
                <SingleReadingRow onClick={(e) => {viewDetails(e, props.row.original.uuid)}}>{props.value}</SingleReadingRow>,
        },
        {
            Header: "",
            accessor: "uuid",
            Cell: function(props) {
                return (
                    <>
                        <RemoveButton id="test-remove-button" data-tip data-for="DeleteReading" onClick={() => {handleShow(props.row.original)}}/>
                        <Tooltips/>
                    </>     
                )             
        },
    },
    ]

    const filteredByGroupId = readingBundles.filter(bundle => bundle.groupId == 0)
    const bundlesFixedDate = filteredByGroupId.map(bundle => { 
        return {...bundle, createdAt: new Date(bundle.createdAt).toLocaleString()}
    })

    const filteredSharedBundles = sharedBundles.filter(bundle => bundle.userId != user._id)
    const sharedFixedDate = filteredSharedBundles.map(bundle => { 
        return {...bundle, createdAt: new Date(bundle.createdAt).toLocaleString()}
    })

    const bundleData = useMemo(() => bundlesFixedDate,
    [
        {
            delCol: "",
        },
    ],
    [])

    const sharedBundleData = useMemo(() => sharedFixedDate,
    [
        {
            delCol: "",
        },
    ],
    [])

    const deleteReading = async (event, uuid) => {
        event.preventDefault()
        console.log(uuid)
        const response = await api.deleteReading(uuid) 
        if (response.status == 200) {
            openSuccessSnackbar("Reading deleted successfully!")
            invokeHelper({...helper})         
        } 
        else {
            openErrorSnackbar("Something went wrong while deleting reading")
            invokeHelper({...helper}) 
        }
        handleClose()
        callback.onDelete()
    }

    const deleteBundle = async (event, id) => {
        event.preventDefault()
        await api.deleteReadingByBundleId(id)
        const response = await api.deleteBundle(id) 
        if (response.status == 200) {
            openSuccessSnackbar("Bundle deleted successfully!")
            invokeHelper({...helper})         
        } 
        else {
            openErrorSnackbar("Something went wrong while deleting bundle")
            invokeHelper({...helper}) 
        }
        handleClose()
        callback.onDelete()
    }
    
    const viewDetails = (event, uuid) => {
        event.preventDefault()
        window.location.href = `/sensordata/${uuid}`
    }

    const viewBundleDetails = (event, id) => {
        event.preventDefault()
        window.location.href = `/sensordata/bundle/${id}`
    }

    const handleOnSelectChange = event => {
        setSelectValue(event.value)
    }

    const moveBundle = async (event, bundle) => {
        event.preventDefault()
        const bundleToUpdate = {
            _id: bundle._id,
            name: bundle.name,
            userId: bundle.userId,
            groupId: selectValue,
            isShared: bundle.isShared,
        }
        const response = await api.updateBundle(bundle._id, bundleToUpdate) 
        if (response.status == 200) {
            openSuccessSnackbar("Bundle moved successfully!")
            invokeHelper({...helper})      
        } 
        else {
            openErrorSnackbar("Something went wrong while moving bundle")
            invokeHelper({...helper}) 
        }
        setShowMove(false)   
    }

    const createGroup = async () => {
        const userModel = await api.getUserByEmail(user.email)
        const userId = userModel.data.data._id
        const name = createInput
        const bundleGroup = { name, userId }
        const response = await api.createBundleGroup(bundleGroup)
        if (response.status == 201) {
            openSuccessSnackbar("Group created successfully!")
            invokeHelper({...helper})         
        } 
        else {
            openErrorSnackbar("Something went wrong while creating group")
            invokeHelper({...helper}) 
        }
        setShowCreate(false)   
    }

    const handleShareBundle = async (event, bundle) => {
        event.preventDefault()
        let share
        if (bundle.isShared)
            share = false
        else
            share = true

        const bundleToUpdate = {
            _id: bundle._id,
            name: bundle.name,
            userId: bundle.userId,
            groupId: bundle.groupId,
            isShared: share,
        }
        const response = await api.updateBundle(bundle._id, bundleToUpdate) 
        if (response.status == 200) {
            if (share)
                openSuccessSnackbar("Bundle shared successfully!")
            else
                openSuccessSnackbar("Bundle is no more shared")
            invokeHelper({...helper})      
        } 
        else {
            openErrorSnackbar("Something went wrong")
            invokeHelper({...helper}) 
        }
    }

    const groupBundleData = useMemo(() => currentBundleGroup,
    [
        {
            delCol: "",
        },
    ],
    [])

    const groupBundleColumns = [
        {
            Header: <>CREATED AT { width > breakpoint ? <SortIcon/> : <MobileSortIcon/> }</>,
            accessor: "createdAt",
            Cell: props => 
                <SingleReadingRow onClick={(e) => {viewBundleDetails(e, props.row.original._id)}}>{props.value}</SingleReadingRow>,
        },
        {
            Header: <>NAME { width > breakpoint ? <SortIcon/> : <MobileSortIcon/> }</>,
            accessor: "name",
            Cell: props => 
                <SingleReadingRow onClick={(e) => {viewBundleDetails(e, props.row.original._id)}}>{props.value}</SingleReadingRow>,
        },
        {
            Header: "",
            accessor: "_id",
            Cell: (props) => {     
                return (
                    <>
                        { props.row.original.userId == user._id ?
                        <>
                            <Flex>
                                { !props.row.original.isShared ?
                                    <ShareButton style={{ color: "gray" }} data-tip data-for="NotShared" onClick={(e) => {handleShareBundle(e, props.row.original)}} />
                                :   <ShareButton data-tip data-for="Shared" onClick={(e) => {handleShareBundle(e, props.row.original)}} /> }
                                <MoveButton data-tip data-for="MoveBundle" onClick={() => {handleShowMoveBundleModal(props.row.original)}}/>
                                <RemoveButton id="test-remove-button" data-tip data-for="DeleteReading" onClick={() => {handleShowBundleModal(props.row.original)}}/>
                            </Flex>
                            <Tooltips/>
                        </> : null }
                    </>     
                )             
        },
    },
    ]

    const handleShowGroupRemove = (obj) => {
        setShowGroupRemove(true)
        passGroupObj({...obj})
    }

    const handleCloseGroupRemove = () => {
        setShowGroupRemove(false)
    }

    const deleteGroup = async () => {
        var bundlesInGroupResponse = await api.getBundlesByGroupId(groupObj._id)
        if (bundlesInGroupResponse.status == 200) {
            var bundlesInGroup = bundlesInGroupResponse.data.data
            bundlesInGroup.forEach(async (bundle) => {
                await api.deleteReadingByBundleId(bundle._id)
                await api.deleteBundle(bundle._id)
            })
        }
        var deleteGroupResponse = await api.deleteBundleGroup(groupObj._id)
        if (deleteGroupResponse.status == 200) {
            openSuccessSnackbar("Group deleted successfully!")
            invokeHelper({...helper})         
        } 
        else {
            openErrorSnackbar("Something went wrong while deleting group")
            invokeHelper({...helper}) 
        }
        setShowGroupRemove(false)   
    }

    const BundleGroups = () => {
        let rows = []
        for (let i = 0; i < bundleGroups.length; i++) {
            const filteredByGroupId = readingBundles.filter(bundle => bundle.groupId == bundleGroups[i]._id)
            const mapped = filteredByGroupId.map(bundle => { 
                return {...bundle, createdAt: new Date(bundle.createdAt).toLocaleString()}
            })

            rows.push(
                <>
                { width > breakpoint ?
                <>
                <GroupListLabel>
                    { bundleGroups[i].name }
                    { showBundleGroup != bundleGroups[i].name ?
                        <ExpandIcon onClick = {() => { setShowBundleGroup(bundleGroups[i].name); setCurrentBundleGroup(mapped); setShowSingleReadings(false); setShowReadingBundle(false); setShowShared(false) } } />
                        :
                        <CollapseIcon onClick = {() => { setShowBundleGroup("") } } /> 
                    }
                    <DeleteGray onClick = {() => { handleShowGroupRemove(bundleGroups[i]) } } />
                </GroupListLabel>
                { showBundleGroup == bundleGroups[i].name ? 
                <>
                    { mapped.length ? 
                    <motion.div
                        initial = {{ opacity: 0, y: "-100%" }}
                        animate = {{ opacity: 1, y: "0%" }}
                        transition = {{ delay: 0.2 }}>
                        <Table 
                            columns = { groupBundleColumns } 
                            data = { groupBundleData } />  
                    </motion.div> 
                    : 
                    <EmptyList>
                        You didn't insert any reading yet
                    </EmptyList> }
                </>
                : null } 
                </>
                :
                <>
                <MobileGroupListLabel>
                    { bundleGroups[i].name }
                    { showBundleGroup != bundleGroups[i].name ?
                        <MobileExpandIcon onClick = {() => { setShowBundleGroup(bundleGroups[i].name); setCurrentBundleGroup(mapped); setShowSingleReadings(false); setShowReadingBundle(false); setShowShared(false) } } />
                        :
                        <MobileCollapseIcon onClick = {() => { setShowBundleGroup("") } } /> 
                    }
                    <MobileDeleteGray onClick = {() => { handleShowGroupRemove(bundleGroups[i]) } } />
                </MobileGroupListLabel>
                { showBundleGroup == bundleGroups[i].name ? 
                <>
                    { mapped.length ? 
                    <motion.div
                        initial = {{ opacity: 0, y: "-100%" }}
                        animate = {{ opacity: 1, y: "0%" }}
                        transition = {{ delay: 0.2 }}>
                        <MobileTable 
                            columns = { groupBundleColumns } 
                            data = { groupBundleData } />  
                    </motion.div> 
                    : 
                    <MobileEmptyListMessage>
                        You didn't insert any reading yet
                    </MobileEmptyListMessage> }
                </>
                : null } 
                </> }
                </>
            )         
        }
        return rows
    }

    return (
        <>
        { width > breakpoint ?
        <>
        <ContentBlock>
                { logged ?
                <>  
                    <ReactTooltip id="AddBundleGroup" type="dark" effect="solid">
                        <span>New bundle group</span>
                    </ReactTooltip> 

                            <motion.div
                                initial = {{ opacity: 0, y: "-20%" }}
                                animate = {{ opacity: 1, y: "0%" }}
                                >
                                <ListRow>
                                    <ListHeader>
                                        All readings
                                    </ListHeader>
                                    <ListTotal>
                                        Total: {readingCount}
                                    </ListTotal>
                                </ListRow>
                                <ListRow style={{height: "36px"}}>
                                    <AddGroupButton data-tip data-for="AddBundleGroup" onClick={handleShowCreate}/>
                                </ListRow>
                            </motion.div>
                            <BundleGroups />
                            <GroupListLabel>
                                Reading bundles
                                { !showReadingBundle ?
                                    <ExpandIcon onClick = {() => { setShowReadingBundle(true); setShowSingleReadings(false); setShowBundleGroup(""); setShowShared(false) } } />
                                    :
                                    <CollapseIcon onClick = {() => { setShowReadingBundle(false) } } /> 
                                }
                            </GroupListLabel>
                            { showReadingBundle ?
                            <>
                                { bundlesFixedDate.length ?
                                <motion.div
                                    initial = {{ opacity: 0, y: "-100%" }}
                                    animate = {{ opacity: 1, y: "0%" }}
                                    transition = {{ delay: 0.2 }}>
                                    <Table 
                                        columns = { groupBundleColumns } 
                                        data = { bundleData } />  
                                </motion.div> 
                                :
                                <EmptyList>
                                    You didn't insert any bundle yet
                                </EmptyList> }
                            </>
                            : null }
                            <GroupListLabel>
                                Single readings
                                { !showSingleReadings ?
                                    <ExpandIcon onClick = {() => { setShowSingleReadings(true); setShowReadingBundle(false); setShowBundleGroup(""); setShowShared(false) } } />
                                    :
                                    <CollapseIcon onClick = {() => { setShowSingleReadings(false) } } /> 
                                }
                            </GroupListLabel>
                            { showSingleReadings ?
                            <>
                                { fixedDate.length ?
                                <motion.div
                                    initial = {{ opacity: 0, y: "-100%" }}
                                    animate = {{ opacity: 1, y: "0%" }}
                                    transition = {{ delay: 0.2 }}>
                                    <Table 
                                        columns = { columns } 
                                        data = { data } />  
                                </motion.div> 
                                : 
                                <EmptyList>
                                    You didn't insert any reading yet
                                </EmptyList> }
                            </>
                            : null }
                            <GroupListLabel>
                                Shared
                                { !showShared ?
                                    <ExpandIcon onClick = {() => { setShowShared(true); setShowSingleReadings(false); setShowReadingBundle(false); setShowBundleGroup("") } } />
                                    :
                                    <CollapseIcon onClick = {() => { setShowShared(false) } } /> 
                                }
                            </GroupListLabel>
                            { showShared ?
                            <>
                                { sharedFixedDate.length ?
                                <motion.div
                                    initial = {{ opacity: 0, y: "-100%" }}
                                    animate = {{ opacity: 1, y: "0%" }}
                                    transition = {{ delay: 0.2 }}>
                                    <Table 
                                        columns = { groupBundleColumns } 
                                        data = { sharedBundleData } />  
                                </motion.div> 
                                :
                                <EmptyList>
                                    No bundles currently shared 
                                </EmptyList> }
                            </>
                            : null }
                        </> 
                : <NotAuthorizedView/> }          
        </ContentBlock>
        </>
        :
        <>
            <MobileContentBlock>
                { logged ?
                <>  
                <ReactTooltip id="AddBundleGroup" type="dark" effect="solid">
                    <span>New bundle group</span>
                </ReactTooltip> 

                        <motion.div
                            initial = {{ opacity: 0, y: "-20%" }}
                            animate = {{ opacity: 1, y: "0%" }}
                            >
                            <ListRow>
                                <MobileListHeader>
                                    All readings
                                </MobileListHeader>
                                <MobileListTotal>
                                    Total: {readingCount}
                                </MobileListTotal>
                            </ListRow>
                            <ListRow style={{height: "36px"}}>
                                <AddGroupButton data-tip data-for="AddBundleGroup" onClick={handleShowCreate}/>
                            </ListRow>
                        </motion.div>
                        <BundleGroups />
                        <MobileGroupListLabel>
                            Reading bundles
                            { !showReadingBundle ?
                                <MobileExpandIcon onClick = {() => { setShowReadingBundle(true); setShowSingleReadings(false); setShowBundleGroup(""); setShowShared(false) } } />
                                :
                                <MobileCollapseIcon onClick = {() => { setShowReadingBundle(false) } } /> 
                            }
                        </MobileGroupListLabel>
                        { showReadingBundle ?
                        <>
                            { bundlesFixedDate.length ?
                            <motion.div
                                initial = {{ opacity: 0, y: "-100%" }}
                                animate = {{ opacity: 1, y: "0%" }}
                                transition = {{ delay: 0.2 }}>
                                <MobileTable 
                                    columns = { groupBundleColumns } 
                                    data = { bundleData } />  
                            </motion.div> 
                            :
                            <MobileEmptyListMessage>
                                You didn't insert any bundle yet
                            </MobileEmptyListMessage> }
                        </>
                        : null }
                        <MobileGroupListLabel>
                            Single readings
                            { !showSingleReadings ?
                                <MobileExpandIcon onClick = {() => { setShowSingleReadings(true); setShowReadingBundle(false); setShowBundleGroup(""); setShowShared(false) } } />
                                :
                                <MobileCollapseIcon onClick = {() => { setShowSingleReadings(false) } } /> 
                            }
                        </MobileGroupListLabel>
                        { showSingleReadings ?
                        <>
                            { fixedDate.length ?
                            <motion.div
                                initial = {{ opacity: 0, y: "-100%" }}
                                animate = {{ opacity: 1, y: "0%" }}
                                transition = {{ delay: 0.2 }}>
                                <MobileTable 
                                    columns = { columns } 
                                    data = { data } />  
                            </motion.div> 
                            : 
                            <MobileEmptyListMessage>
                                You didn't insert any reading yet
                            </MobileEmptyListMessage> }
                        </>
                        : null }
                        <MobileGroupListLabel>
                            Shared
                            { !showShared ?
                                <MobileExpandIcon onClick = {() => { setShowShared(true); setShowSingleReadings(false); setShowReadingBundle(false); setShowBundleGroup("") } } />
                                :
                                <MobileCollapseIcon onClick = {() => { setShowShared(false) } } /> 
                            }
                        </MobileGroupListLabel>
                        { showShared ?
                        <>
                            { sharedFixedDate.length ?
                            <motion.div
                                initial = {{ opacity: 0, y: "-100%" }}
                                animate = {{ opacity: 1, y: "0%" }}
                                transition = {{ delay: 0.2 }}>
                                <MobileTable 
                                    columns = { groupBundleColumns } 
                                    data = { sharedBundleData } />  
                            </motion.div> 
                            :
                            <MobileEmptyListMessage>
                                No bundles currently shared 
                            </MobileEmptyListMessage> }
                        </>
                        : null }
                    </> 
                : <NotAuthorizedView/> }           
            </MobileContentBlock>
        </> }
        <Modal show={show} onHide={handleClose} animation={true} centered backdrop="static" backdropClassName={styles.ModalBackdrop}>
            <Modal.Header closeButton>
                <h4>Confirm reading delete</h4>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to permanent remove this reading from list?
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} className={styles.CancelButton}>
                    Cancel
                </button>
                <button id="test-confirm-button" onClick={(e) => {deleteReading(e, readingObj.uuid)}} className={styles.DeleteButton}>
                    Delete
                </button>
            </Modal.Footer>
        </Modal> 
        <Modal show={showBundleRemove} onHide={handleCloseBundleRemove} animation={true} centered backdrop="static" backdropClassName={styles.ModalBackdrop}>
            <Modal.Header closeButton>
                <h4>Confirm bundle delete</h4>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to permanent remove this bundle from list?
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleCloseBundleRemove} className={styles.CancelButton}>
                    Cancel
                </button>
                <button id="test-confirm-button" onClick={(e) => {deleteBundle(e, bundleObj._id)}} className={styles.DeleteButton}>
                    Delete
                </button>
            </Modal.Footer>
        </Modal> 
        <Modal show={showMove} onHide={handleCloseMove} animation={true} centered backdrop="static" backdropClassName={styles.ModalBackdrop}>
            <Modal.Header closeButton>
                <h4>Move bundle to another group</h4>
            </Modal.Header>
            <Modal.Body>
                <Select options={moveSelect} onChange={handleOnSelectChange} />
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleCloseMove} className={styles.CancelButton}>
                    Cancel
                </button>
                <button onClick={(e) => {moveBundle(e, bundleObj)}} className={styles.DeleteButton}>
                    Move
                </button>
            </Modal.Footer>
        </Modal>
        <Modal show={showCreate} onHide={handleCloseCreate} animation={true} centered backdrop="static" backdropClassName={styles.ModalBackdrop}>
            <Modal.Header closeButton>
                <h4>Add new bundle group</h4>
            </Modal.Header>
            <Modal.Body>
                { width > breakpoint ?
                <>
                    <p className={styles.ModalLabel}>Name:</p>
                    <InputText value={createInput} onChange={(event) => {setCreateInput(event.target.value)}}/>
                </>
                :
                <>
                    <p className={styles.ModalLabel} style={{ fontSize: "5vw" }}>Name:</p>
                    <InputText value={createInput} onChange={(event) => {setCreateInput(event.target.value)}} style={{ fontSize: "5vw" }}/>
                </> }
            </Modal.Body>
            <Modal.Footer style={{borderTop: "0"}}>
                <button onClick={handleCloseCreate} className={styles.CancelButton}>
                    Cancel
                </button>
                <button onClick={createGroup} className={styles.DeleteButton}>
                    Create
                </button>
            </Modal.Footer>
        </Modal>
        <Modal show={showGroupRemove} onHide={handleCloseGroupRemove} animation={true} centered backdrop="static" backdropClassName={styles.ModalBackdrop}>
            <Modal.Header closeButton>
                <h4>Confirm bundle group delete</h4>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to permanent remove this bundle group from list?
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleCloseGroupRemove} className={styles.CancelButton}>
                    Cancel
                </button>
                <button id="test-confirm-button" onClick={(e) => {deleteGroup(e)}} className={styles.DeleteButton}>
                    Delete
                </button>
            </Modal.Footer>
        </Modal> 
        </>
    )
}


export default SensorDataList