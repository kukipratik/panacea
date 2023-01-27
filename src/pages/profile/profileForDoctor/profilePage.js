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
import { getDocs, collection, query, where, limit, doc, getDoc } from "firebase/firestore"
import { db } from "../../../firebase"
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../../core/state/userSlice";

function BuildTabs() {
    const [tabValue, setTabValue] = useState('one');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const dispatch = useDispatch()

    let state = useSelector((state) => {
        return state.userSlice
    })

    useEffect(() => {
        let q = query(collection(db, "user"), where("email", "==", "abc@gmail.com"), limit(1))
        getDocs(q).then((data) => {
            let dataShot = [];
            data.forEach((d) => {
                let datum = d.data()
                datum.id = d.id
                dataShot.push(datum)
            })
            dispatch(userSlice.actions.signIn({
                ...dataShot[0]
            }));
            let snapShot = []
            Promise.all(dataShot[0].models.map(async (d) => {
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
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <Box display="flex" flexDirection="column" sx={{ width: '100%' }} >
            <Box bgcolor="white" paddingTop={1} sx={{ width: '100%' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    indicatorColor="primary"
                >
                    <Tab value="one" label="Patients Report" />
                    <Tab value="two" label="Use Models" />
                </Tabs>
            </Box>

            {/* Your Model Section */}
            {(tabValue == 'one') ? (
                <Box padding={2} >

                    <Grid container rowSpacing={4} marginBottom={2}
                        columnSpacing={{ xs: 1, md: 2 }} >
                        <Grid item xs={12} md={12} display="flex" justifyContent="center"
                            marginX={20} >
                            <label className="label" for="filter">
                                <Typography variant="h6" component="span" marginRight={2} >
                                    Filter :
                                </Typography>
                            </label>
                            <select id="filter" name="cars">
                                <option value="1">A-eye.ai</option>
                                <option value="2">Lungs Detection</option>
                            </select>
                        </Grid>
                    </Grid>

                    {/* show result table */}
                    <Box marginX={2}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    {/* <th>Age</th> */}
                                    <th>Disease (Left)</th>
                                    <th>Accuracy% (Left)</th>
                                    <th>Disease (Right)</th>
                                    <th>Accuracy% (Right)</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                {report.map((r,i)=>{
                  return   <tr key={i}>
                  <td data-label="Name"><Link to="/patientReport" state={r}> {r.name} </Link></td>
                  <td data-label="Disease">{disease[r?.leftEyeResult?.prediction]}</td>
                  <td data-label="Risk%">{parseFloat(r?.leftEyeResult?.percentage).toFixed(4)*100}%</td>
                  <td data-label="Disease">{disease[r?.rightEyeResult?.prediction]}</td>
                  <td data-label="Risk%">{parseFloat(r?.rightEyeResult?.percentage).toFixed(4)*100}%</td>
                  <td data-label="feedback">{r?.approval==-1?"Discarded":r?.approval==1?"Approved":"Waiting"}</td>
                </tr>
                })}
              </tbody> */}
                        </table>
                    </Box>
                </Box>
            ) : (
                <Box padding={2} >
                    <Box component="div" display="flex" justifyContent="space-between" paddingX={1.5} paddingBottom={2.5} >
                        <Typography component="span" gutterBottom variant="h6">Your Models</Typography>
                        {/* <Typography component="span" gutterBottom> */}
                        <Link href="/marketPlace" >Find More</Link>
                        {/* </Typography> */}
                    </Box>
                    <Grid container rowSpacing={4} marginBottom={2}
                        columnSpacing={{ xs: 1, md: 2 }} >
                        {state?.modelDetail?.map((details, index) => {
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
            )}
        </Box>
    );
}

export default function ProfilePageForDoctor() {
    const imgRadius = 250;
    const theme = useTheme();
    const isMob = useMediaQuery(theme.breakpoints.down("md"));
    const state = useSelector((state => {
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
