import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Inter from "@fontsource/inter/700.css";

const navbarTheme = createTheme({
    palette: {
        primary: {
            main: '#9da4e8',
        },
    },
    typography: {
        fontFamily: 'Inter',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-display: swap;
              src: local('Inter'), local('Inter'), url(${Inter}) format('woff2');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
    },
});

function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={navbarTheme}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            AchieveIt
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>

                </AppBar>
            </ThemeProvider>
        </Box>
    );
}

export default Navbar;