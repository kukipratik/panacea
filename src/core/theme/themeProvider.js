import { createTheme } from "@mui/material";

const customeTheme = createTheme({
    palette: {
        primary: {
            // light: '#9b85ff',
            main: '#9b85ff',
            // dark: '#6d52e5',
            // contrastText: '#000000',
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'contained' },
                    style: {
                        backgroundColor: "#7B51F9",
                        color: "#ffffff",
                        '&:hover': {
                            backgroundColor: '#6F3EFD',
                            color: 'white',
                        }
                    },

                },
                {
                    props: { variant: 'text' },
                    style: {
                        backgroundColor: "inherit",
                        color: "#000000",
                        '&:hover': {
                            backgroundColor: '#6F3EFD',
                            color: 'white',
                        }
                    },

                },
            ]
        }
    }
});

export default customeTheme;