import { Box, Typography, Grid, Button } from "@material-ui/core"
import React, {useState, useEffect} from "react"
import Container from "../components/UI/container"
import RecipesCard from "../components/card"
import Sidebar from "../components/sidebar"
import CircularProgress from "../components/UI/circular-progress"

export default function TopPage() {
    const [cards, setCards] = useState([])
    const [requestSucess, setRequestSucess] = useState(false)
    const [moreCards, setMoreCards] = useState(4)

    function sortCards(arr) {
        return arr.sort((a, b) => b.views - a.views)
    }

    useEffect(() => {
        async function fetchCards() {
            const response = await fetch("http://localhost:4000/posts")
            const json = await response.json()
            setCards(json)
            setRequestSucess(true)
        }
        fetchCards()
    }, [])

    function RenderHomepage() {

        return (


            <Grid container spacing={6}>
                <Grid item xs={12} md={8} lg={9}>
                    <Grid container spacing={6}>
                        {
                            sortCards(cards).map((item, id) => id < moreCards && <RecipesCard {...item} id={id} key={item._id} />)
                        }
                    </Grid>
                    <Box
                        mt={{ xs: 5, sm: 10 }}
                        textAlign="center"
                        style={{ display: cards.length <= moreCards ? "none" : "block" }}>
                        <Button
                            size="large"
                            onClick={() => setMoreCards(prev => prev + 4)} >
                            показать больше
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Sidebar data={cards} />
                </Grid>
            </Grid>
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
                {requestSucess ? <RenderHomepage /> : <CircularProgress />}
            </Container>
        </Box>
    )
}