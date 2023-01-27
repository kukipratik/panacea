import {
    Alert,
    Button,
    ThemeProvider, Typography,
} from "@mui/material";
import "./findReport.css"
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import customeTheme from "../../core/theme/themeProvider"
import Navbar from "../../core/components/navbar/navbar";
import { Box } from "@mui/system";
import {useState} from "react";
import { getDocs } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from "../../firebase";
import { where } from 'firebase/firestore';
import { limit } from 'firebase/firestore';
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from 'react-router-dom';

export default function FindReport() {
    let [name,setName] = useState("");
    let [error,setError]=useState("")
    let [open,setOpen] = useState(false);
    let [message,setMessage]= useState("");
    let [phoneNumber,setPhoneNumber] = useState("");
    let navigate = useNavigate();
    let searchHandler = async ()=>{
        if(name === ""){
            setError("name cannot be empty");
            return ;
        }
        console.log(phoneNumber.length)
        if(phoneNumber.length !== 10){
            setError("phone number should be of 10 digits")
            return;
        }
        setError("")
        let q = query(collection(db,"Patients"),where("name","==",name),where("contactNumber","==",phoneNumber),limit(1))
        try{
            let snapShot = await getDocs(q);
            let dataShot = [] ;
            snapShot.forEach((s)=>{
                let data = s.data()
                data.id = s.id;
                dataShot.push(data);
            })
            console.log(dataShot)
            if(dataShot.length===0){
                setOpen(true);
                setMessage("No report with given name and phone number")
            }else{
                setMessage("Directing to the next page")
                setOpen(true);
                setTimeout(()=>{
                    navigate('/patientReport',{
                        state:dataShot[0]
                    })
                },2000)
            }
        }catch(error){
            setOpen(true);
            setMessage(error.message)
        }
    }
    return (
        <>
            <ThemeProvider theme={customeTheme}>
                <Navbar />

                <Box minHeight={500} display="flex"
                    alignItems="center" justifyContent="center" >
                    <Box component="form" paddingX={8} paddingY={5} >
                        <Typography variant="h3" textAlign="center" gutterBottom >
                            Search Your Report
                        </Typography>
                        <Box component="div" className="form-control" marginY={2}>
                            <input type="text" placeholder="Your Name" value={name} onChange={(event)=>{setName(event.target.value)}}/>
                            <i><AccountCircleIcon fontSize="medium" /></i>
                        </Box>
                        <Box component="div" className="form-control" marginBottom={3}>
                            <input type="text" placeholder="Phone Number"  value={phoneNumber} onChange={(event)=>{setPhoneNumber(event.target.value)}} />
                            <i><PhoneIcon fontSize="medium" /></i>
                        </Box>
                        <Box display="flex" justifyContent="start" >{error===""?"":<><Typography fontWeight="bold" color="red">ERROR : </Typography><Typography color="red">{error}</Typography></>}</Box>
                            <Button fullWidth size="large" onClick={searchHandler}>
                                <Typography variant="h6" color="white" > Search </Typography>
                            </Button>
                    </Box>
                    <Snackbar open={open} message={message} autoHideDuration={1000} onClose={()=>{
                        setOpen(false)
                        setMessage("")
                    }}>
                        <Alert severity="info">
                            {message}
                        </Alert>
                    </Snackbar>
                </Box>

            </ThemeProvider>
        </>
    );
};