import React from "react";
import Menu from "../menu";
import logo from "../../img/logo.png";
import {Box} from "@material-ui/core"
import Container from "../UI/container";
import BurgerMenu from "../burger-menu";

export default function Header() {

    return (
        <Box component="header">
            <Container display="flex"
                        alignItems="center"
                        height={{xs: "70px", sm: "90px"}}>
                <Box component="a"
                     href="/"
                     display="flex"
                     alignItems="center"
                     justifyContent="center"
                     width={{xs: "120px", sm: "150px"}}>
                    <img src={logo}
                         alt="recipes"
                         style={{maxWidth: "100%"}} />
                </Box>
                <Menu />
                <BurgerMenu />
            </Container>
        </Box>
    )
}