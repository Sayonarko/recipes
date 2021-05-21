import { createMuiTheme } from "@material-ui/core/styles";

const globalTheme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            xm: 560,
            sm: 768,
            md: 992,
            lg: 1200,
            xl: 1440,
        },
    },
    palette: {
        //grey
        primary: {
            main: "#f5f5f5"
        },
        //dark-grey
        secondary: {
            main: "#bfbcbc"
        },
        //orange
        warning: {
            main: "#e49253"
        },
        //marine
        info: {
            main: "#03afcf"
        }
    },
});

export const theme = createMuiTheme({
    ...globalTheme,
    spacing: 5,
    typography: {
        fontFamily: [
            'Ubuntu',
            'sans-serif',
        ].join(','),
        fontSize: 16,

        h1: {
            fontSize: 42,
            [globalTheme.breakpoints.down('xs')]: {
                fontSize: 25,
            },
            fontWeight: 600,

        },
        h2: {
            fontSize: 26,
            [globalTheme.breakpoints.down('xs')]: {
                fontSize: 18,
            },
            fontWeight: 600
        },
        h3: {
            fontSize: 16,
            [globalTheme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
            fontWeight: 600
        },
        h4: {
            fontSize: 14,
            [globalTheme.breakpoints.down('xs')]: {
                fontSize: 10,
            },
            fontWeight: 600
        },
        body1: {
            fontSize: 16,
            [globalTheme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
            fontWeight: 400,
            fontFamily: [
                'Poppins',
                'sans-serif',
            ].join(','),
        },
        body2: {
            fontSize: 14,
            [globalTheme.breakpoints.down('xs')]: {
                fontSize: 12,
            },
            fontWeight: 400,
            fontFamily: [
                'Poppins',
                'sans-serif',
            ].join(','),
        },
        caption: {
            fontSize: 10,
            fontWeight: 400,
            color: globalTheme.palette.secondary.main,
        },
        button: {
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 1.5,
            lineHeight: "12px",

            [globalTheme.breakpoints.down('xs')]: {
                fontSize: 8,
                letterSpacing: 1.25,
                lineHeight: "10px"

            },
        },
        gutterBottom: {
            h1: {
                marginBottom: 30
            }
        }
    },
    overrides: {
        MuiTypography: {
            gutterBottom: {
                marginBottom: "0.7em",
            },
        },
        MuiButton: {

            text: {
                background: 'transparent',
                border: 2,
                borderColor: "black",
                borderStyle: "solid",
                borderRadius: 2,
                color: 'black',
                padding: '0px 30px',
                height: 30,
                fontSize: 12,
                letterSpacing: 2,
                fontWeight: 600,
        
                [globalTheme.breakpoints.down('xs')]: {
                    fontSize: 10,
                },

                "@media(max-width: 559px)": {
                    width: "100%"
                },

                "&:hover": {
                    borderColor: globalTheme.palette.warning.main,
                    color: globalTheme.palette.warning.main,
                    transition: "all 0.3s ease",
                    background: 'transparent',
                },
            },
            sizeLarge: {
                height: 55,
                fontSize: 16,
                padding: '0px 30px',

                [globalTheme.breakpoints.down('xs')]: {
                    height: 40,
                    fontSize: 12,
                },
            },
        },
        MuiLink: {
            root: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: globalTheme.palette.secondary.main,
                transition: "color 0.3s ease",
                '&:hover': {
                    color: globalTheme.palette.info.main,
                },
            },
            button: {
                fontSize: 16,
                fontFamily: [
                    'Poppins',
                    'sans-serif',
                ].join(','),
                "&:hover": {
                    textDecoration: "none",
                }
            }
        },

        MuiCardActions: {
            root: {
                padding: 20,
            }
        },

        MuiCardContent: {
            root: {
                padding: 20,
            }
        },

        MuiCircularProgress: {
            root: {
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
            },
            colorPrimary: {
                color: globalTheme.palette.secondary.main
            },
        },
        MuiInput: {
            root: {
                border: 2,
                borderColor: globalTheme.palette.secondary.main,
                borderStyle: "solid",
                borderRadius: 4,
                paddingLeft: 10,

                "&$focused": {
                    border: 2,
                    borderColor: globalTheme.palette.warning.main,
                    borderStyle: "solid",
                    borderRadius: 4,
                    paddingLeft: 10,
                    color: globalTheme.palette.warning.main,
                }
            },

        },
        MuiListItem: {
            root: {
                paddingTop: 5,
                paddingBottom: 5,

                [globalTheme.breakpoints.down('xs')]: {
                    fontSize: 14,
                },
            }
        },
        MuiAlert: {
            root: {
                alignItems: "center",
            }
        }
    },


},
);
export default theme;