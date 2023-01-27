import { React, useEffect, useState } from "react";
import "./profile.css";
import {
    ThemeProvider, useMediaQuery, useTheme, Link,
    Grid, Box, Avatar, Typography, Button,
} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import profileImage from "../../../core/assets/images/profile.jpg";
import customeTheme from "../../../core/theme/themeProvider";
import Navbar from "../../../core/components/navbar/navbar";
import {getDocs,collection,query,where,limit, doc, getDoc} from "firebase/firestore"
import {db} from "../../../firebase"
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../../core/state/userSlice";

function BuildTabs() {
    const [tabValue, setTabValue] = useState('one');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const dispatch = useDispatch()

    let state = useSelector((state)=>{
        return state.userSlice
    })

    useEffect(()=>{
        let q = query(collection(db,"user"),where("email","==","abc@gmail.com"),limit(1))
        getDocs(q).then((data)=>{
            let dataShot = [];
            data.forEach((d)=>{
                let datum = d.data()
                datum.id = d.id
                dataShot.push(datum)
            })
            dispatch(userSlice.actions.signIn({
                ...dataShot[0]
            }));
            let snapShot=[]
            Promise.all(dataShot[0].models.map(async (d)=>{
                let docRef = doc(collection(db,"model"),d)
                try {
                    const snap = await getDoc(docRef);
                    let snapData = snap.data();
                    snapShot.push(snapData);
                } catch (error) {
                    console.log(error);
                }
            })).then(()=>{
                dispatch(userSlice.actions.addModels(snapShot))
            })
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    return (
        <Box display="flex" flexDirection="column" sx={{ width: '100%' }} >
            <Box bgcolor="white" paddingTop={1} sx={{ width: '100%' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    indicatorColor="primary"
                >
                    <Tab value="one" label="Your Models" />
                    <Tab value="two" label="Requests" />
                </Tabs>
            </Box>

            {/* Your Model Section */}
            {(tabValue == 'one') ? (
                <Box padding={2} >
                    <Box component="div" display="flex" justifyContent="space-between" paddingX={1.5} paddingBottom={2.5} >
                        <Typography component="span" gutterBottom variant="h6">Your Models</Typography>
                        {/* <Typography component="span" gutterBottom> */}
                        <Link href="/marketPlace" >Find More</Link>
                        {/* </Typography> */}
                    </Box>
                    <Grid container rowSpacing={4} marginBottom={2}
                        columnSpacing={{ xs: 1, md: 2 }} >
                    {state?.modelDetail?.map((details,index)=>{
                        return <Grid key={index} item xs={12} md={6}>
                            <Box display="flex" flexDirection="column"
                                bgcolor="white" paddingX={4} paddingY={2}>
                                <Typography variant="h5" gutterBottom >
                                    <b>{details.title}</b>
                                </Typography>
                                <Typography>
                                    {details.description}
                                </Typography>
                                <Box height={12} ></Box>
                                <Button>Start</Button>
                            </Box>
                        </Grid>
                    })}
                    </Grid>
                </Box>
            ) : (
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
                                <Button>Cancel Request</Button>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box component="div" display="flex" justifyContent="space-between" paddingX={1.5} >
                        <Typography component="span" variant="h6" gutterBottom>Make New Request</Typography>
                    </Box>
                    <Box minHeight={420} bgcolor="white" paddingY={4} paddingX={2} >
                        <form>
                            <fieldset>
                                <legend>
                                    <Typography component="div">Make New Request</Typography>
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
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: "flex" }}>
                                            <Typography width={120}>Description:</Typography>
                                            <textarea className="requestInput" rows="5" cols="60" name="description" />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </fieldset>
                            <Box marginY={5} display="flex" justifyContent="center" >
                                <Button variant="contained" >
                                    <Typography width={170}>
                                        Make Request
                                    </Typography>
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default function ProfilePageForDoctor() {
    const imgRadius = 250;
    const theme = useTheme();
    const isMob = useMediaQuery(theme.breakpoints.down("md"));
    const state = useSelector((state=>{
        return state.userSlice
    }))
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
                                <b>Requests Made:</b> 23
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <b> Name:</b> {state.name}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <b> Email:</b> {state.email}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <b> Contact Number:</b> {state.contactNumber}
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
