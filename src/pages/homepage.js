import { Grid, Box, Button } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import RecipesCard from "../components/card"
import Sidebar from "../components/sidebar"
import Slider from "../components/slider"
import Container from "../components/UI/container"
import CircularProgress from "../components/UI/circular-progress"
import { API, API_ROUTER } from "../api/api"


export default function Homepage() {
    const [cards, setCards] = useState([])
    const [requestSucess, setRequestSucess] = useState(false)
    const [moreCards, setMoreCards] = useState(12)

    useEffect(() => {
        const params = {
            limit: 12,
            sort: "date"
        }
        API({ ...API_ROUTER.getPosts, params })
            .then(res => {
                setCards(res.data)
                setRequestSucess(true)
            })
            .catch(err => console.log(err))
    }, [])

    function RenderHomepage() {

        return (
            <>
                <Grid container spacing={6}>
                    {
                        cards.map((item, id) => id < moreCards && <RecipesCard {...item} id={id} key={item._id} />)
                    }
                </Grid>
                <Box
                    mt={{ xs: 5, sm: 6, md: 10 }}
                    textAlign="center"
                    style={{ display: cards.length <= moreCards ? "none" : "block" }}>
                    <Button
                        size="large"
                        onClick={() => setMoreCards(prev => prev + 12)} >
                        показать больше
                </Button>
                </Box>
            </>
        )
    }

    return (
        <Box component="section">
            <Slider />
            <Container
                display="flex"
                flexDirection="column"
                justifyContent="center"
                minHeight="400px"
                pt={{ xs: 5, sm: 10 }}
                pb={{ xs: 5, sm: 10 }}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={8} lg={9}>
                        {requestSucess ? <RenderHomepage /> : <CircularProgress />}
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Sidebar />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

