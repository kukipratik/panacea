import {
    ThemeProvider, Typography, Box, Grid, Button,
    useTheme, useMediaQuery,
} from "@mui/material";
import customeTheme from "../../core/theme/themeProvider";
import Navbar from "../../core/components/navbar/navbar";
import modelImg from "../../core/assets/images/model.png";
import SearchBar from "../../core/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Item = ({data}) => {
    let navigate = useNavigate()
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
                <img src={modelImg} alt="mode" width="400" />
                <Typography marginY={1.5}>{data.title}</Typography>
                <Button fullWidth onClick={()=>{
                    navigate('/modelDetailPage',{
                        state:data
                    })
                }}>Add</Button>
            </Box>
        </>
    );
};

export default function MarketPlace() {
    var position = "start";
    const theme = useTheme();
    const isMob = useMediaQuery(theme.breakpoints.down("md"));
    if (isMob) {
        position = "center";
    }
    const [models,setModels]= useState([])
    console.log(models)
    useEffect(()=>{
        getDocs(collection(db,"model")).then((data)=>{
            let dataShot = []
            data.forEach((d)=>{
                let dataSnap = d.data();
                dataSnap.id = d.id
                dataShot.push(dataSnap)
            })
            setModels(dataShot)
        }).catch((error)=>{
            console.log("some error has occured")
        })
    },[setModels])
    return (
        <>
            <ThemeProvider theme={customeTheme}>
                <Navbar />

                <Box marginX={8}>
                    <Grid container rowSpacing={2} marginX={5} marginBottom={2}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={12} md={7.5} display="flex"
                            justifyContent="end" alignItems="center" >
                            <Typography variant="h3" marginTop={2} textAlign="center" >Market Place</Typography>
                        </Grid>
                        <Grid item xs={12} md={1} display="flex"
                            justifyContent="end" alignItems="center" >
                            <Box ></Box>
                        </Grid>
                        <Grid item xs={12} md={3}
                            display="flex" alignItems="center" >
                            <SearchBar placeholder={"Search Model"} />
                        </Grid>
                    </Grid>
                </Box>

                <Box marginX={8} marginY={4} >
                    {/* for filters */}
                    <Box marginX={5} marginBottom={2} >
                        <Grid container rowSpacing={2} marginX={5} marginBottom={2}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={12} md={6} display="flex" justifyContent={position} >
                                <Typography variant="h6" >Health</Typography>
                            </Grid>
                            <Grid item xs={12} md={6} display="flex" justifyContent="end" >
                                {/* <Box> */}
                                <label for="sort"><Typography variant="h6" component="span" marginRight={2} >
                                    Sort By :
                                </Typography></label>
                                <select id="sort" name="cars">
                                    <option value="volvo">New</option>
                                    <option value="saab">Saab</option>
                                    <option value="fiat">Fiat</option>
                                </select>
                                {/* </Box> */}
                            </Grid>
                        </Grid>

                    </Box>


                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {models.map((model,index)=>{
                            return <Grid key={index} item xs={12} md={4}>
                                    <Item data={model}>some</Item>
                                </Grid>
                        })}
                    </Grid>
                </Box>
            </ThemeProvider>
        </>
    );
};
