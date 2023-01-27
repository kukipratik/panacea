import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {
    useMediaQuery,
    useTheme,
} from '@mui/material';

export default function SearchBar({ placeholder }) {
    const paperStylePc = { p: '2px 4px', display: 'flex', alignItems: 'center', width: "500px" };
    const paperStyleMob = { p: '2px 4px', display: 'flex', alignItems: 'center', width: "300px" };
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const clickHandler = () => { };

    const Contents = () => {
        return (
            <>
                <InputBase
                    fullWidth
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={placeholder}
                    inputProps={{ 'aria-label': { placeholder } }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={clickHandler}>
                    <SearchIcon />
                </IconButton>
            </>
        );
    };

    return (<>
        {
            isMatch ? (
                <Paper
                    component="form"
                    sx={paperStyleMob}
                >
                    <Contents />
                </Paper>
            ) : (
                <Paper
                    component="form"
                    sx={paperStylePc}
                >
                    <Contents />
                </Paper>
            )
        }
    </>
    );
}