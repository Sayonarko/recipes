import React from "react"
import { Box, Button, styled } from "@material-ui/core"
import { Link, useLocation } from "react-router-dom"


function Menu() {
    const location = useLocation()
    const btn = [
            {
                name: "Главная",
                href: "/"

            },
            {
                name: "Популярное",
                href: "/popular"
            },
            {
                name: "О нас",
                href: "/about"
            }
        ]

    return (
        <Box component="nav"
            display={{ xs: "none", sm: "block" }}
            height="100%"
            flexGrow="1"
            marginLeft={{ sm: 4, md: 10 }}>

            <Box component="ul"
                display="flex"
                height="100%"
                pl={0}
                m={0}>

                {btn.map(({ name, href }) => {

                    return (
                        <Box
                            component="li"
                            display="flex"
                            pl={2}
                            pr={2}
                            ml={{ md: 5 }}
                            key={name}>

                            <MenuItem
                                isactive={ location.pathname === href ? true : false}
                                to={href}>
                                {name}
                            </MenuItem>
                        </Box>
                    );
                })}
                <AddPostLink to="/add-new-post">
                    <AddPostButton isactive={location.pathname === "/add-new-post" ? true : false}>добавить пост</AddPostButton>
                </AddPostLink>
            </Box>
        </Box>
    );
}
export default Menu


const MenuItem = styled(Link)((props) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: props.isactive ? props.theme.palette.info.main : "#666666",
    textTransform: "uppercase",
    fontWeight: "bold",
    transition: "color 0.3s ease",

    "&:hover": {
        color: props.theme.palette.info.main,
    },

    "&:after": {
        position: "absolute",
        left: "50%",
        bottom: 0,
        backgroundColor: props.theme.palette.info.main,
        display: "block",
        content: '""',
        height: 3,
        width: props.isactive ? "100%" : "0%",
        transform: "translateX(-50%)",
        transition: "width 0.3s ease-in-out",
    },


}))
    ;

const AddPostLink = styled(Link)({
    margin: "auto 0px auto 50px",
    textDecoration: "none"
})



const AddPostButton = styled(Button)( props => ({
    borderColor: props.isactive ? props.theme.palette.warning.main : "#666666",
    color: props.isactive ? props.theme.palette.warning.main : "#666666",
    padding: 5,
    fontSize: 16
}))