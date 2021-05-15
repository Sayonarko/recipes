import { Box, Typography } from "@material-ui/core"
import React from "react"
import Container from "../components/UI/container"

export default function SearchResult(props) {

    return (
        <Box component="section">
            <Container
                minHeight={{ xs: "calc(100vh - 150px)", md: "calc(100vh - 180px)" }}
                pt={10}
                pb={10}>
                <Typography variant="h1">Результат поиска по запросу: <Typography variant="h1" component="span" style={{color: "#03afcf"}}>{props.match.params.searchRequest}</Typography></Typography>
            </Container>
        </Box>
    )
}