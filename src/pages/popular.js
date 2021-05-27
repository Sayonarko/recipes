import { Box, Typography, Grid, Button } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import Container from "../components/UI/container"
import RecipesCard from "../components/card"
import Sidebar from "../components/sidebar"
import CircularProgress from "../components/UI/circular-progress"
import { API, API_ROUTER } from "../api/api"

export default function TopPage() {
    const [cards, setCards] = useState([])
    const [requestSucess, setRequestSucess] = useState(false)
    const [moreCards, setMoreCards] = useState(12)


    useEffect(() => {

        const params = {
            limit: moreCards,
            sort: "views"
        }
        API({ ...API_ROUTER.getPosts, params })
            .then(res => {
                setCards(res.data)
                setRequestSucess(true)
            })
            .catch(err => console.log(err))
    }, [moreCards])

    function RenderPopularPage() {

        return (
            <>
                <Grid container spacing={6}>
                    {
                        cards.map((item, id) => id < moreCards && <RecipesCard {...item} id={id} key={item._id} />)
                    }
                </Grid>
                <Box
                    mt={{ xs: 5, sm: 10 }}
                    textAlign="center">
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
            <Container
                display="flex"
                flexDirection="column"
                justifyContent="center"
                minHeight="400px"
                pt={{ xs: 5, sm: 10 }}
                pb={{ xs: 5, sm: 10 }}>
                <Typography variant="h1" align="left" gutterBottom>Популярное на Recipes</Typography>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={8} lg={9}>
                        {requestSucess ? <RenderPopularPage /> : <CircularProgress />}
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Sidebar />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}