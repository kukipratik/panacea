import { useMediaQuery, useTheme } from "@mui/material";

import Logo from "../Logo"
import './navbar.css';
import MyDrawer from "./drawer";

export default function Navbar() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>{isMatch ? (
            <div className="container">
                < div className="navbar" >
                    <Logo />
                    <MyDrawer />
                </div>
            </div>
        ) : (
            <div className="container">
                < div className="navbar" >
                    <Logo width={85} />
                    <nav>
                        <ul>
                            <li><a href="/marketPlace">Market Place </a></li>
                            <li><a href="">Solutions</a></li>
                            <li><a href="">Blogs</a></li>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/profile">Profile</a></li>
                        </ul>
                    </nav>
                </div >
            </div>
        )}
        </>

    );
};
