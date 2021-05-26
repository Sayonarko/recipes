import { Grid, Box, Button, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Container from "../components/UI/container"
import { API, API_ROUTER } from "../api/api"
import RecipesCard from "../components/card"
import CircularProgress from "../components/UI/circular-progress"
import Sidebar from "../components/sidebar"
import { useLocation } from "react-router-dom"


export default function SearchResult(props) {
    const [cards, setCards] = useState([])
    const [requestSucess, setRequestSucess] = useState(false)
    const location = useLocation()

    console.log(props)
    useEffect(() => {
        window.scrollTo(0, 0)

        let params = {}

        if (location.pathname.includes("tags")) {
            params = {
                ...API_ROUTER.searchTags,
                url: API_ROUTER.searchTags.url + props.match.params.searchRequest
            }
        } else if (location.pathname.includes("date")) {
            params = {
                ...API_ROUTER.searchDate,
                url: API_ROUTER.searchDate.url + props.match.params.searchRequest
            }
        } else {
            params = {
                ...API_ROUTER.search,
                url: API_ROUTER.search.url + props.match.params.searchRequest
            }
        }

        API(params)
            .then(res => {
                setCards(res.data)
                setRequestSucess(true)
            })
            .catch(err => console.log(err))
    }, [props.match.params.searchRequest, location.pathname])

    function RenderSearchResult() {

        return (


            <Grid container spacing={6}>
                <Grid item xs={12} md={8} lg={9}>
                    <Grid container spacing={6}>
                        {
                            cards.map((item, id) => <RecipesCard {...item} small={true} id={id} key={item._id} />)
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Sidebar />
                </Grid>
            </Grid>
        )
    }

    return (
        <Box component="section">
            <Container
                minHeight={{ xs: "calc(100vh - 150px)", md: "calc(100vh - 180px)" }}
                pt={10}
                pb={10}>
                <Box mb={{ xs: "20px", sm: "30px" }}>
                    {requestSucess && !cards.length
                        ? <Typography variant="h1">По Вашему запросу <Typography variant="h1" component="span" style={{ color: "#e49253" }}>{props.match.params.searchRequest}</Typography> ничего не найдено</Typography>
                        : <Typography variant="h1">Результат поиска по запросу: <Typography variant="h1" component="span" style={{ color: "#e49253" }}>{props.match.params.searchRequest}</Typography></Typography>}
                </Box>
                {requestSucess ? <RenderSearchResult /> : <CircularProgress />}
            </Container>
        </Box>
    )
}