import {
    ThemeProvider, Typography,
    Box, Grid, Button,
    useTheme, useMediaQuery, Snackbar, Alert,
} from "@mui/material";
import "./modelDetail.css";
import customeTheme from "../../core/theme/themeProvider";
import Navbar from "../../core/components/navbar/navbar";
import modelImg from "../../core/assets/images/model.png";
import { useNavigate, useLocation } from "react-router-dom";
import { updateDoc, collection, doc, arrayUnion, where, limit, getDocs, query } from "firebase/firestore"
import { db } from "../../firebase";
import { useState } from "react";

const ShowDetail = ({ data }) => {

    let [severity, setSeverity] = useState("info")
    let [open, setOpen] = useState(false)
    let [message, setMessage] = useState("")
    let [autoHideDuration, setAutoHideDuration] = useState(2000)
    let navigate = useNavigate()
    let addModel = () => {
        setOpen(true)
        setAutoHideDuration(20000)
        setMessage("Wait the model is being added")
        setSeverity("info")
        getDocs(query(collection(db, "user"), where("email", "==", "abc@gmail.com"), limit(1))).then((datum) => {
            let dataShot = [];
            datum.forEach((d) => {
                dataShot.push(d.id)
                console.log(d.data())
            })
            let user = dataShot[0]
            console.log(user, "is the user id")
            console.log(data.id)
            updateDoc(doc(collection(db, "user"), user), {
                models: arrayUnion(data.id)
            }).then(() => {
                setOpen(true)
                setAutoHideDuration(2000)
                setSeverity("success")
                setMessage("successfully added ")
                setTimeout(() => {
                    navigate('/profile')
                }, 1500)
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
            setOpen(true)
            setAutoHideDuration(2000)
            setSeverity('warning')
            setMessage("some server error might have occured")
        })
        // How do we append the array in firestore from react
    }
    return (
        <>
            <Box display="flex" justifyContent="start" paddingRight={5}
                alignItems="start" flexDirection="column" className="rightBox" >
                <Typography variant="h3" textAlign="center" marginY={1.5}>{data.title}</Typography>
                <Typography variant="h5" textAlign="center" gutterBottom>Model Info</Typography>
                <Typography variant="h6" color="GrayText" gutterBottom>
                    {data.description}
                </Typography>
                {/* <Typography color="yellowgreen" variant="h5" marginY={2}>Free Model</Typography> */}
                <Grid container rowSpacing={2} marginX={5} marginBottom={2}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={12} md={6} display="flex" justifyContent="center" >
                        <Button fullWidth variant="contained" href="/detectEyeDisease" >Try it</Button>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center" >
                        <Button fullWidth variant="contained" onClick={(event) => {
                            addModel()
                        }} >Add to your list</Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar open={open} onClose={() => {
                setOpen(false)
                setMessage("")
                setSeverity("info")
                setAutoHideDuration(2000)
            }} autoHideDuration={autoHideDuration}>
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
        </>
    );
};

export default function ModelDetailPage() {
    const theme = useTheme();
    const isMob = useMediaQuery(theme.breakpoints.down("md"));
    let state = useLocation().state
    return (
        <>
            <ThemeProvider theme={customeTheme}>
                <Navbar />
                <Box marginX={5} marginY={8} >
                    <Grid container rowSpacing={2} marginX={5} marginBottom={2}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={12} md={6} display="flex" justifyContent="center" >
                            {isMob ?
                                <>
                                    <img src={modelImg} alt="model" width={350} />
                                </> :
                                <>
                                    <img src={modelImg} alt="model" width={520} />
                                </>
                            }
                        </Grid>
                        <Grid item xs={12} md={6} display="flex" justifyContent="center" >
                            <ShowDetail data={state} />
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        </>
    );
};
