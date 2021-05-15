import React, { useState } from "react";
import { Box, Button, styled} from "@material-ui/core";
import { Link } from "react-router-dom";

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
        content: '""' ,
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



const AddPostButton = styled(Button)({
    borderColor: "#666666",
    color: "#666666",
    padding: 5,
    fontSize: 16
})

function Menu() {

    const localBtn = sessionStorage.getItem("btn");
    const [btn, setBtn] = useState(localBtn ? JSON.parse(localBtn) :
        [
            {
                id: 0,
                name: "Главная",
                active: true,
                href: "/"

            },
            {
                id: 1,
                name: "Популярное",
                active: false,
                href: "/popular"
            },
            {
                id: 3,
                name: "О нас",
                active: false,
                href: "/about"

            }
        ]
    );

    function changeActive(x) {
        let newBtn = [...btn];

        newBtn.forEach(item => {
            (item.id === x) ? item.active = true : item.active = false;
        });
        setBtn(newBtn);
        sessionStorage.setItem("btn", JSON.stringify(btn));
    }

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

                {btn.map(({ id, name, active, href }) => {

                    return (
                        <Box
                            component="li"
                            display="flex"
                            pl={2}
                            pr={2}
                            ml={{ md: 5 }}
                            key={id}>

                            <MenuItem
                                isactive={active ? 1 : 0}
                                to={href}
                                onClick={() => changeActive(id)}>
                                {name}
                            </MenuItem>
                        </Box>
                    );
                })}
                <AddPostLink to="/add-new-post">
                    <AddPostButton>добавить пост</AddPostButton>
                </AddPostLink>
            </Box>
        </Box>
    );
}
export default Menu