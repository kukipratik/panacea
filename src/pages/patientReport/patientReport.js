import { ThemeProvider, Grid, Box, Typography, List, ListItem } from "@mui/material";
import "./patientReport.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from '@mui/icons-material/Close';
import customeTheme from "../../core/theme/themeProvider";
import Navbar from "../../core/components/navbar/navbar";
import profile from "../../core/images/patientReport/profile.png";
import { useLocation} from "react-router-dom";
// import Popup from "reactjs-popup";
// import { ApprovedPopup } from "./approvedPopup";
import { HourglassBottom } from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';
// import { useAuth } from '../../core/customHooks/useAuth';
import { useEffect } from 'react';
import { patientSlice } from '../../core/state/patientSlice';


export default function PatientReport() {
  let data = useLocation().state;
  console.log(data)
  // let user = useAuth();
  const disease = ["Cataract","Diabetis","Glaucoma","Normal","Others"]
  // let loggedUser = useSelector((s) => {
  //   return s.user
  // })
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(patientSlice.actions.updatePatientData(data))
  },[dispatch,data])
  let state = useSelector((state)=>{
    return state.patientSlice;
  })

  // console.log(disease[parseInt(state.leftEyeResult?.prediction)])
  return (
    <>
      <ThemeProvider theme={customeTheme}>
        <Navbar />
        <Box
          bgcolor="white"
          borderRadius={5}
          padding={5}
          minHeight={450}
          marginX={1.5}
          marginY={3}
        >
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography minWidth={200}>Name: {state?.name}</Typography>
              {/* <Typography minWidth={200}>Gender: {state?.gender}</Typography>
              <Typography minWidth={200}>
                DOB: {state?.DOB?.toString()}
              </Typography>
              <Typography minWidth={200}>
                Phone No.: {state?.contactNumber}
              </Typography> */}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {/* <img
                className="reportImages"
                src={state.patientPhoto || profile}
                alt={"profile"}
                loading="lazy"
              /> */}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography> Left Eye</Typography>
              <img
                className="reportImages"
                src={state?.leftEyePhoto}
                alt={"eyeImage"}
                loading="lazy"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography> Right Eye</Typography>
              <img
                className="reportImages"
                src={state?.rightEyePhoto}
                alt={"eyeImage"}
                loading="lazy"
              />
            </Grid>
          </Grid>

          {/* <fieldset className="addtionalInfoBox">
            <legend>
              <Typography component="div">Additional Info</Typography>
            </legend>
            Box minHeight={230} padding={2} className="questionSection">
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {state.questions.map((q, i) => {
                  return (
                    <Grid
                      key={i}
                      item
                      xs={12}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Typography variant="h6">{`Q) ${q.question}`}</Typography>
                      <Typography>{`=> ${q.answer}`}</Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box> 
          </fieldset> */}

          <fieldset className="a-eyeResult">
            <legend>
              <Typography component="div">a-eye.ai Result</Typography>
            </legend>
            <Box minHeight={150} padding={2} className="aiResultBox">
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="h6" minWidth={200} gutterBottom>
                    Right Eye
                  </Typography>
                  <Typography minWidth={200} gutterBottom>
                    Disease : {disease[parseInt(state?.rightEyeResult?.prediction[1])]}
                  </Typography>
                  <Typography minWidth={200} gutterBottom>
                    Risk : {parseFloat(state?.rightEyeResult?.percentage).toFixed(4)*100}%
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="h6" minWidth={200} gutterBottom>
                    Left Eye
                  </Typography>
                  <Typography minWidth={200} gutterBottom>
                    Disease : {disease[parseInt(state?.leftEyeResult?.prediction)]}
                  </Typography>
                  <Typography minWidth={200} gutterBottom>
                    Risk : {parseFloat(state?.leftEyeResult?.percentage).toFixed(4)*100}%
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </fieldset>
          {/* {state.comment?<fieldset className="a-eyeResult">
            <legend>
              <Typography component="div">Doctor's comment</Typography>
            </legend>
            <Box minHeight={150} padding={2} className="aiResultBox">
              <List>
                {state.comment.split('\n').map((a)=>{
                    return <ListItem>{a}</ListItem>
                })}
              </List>
            </Box>
          </fieldset>:""} */}

          {/* show this if doctor has approved result to be true */}
          {/* <Box display="flex" justifyContent="center" marginTop={5}>
            {state.approval === 1?<CheckCircleIcon />:(state.approved=== -1) ?<CloseIcon/>:<HourglassBottom/>}
            <Box width={8}></Box>
            <Typography> {state.approval === 1?"Approved By":(state.approval=== -1) ?"Rejected by":"Waiting for"} Doctor</Typography>
          </Box> */}

          {/* show this if doctor hasn't approved or discarded result */}
          {/* {loggedUser.profession ==="doctor"?<>
          <Box display="flex" justifyContent="center" marginTop={5}>
            <Popup
              modal
              trigger={
                <button type="button" id="approve">
                  <Typography color="white">Approve</Typography>
                </button>
              }
            >
              {(close) => {
                return <ApprovedPopup close={close} approval={true}/>;
              }}
            </Popup>
            <Box width={20}></Box>
            <Popup
              modal
              trigger={
                <button type="button" id="discard">
                  <Typography color="white">Discard</Typography>
                </button>
              }
            >
              {(close) => {
                return <ApprovedPopup close={close} approval={false}/>;
              }}
            </Popup>
          </Box>
          </>:""} */}
        </Box>
      </ThemeProvider>
    </>
  );
}
