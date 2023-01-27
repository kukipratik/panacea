import { React, useEffect, useState } from "react";
import "./profile.css";
import {
    ThemeProvider, useMediaQuery, useTheme,
    Grid, Box, Avatar, Typography, Button, Snackbar, Alert
} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import profileImage from "../../core/assets/images/profile.jpg";
import profileImage from "../../../core/assets/images/profile.jpg";
import customeTheme from "../../../core/theme/themeProvider";
import Navbar from "../../../core/components/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import modelSlice from "../../../core/state/modelSlice";
import { v4 } from 'uuid'
import { addDoc, arrayUnion, collection, updateDoc, doc, getDocs, limit, getDoc, where, query } from 'firebase/firestore'
import { db } from '../../../firebase'
import userSlice from "../../../core/state/userSlice"

function BuildTabs() {
    const [tabValue, setTabValue] = useState('one');
    let state = useSelector((state) => {
        return state.modelSlice
    })
    let user = useSelector((state) => {
        return state.userSlice
    })
    let [error, setError] = useState("")
    let [open, setOpen] = useState(false)
    let [message, setMessage] = useState("")
    let [severity, setSeverity] = useState("info")
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const dispatch = useDispatch()
    useEffect(() => {
        let snapShot = []
        Promise.all(user.models.map(async (d) => {
            let docRef = doc(collection(db, "model"), d)
            try {
                const snap = await getDoc(docRef);
                let snapData = snap.data();
                snapShot.push(snapData);
            } catch (error) {
                console.log(error);
            }
        })).then(() => {
            dispatch(userSlice.actions.addModels(snapShot))
        })
    }, [tabValue, user.models, dispatch])
    let addModelHandler = async () => {
        if (state.title === "") {
            setError("Please enter the title")
            return
        }
        if (state.description === "") {
            setError("please enter the description")
            return
        }
        if (state.model === "") {
            setError("Please input the model file")
            return
        }
        setOpen(true)
        setMessage("Wait model is being added")
        setSeverity("info")
        let bodyContent = new FormData();
        let image = await fetch(state.model).then(r => r.blob())
        let nameOfBlob = `${v4()}.h5`
        image = new File([image], nameOfBlob)
        console.log(image)
        bodyContent.append("model", image);
        let response = await fetch("http://127.0.0.01:5000/addModel", {
            method: "POST",
            body: bodyContent
        })
        console.log(response)
        let addeddoc = await addDoc(collection(db, "model"), {
            name: nameOfBlob,
            description: state.description,
            title: state.title,
            classes: state.classes
        })
        console.log(addeddoc)
        await updateDoc(doc(collection(db, "user"), user.id), {
            models: arrayUnion(addeddoc.id)
        })
        setOpen(true)
        setMessage("Added successfully")
        setSeverity("success")
    }
    return (
        <Box display="flex" flexDirection="column" sx={{ width: '100%' }} >
            <Box bgcolor="white" paddingTop={1} sx={{ width: '100%' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    indicatorColor="primary"
                >
                    <Tab value="one" label="Your Models" />
                    <Tab value="two" label="New Requests" />
                    <Tab value="three" label="Upload Model" />
                </Tabs>
            </Box>

            {/* Your Model Section */}
            {(tabValue === 'one') ? (
                <Box padding={2} >
                    <Box component="div" display="flex" justifyContent="space-between" paddingX={1.5} paddingBottom={2.5} >
                        <Typography component="span" gutterBottom variant="h6">Your Models</Typography>
                    </Box>
                    <Grid container rowSpacing={4} marginBottom={2}
                        columnSpacing={{ xs: 1, md: 2 }} >
                        {user.modelDetail.map((detail, index) => {
                            return <Grid item xs={12} md={6} key={index}>
                                <Box display="flex" flexDirection="column"
                                    bgcolor="white" paddingX={4} paddingY={2}>
                                    <Typography variant="h5" gutterBottom >
                                        <b>{detail.title}</b>
                                    </Typography>
                                    <Typography>
                                        {detail.description}
                                    </Typography>
                                    <Box height={12} ></Box>
                                    <Button>Edit Model</Button>
                                </Box>
                            </Grid>
                        })}
                    </Grid>
                </Box>
            ) : (
                (tabValue === 'two') ? (
                    <Box padding={2} >
                        <Box component="div" display="flex" justifyContent="space-between" paddingX={1.5} paddingBottom={2.5} >
                            <Typography component="span" variant="h6" gutterBottom>Your Requests</Typography>
                        </Box>
                        <Grid container rowSpacing={4} marginBottom={2}
                            columnSpacing={{ xs: 1, md: 2 }} >
                            <Grid item xs={12} md={6}>
                                <Box display="flex" flexDirection="column"
                                    bgcolor="white" paddingX={4} paddingY={2}>
                                    <Typography variant="h5" gutterBottom >
                                        <b>Can someone make model for measuring mental stress?</b>
                                    </Typography>
                                    <Typography>
                                        We have psychiatrist for our mental health related patients, but it will be much
                                        easier if we can use ML model for the treatment of our patient. We want the best optimized model for this problem.
                                    </Typography>
                                    <Box height={12} ></Box>
                                    <Button>Accept Request</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <>
                        <Box minHeight={420} bgcolor="white" paddingY={4} paddingX={2} marginTop={0.5} >
                            <form>
                                <fieldset>
                                    <legend>
                                        <Typography component="div">Upload New Model</Typography>
                                    </legend>

                                    <Box className="newSection" minHeight={200}
                                        paddingY={2} paddingX={4}>
                                        <Grid
                                            container
                                            rowSpacing={5}
                                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                        >
                                            <Grid item xs={12} sx={{ display: "flex" }}>
                                                <Typography width={120}>Title:</Typography>
                                                <input
                                                    type="text"
                                                    className="requestInput"
                                                    value={state.title}
                                                    onChange={(event) => {
                                                        dispatch(modelSlice.actions.update({
                                                            title: event.target.value
                                                        }))
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sx={{ display: "flex" }}>
                                                <Typography width={120}>Description:</Typography>
                                                <textarea className="requestInput" rows="5" cols="60" name="description"
                                                    value={state.description}
                                                    onChange={(event) => {
                                                        dispatch(modelSlice.actions.update({
                                                            description: event.target.value
                                                        }))
                                                    }} />
                                            </Grid>
                                            <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
                                                <Typography width={120}>Classes:</Typography>
                                                <Grid sx={{ display: "flex", flexDirection: "column", margin: "3px" }}>
                                                    {state.classes.map((d) => {
                                                        return <div><Typography width={100}>{d}</Typography></div>
                                                    })}
                                                    <input onKeyUp={(event) => {
                                                        if (event.key === "Enter") {
                                                            dispatch(modelSlice.actions.update({
                                                                classes: [...state.classes, event.target.value]
                                                            }))
                                                            event.target.value = ""
                                                        }
                                                    }}></input></Grid>
                                            </Grid>
                                            <Grid item xs={12} sx={{ display: "flex" }}>
                                                <Typography width={120}>.h5 file:</Typography>
                                                <input
                                                    type="file"
                                                    className="requestInput"
                                                    onChange={(event) => {
                                                        let url = window.URL.createObjectURL(event.target.files[0])
                                                        console.log(url);
                                                        dispatch(modelSlice.actions.update({
                                                            model: url
                                                        }))
                                                    }}
                                                    accept=".h5"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ color: "red" }}>
                                        {error}
                                    </Box>
                                </fieldset>
                                <Box marginY={5} display="flex" justifyContent="center" >
                                    <Button variant="contained" onClick={addModelHandler}>
                                        <Typography width={170}>
                                            Upload Model
                                        </Typography>
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                        <Snackbar open={open} autoHideDuration={2000} onClose={() => {
                            setOpen(false)
                            setSeverity("info")
                            setMessage("")
                        }}>
                            <Alert severity={severity}>
                                {message}
                            </Alert>
                        </Snackbar>
                    </>
                )
            )}
        </Box>
    );
}

export default function ProfilePageForEng() {
    const imgRadius = 250;
    const theme = useTheme();
    const dispatch = useDispatch()
    const isMob = useMediaQuery(theme.breakpoints.down("md"));
    let user = useSelector((state) => {
        return state.userSlice
    })
    useEffect(() => {
        getDocs(query(collection(db, "user"), where("email", "==", "random@gmail.com"), limit(1))).then((data) => {
            let dataShot = []
            data.forEach((d) => {
                let datum = d.data()
                datum.id = d.id
                dataShot.push(datum)
            })
            dispatch(userSlice.actions.signIn(dataShot[0]))
        })
    }, [])

    return (
        <ThemeProvider theme={customeTheme}>
            <Navbar />
            <Box marginTop={0.2}>

                {/* for left Box */}
                <Grid container rowSpacing={2} marginX={5} marginBottom={2}
                    columnSpacing={{ xs: 0.2 }} >
                    <Grid item xs={12} md={3}>
                        <Box className="rightBox" display="flex" alignItems="center" flexDirection="column"
                            bgcolor="white" paddingY={4}>
                            <Avatar
                                alt="Profile Picture"
                                src={profileImage}
                                sx={{ width: imgRadius, height: imgRadius }}
                            />
                            <Typography gutterBottom>
                                <b>Models Uploaded:</b> 23
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <b> Name:</b> {user.name}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <b> Email:</b> {user.email}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <b> Address:</b> Samakhusi, Kathmandu
                            </Typography>
                        </Box>
                    </Grid>

                    {/* for Right Box */}
                    <Grid item xs={12} md={9} display="flex" alignItems="start" >
                        <BuildTabs />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider >
    );
};
