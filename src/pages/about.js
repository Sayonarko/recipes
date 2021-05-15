import { Box, Typography, Grid } from "@material-ui/core"
import React from "react"
import Container from "../components/UI/container"
import Sidebar from "../components/sidebar";

export default function AboutPage() {

    return (
        <Box component="section">
            <Container
                minHeight={{ xs: "calc(100vh - 150px)", md: "calc(100vh - 180px)" }}
                pt={{ xs: 5, sm: 10 }}
                pb={{ xs: 5, sm: 10 }}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Box
                            pl={{ xs: 0, lg: 46 }}
                            pr={{ xs: 0, lg: 20 }}>
                            <Typography variant="h1" gutterBottom>О нас</Typography>
                            <Typography variant="body1" paragraph align="justify">
                                Recipes - это блог, в котором, люди делятся своими вкусами и знаниями о пище. С 2015 года наш маленький, атмосферный блог стал домом для широкого круга любителей вкусно поесть.
                        </Typography>
                            <Typography variant="body1" paragraph align="justify">
                                Здесь Вы найдете, помимо рецептов, много статей о разнообразности кухни разных стран, интересные факты о продуктах и прочее.
                        </Typography>
                            <Typography variant="body1" align="justify">
                                Не знаете что приготовить на ужин? Как удивить свою половинку? Не знаете как украсить торт? В Recipes Вы найдете более 35 тысяч постов с интересными рецептами, советами, фактами о еде.
                        </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Sidebar />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}