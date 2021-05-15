import { Typography, Button, makeStyles, styled } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function BurgerMenu() {

    const classes = useStyles()
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
    const [open, setOpen] = useState(false);


    function changeActive(x) {
        let newBtn = [...btn];
        newBtn.forEach(item => {
            (item.id === x) ? item.active = true : item.active = false;
        });
        setBtn(newBtn);
        sessionStorage.setItem("btn", JSON.stringify(btn));
        setOpen(false);
    }

    useEffect(() => {
        const body = document.querySelector("body");
        open ? body.style.overflowY = "hidden" : body.style.overflowY = "";
    }, [open]);

    return (
        <div className={classes.root}>
            <button
                onClick={() => setOpen(!open)}
                className={classes.menuButton}>
                <div
                    className={classes.menuButtonLine}
                    style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }} />
                <div
                    className={classes.menuButtonLine}
                    style={{ transform: open ? "translateX(-20px)" : "translateX(0)", opacity: open ? "0" : "1" }} />
                <div
                    className={classes.menuButtonLine}
                    style={{ transform: open ? "rotate(-45deg)" : "rotate(0)" }} />
            </button>
            <nav
                style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
                className={classes.menu}>
                <ul style={{ padding: 0 }}>
                    {btn.map(({ id, name, active, href }) => {
                        return (
                            <li key={id}
                                className={classes.menuItem}>
                                <MenuItem
                                    isactive={active ? 1 : 0}
                                    to={href}
                                    onClick={() => changeActive(id)}>
                                    {name}
                                </MenuItem>
                            </li>
                        );
                    })}
                </ul>
                <AddPostLink to="/add-new-post">
                    <AddPostButton onClick={() => setOpen(false)}>добавить пост</AddPostButton>
                </AddPostLink>
                <Typography align="center" color="secondary">©2021 Sergeevna</Typography>
            </nav>
        </div>
    )
}

const MenuItem = styled(Link)((props) => ({
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
}))
    ;

const useStyles = makeStyles(theme => ({
    root: {
        height: 30,
        width: 30,
        display: "none",
        marginLeft: "auto",

        [theme.breakpoints.down("xs")]: {
            display: "block",
        }
    },
    menu: {
        padding: "120px 0 30px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: theme.palette.primary.main,
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        transition: "transform 0.3s ease-in-out",
        zIndex: 200,
    },
    menuButton: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
        height: "100%",
        background: "transparent",
        border: "none",
        padding: 0,
        zIndex: 300,

        "&:focus": {
            outline: "none"
        }
    },
    menuButtonLine: {
        width: "100%",
        height: 4,
        background: theme.palette.secondary.main,
        borderRadius: 10,
        transition: "all 0.3s linear",
        transformOrigin: "1px",
    },
    menuItem: {
        display: "flex",
        padding: 0,
        marginLeft: 0,
        justifyContent: "center",
        listStyle: "none",

        "& + &": {
            marginTop: 20,
        }
    }
}))

const AddPostLink = styled(Link)({
    maxWidth: 180,
    margin: "4px auto auto",
    textDecoration: "none"
})



const AddPostButton = styled(Button)({
    borderColor: "#666666",
    color: "#666666",
    padding: 5,
    fontSize: 16
})