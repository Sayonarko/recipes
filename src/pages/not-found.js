import { Box, Typography, makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import React from "react"
import Container from "../components/UI/container"

export default function NotFoundPage(theme) {
    const classes = useStyles()
    return (
        <Box component="section">
            <Container
                minHeight={{ xs: "calc(100vh - 150px)", md: "calc(100vh - 180px)" }}
                pt={10}
                pb={10}>
                <Typography variant="h1" align="center" gutterBottom>Упс! Страница не найдена!</Typography>
                <Typography variant="h1" align="center" component={Link} to="/" className={classes.link}>Перейти на главную</Typography>

            </Container>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: "none",
        color: theme.palette.info.main,
        display: "block"
    }
}))