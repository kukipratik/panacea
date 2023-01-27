import { Box } from "@mui/material";
import { ReactComponent as LogoSvg } from "../assets/svg/Logo.svg"

export default function Logo() {

    return (
        <a href="/" >
            <Box marginY={1} marginX={1} >
                <LogoSvg height="62" width="150" />
            </Box >
        </a>
    );
}
