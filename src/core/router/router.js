import { createBrowserRouter, Outlet } from "react-router-dom";
import DetectEyeDisease from "../../pages/detectEyeDisease/detectEyeDisease";
import ErrorPage from "../../pages/errorPage";
import HomePage from "../../pages/home/homePage";
import MarketPlace from "../../pages/marketPlace/marketPlace";
import ModelDetailPage from "../../pages/modelDetail/modelDetailPage";
import ProfilePageForEng from "../../pages/profile/profileForEngineer/profilePage";
import ProfilePage from "../../pages/profile/profilePage";
import PatientReport from '../../pages/patientReport/patientReport'
import SignIn from "../../pages/login/login";

const router = createBrowserRouter([
  //for Home page
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  //for MarketPlace page
  {
    path:"/login",
    element:<SignIn/>,
    errorElement:<ErrorPage/>
  },
  {
    path: "/marketPlace",
    element: <MarketPlace />,
    errorElement: <ErrorPage />,
  },
  //for ModelDetail page
  {
    path: "/modelDetailPage",
    element: <ModelDetailPage />,
    errorElement: <ErrorPage />,
  },
  //for Detect eye disease page
  {
    path: "/detectEyeDisease",
    element: <DetectEyeDisease />,
    errorElement: <ErrorPage />,
  },
  //for Profile page
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  //for Profile page for engineers
  {
    path: "/profileForEngineer",
    element: <ProfilePageForEng />,
    errorElement: <ErrorPage />,
  },
  {
    path:"/addPatient",
    element:<DetectEyeDisease/>,
    errorElement:<ErrorPage/>
  },
  {
    path: "/patientReport",
    element: <PatientReport />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
