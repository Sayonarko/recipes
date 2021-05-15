import { makeStyles, Box, CircularProgress as MuiCircularProgress } from "@material-ui/core";
import React from "react";



const useStyles = makeStyles(theme => ({
    root: {
        height: "400px",
        maxHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
        width: "100%",

        "@media (max-width: 767px)": {
            marginTop: 25,
            marginBottom: 25,
        }
    }
}))

export default function CircularProgress() {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <MuiCircularProgress size="75px"/>
        </Box>
    )
}