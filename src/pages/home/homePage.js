import {
    ThemeProvider, Typography, useTheme, useMediaQuery,
    Box, Grid, Button,
} from "@mui/material";
import './home.css';
import customeTheme from "../../core/theme/themeProvider";
import Navbar from "../../core/components/navbar/navbar";
import modelImg from "../../core/assets/images/model.png";

const Item = () => {
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
                <img src={modelImg} alt="model" width="400" />
                <Typography marginY={1.5}>Eye Disease Detection</Typography>
                <Button fullWidth href="/modelDetailPage" >Explore</Button>
            </Box>
        </>
    );
};

export default function HomePage() {
    var position = "start";
    const theme = useTheme();
    const isMob = useMediaQuery(theme.breakpoints.down("md"));

    if (isMob) {
        position = "center";
    }

    return (
        <>
            <ThemeProvider theme={customeTheme}>
                <Navbar />

                <Typography variant="h3" marginTop={2} textAlign="center" >Play With Free Model</Typography>

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
                                <label for="sort">
                                    <Typography variant="h6" component="span" marginRight={2} >
                                        Sort By :
                                    </Typography>
                                </label>
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
                        <Grid item xs={12} md={4}>
                            <Item>1</Item>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Item>2</Item>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Item>3</Item>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Item>4</Item>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        </>
    );
};
