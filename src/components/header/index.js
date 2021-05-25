import React from "react"
import Menu from "../menu"
import logo from "../../img/logo.png"
import {Box} from "@material-ui/core"
import SearchPanel from "../search-panel"
import BurgerMenu from "../burger-menu"

export default function Header() {

    return (
        <Box component="header">
            <Box display="flex"
                        position="relative"
                        maxWidth="1720px"
                        width="100%"
                        margin="0 auto"
                        boxSizing="border-box"
                        padding={{xs: "0 15px", sm: "0 20px"}}
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
                <SearchPanel />
            </Box>
        </Box>
    )
}