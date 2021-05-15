import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import Container from "../UI/container";
import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from "@material-ui/icons";

export default function Footer(props) {
    return (
        <Box component="footer"
            borderTop="1px solid #bfbcbc"
        >
            <Container>
                <Grid container>
                    <Grid item
                        sm={6}
                        xs={12}
                        className="share">

                        <Box display="flex"
                            alignItems="center"
                            justifyContent={{ xs: "center", sm: "flex-start" }}
                            pt={{ xs: 3, sm: 5 }}
                            pb={{ xs: 3, sm: 5 }}>

                            <Typography variant="h2"
                                component="span">
                                Share
                            </Typography>
                            <Box component="a"
                                href="#"
                                ml={{ xs: 2, sm: 3 }}
                                display="flex"
                                alignItems="flex-end"
                                justifyContent="center"
                                color="secondary.main">
                                <Facebook />
                            </Box>
                            <Box component="a"
                                href="#"
                                ml={{ xs: 1, sm: 2 }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="secondary.main">
                                <Instagram />
                            </Box>
                            <Box component="a"
                                href="#"
                                ml={{ xs: 1, sm: 2 }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="secondary.main">
                                <LinkedIn />
                            </Box>
                            <Box component="a"
                                href="#"
                                ml={{ xs: 1, sm: 2 }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="secondary.main">
                                <Twitter />
                            </Box>
                            <Box component="a"
                                href="#"
                                ml={{ xs: 1, sm: 2 }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="secondary.main">
                                <YouTube />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item
                        sm={6}
                        xs={12}>
                        <Box display="flex"
                            alignItems="center"
                            justifyContent={{ xs: "center", sm: "flex-end" }}
                            height="100%">
                            <Typography variant="body1"
                                color="secondary">
                                © 2021 Sergeevna
                        </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
