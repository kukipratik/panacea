import {
    ThemeProvider, Typography,
    Box, Grid, Button, Paper, Snackbar, Alert,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import "./detect.css";
import customeTheme from "../../core/theme/themeProvider";
import Navbar from "../../core/components/navbar/navbar";
import { useSelector, useDispatch } from 'react-redux';
import { patientSlice } from "../../core/state/patientSlice";
import { useState } from 'react'
import { v4 } from 'uuid'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { storage, db } from '../../firebase'
import { useLocation, useNavigate } from "react-router-dom";

export default function DetectEyeDisease() {

    // const theme = useTheme();
    // const isMob = useMediaQuery(theme.breakpoints.down("md"));
    let navigate = useNavigate()
    let data = useLocation().state.data
    let imageField = []
    let textField = []
    let numberField = []
    data.input.forEach((d) => {
        if (d.value.includes("image")) {
            imageField.push({
                field: d.field,
                ext: `.${d.value.split('/')[1]}`
            })
        } else if (d.value.includes("text")) {
            textField.push(d.field)
        } else {
            numberField.push(d.field)
        }
    })
    console.log(imageField, textField, numberField)
    let state = useSelector((state) => {
        return state.patientSlice
    })
    let [error, setError] = useState("")
    let [open, setOpen] = useState(false)
    let [message, setMessage] = useState("")
    let [severity, setSeverity] = useState("info")
    let dispatch = useDispatch()
    let checkError = () => {
        if (state.contactNumber === "") {
            setError("patient id is missing")
            return false
        }
        if (state.name === "") {
            setError("patient name is missing")
            return false
        }
        if(state.inputField.length !== imageField.length){
            setError("all image have not been uploaded")
        }
        return true
    }
    let storeImage = async (image) => {
        console.log(image, "is the image url")
        const imageRef = ref(storage, `images/${Date.now()}${v4()}`);
        image = await fetch(image).then(r => r.blob())
        console.log(image)
        await uploadBytes(imageRef, image).then(() => {
            console.log("Image uploaded");
        }).catch((error) => {
            console.log(error)
        })

        let x = await getDownloadURL(imageRef);
        console.log(x, "is the url");
        return x;
    }
    let generateResult = async (EyePhoto) => {
        let bodyContent = new FormData();
        console.log(EyePhoto)
        let image = await fetch(EyePhoto).then(r => r.blob())
        bodyContent.append("files[]", image);
        let response = await fetch("http://127.0.0.01:5000/predict", {
            method: "POST",
            body: bodyContent
        })
        response = await response.json();
        return response
    }
    async function storeUserData(image,result) {
        console.log(Object.keys(state.inputField))
        console.log({
            name: state.name,
            contactNumber:state.contactNumber,
            image:image,
            field:Object.keys(state.inputField),
            result:result
        })
        await addDoc(collection(db, "Patients"), {
            name: state.name,
            contactNumber:state.contactNumber,
            image:image,
            field:[...Object.keys(state.inputField)],
            result:result
        }).catch((error) => {
            console.log(error)
        });
    }
    const submitHandler = async () => {
        if (checkError()) {
            setOpen(true)
            setMessage("Please wait");
            setSeverity("success");
            try {
                let storeImg=[]
                let generateRes=[]
                if(state.inputField){
                    await Promise.all(Object.values(state.inputField).map(async (val)=>{
                        let x= await storeImage(val)
                        let resultX= await generateResult(val)
                        storeImg.push(x)
                        generateRes.push(resultX)
                    }))
                }
                // let y = await storeImage(state.leftEyePhoto);
                // let z = await storeImage(state.rightEyePhoto);
                // let leftEyeResult = await generateResult(state.leftEyePhoto);
                // let rightEyeResult = await generateResult(state.rightEyePhoto);
                // await storeUserData(y, z, leftEyeResult, rightEyeResult);
                await storeUserData(storeImg,generateRes);
                setOpen(true)
                setMessage("Success ! going to find ResultPage");
                setSeverity("success");
                setTimeout(() => {
                    navigate('/patientReport', {
                        state: {
                            name: state.name,
                            patientId: state.contactNumber,
                            field:Object.keys(state.inputField),
                            result:generateRes,
                            image:storeImg,
                            approval: 0
                        }
                    })
                }, 1000)
            }
            catch (err) {
                console.log(err)
                setOpen(true);
                setMessage("Some error occured")
                setSeverity("error")
            }
        }
    }
    return (
        <>
            <ThemeProvider theme={customeTheme}>
                <Navbar />

                <Box marginY={3}>
                    <form>
                        <fieldset>
                            <legend>
                                <Typography component="div">Patient Details</Typography>
                            </legend>

                            <Box className="newSection" minHeight={200}
                                paddingY={5} paddingX={4}>
                                <Grid
                                    container
                                    rowSpacing={8}
                                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                >
                                    <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                                        <Typography width={90}>Full Name:</Typography>
                                        <input
                                            type="text"
                                            className="inputField"
                                            value={state.name}
                                            onChange={(event) => {
                                                dispatch(patientSlice.actions.updatePatientData({
                                                    name: event.target.value
                                                }))
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                                        <Typography width={90}>Contact Number :</Typography>
                                        <input
                                            type="text"
                                            className="inputField"
                                            value={state.contactNumber}
                                            onChange={(event) => {
                                                dispatch(patientSlice.actions.updatePatientData({
                                                    contactNumber: event.target.value
                                                }))
                                            }}
                                        />
                                    </Grid>
                                    {imageField.map((image) => {
                                        return <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography marginBottom={1}>Left Eye:</Typography>
                                            <Box
                                                border="solid"
                                                borderColor="gray"
                                                marginRight={2}
                                                marginBottom={1}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexDirection: "column",
                                                }}
                                                borderRadius={2}
                                                width={280}
                                                height={171}
                                            >{state?.inputField?.[image.field]===undefined? <>
                                                <AddAPhotoIcon fontSize="large" />
                                                <Typography> Add Photo </Typography>
                                            </> : <img src={state?.inputField?.[image.field]} alt="patient" className="uploadImage" />}
                                            </Box>
                                            <Box component="label" display="flex" justifyContent="center">
                                                <Paper elevation={2} className="paperBtn">
                                                    <Typography color="white">Upload Image</Typography>
                                                </Paper>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    hidden
                                                    onChange={(event) => {
                                                        console.log("has there been some changes")
                                                        let url = window.URL.createObjectURL(event.target.files[0])
                                                        console.log(url);
                                                        dispatch(patientSlice.actions.updatePatientData({
                                                            inputField:{
                                                                ...state?.inputField,
                                                                [image.field]:url
                                                            }
                                                        }))
                                                    }}
                                                    accept=".jpg,.jpeg"
                                                />
                                            </Box>
                                        </Grid>
                                    })}
                                </Grid>
                            </Box>
                        </fieldset>
                        <Box marginY={5} display="flex" justifyContent="center" >
                            <Button variant="contained" onClick={submitHandler}>
                                <Typography width={100}>
                                    Submit
                                </Typography>
                            </Button>
                        </Box>
                        <Box>
                            {error}
                        </Box>
                    </form>
                </Box>
                <Snackbar open={open} autoHideDuration={3000}>
                    <Alert severity={severity}>{message}</Alert>
                </Snackbar>
            </ThemeProvider>
        </>
    );
};
