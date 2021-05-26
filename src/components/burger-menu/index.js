import { Typography, Button, makeStyles, styled, FormControl, IconButton, TextField, InputAdornment, Input } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import SearchIcon from '@material-ui/icons/Search';

export default function BurgerMenu() {
    const location = useLocation()
    const classes = useStyles()
    const history = useHistory()
    const [value, setValue] = useState("")

    function submitSearch(e) {
        e.preventDefault()
        if (value) {
            history.push(`/search/${value}`)
            setValue("")
            setOpen(false)
        }
    }
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
    const [open, setOpen] = useState(false);


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
                    {btn.map(({ name, href }) => {
                        return (
                            <li key={name}
                                className={classes.menuItem}>
                                <MenuItem
                                    isactive={location.pathname === href ? 1 : 0}
                                    to={href}
                                    onClick={() => setOpen(false)}>
                                    {name}
                                </MenuItem>
                            </li>
                        );
                    })}
                </ul>
                <AddPostLink to="/add-new-post">
                    <AddPostButton
                        onClick={() => setOpen(false)}
                        isactive={location.pathname === "/add-new-post" ? 1 : 0}>
                        добавить пост
                         </AddPostButton>
                </AddPostLink>
                <FormControl
                className={classes.searchForm}
            component="form"
            onSubmit={(e) => submitSearch(e)}
        >
            <Input
            className={classes.input}
                placeholder="Поиск..."
                type="text"
                disableUnderline
                value={value}
                onChange={e => setValue(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        color="secondary"
                        type="submit">
                          <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                   />
        </FormControl>
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
    },
    searchForm: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: "auto",
        marginTop: 20,
        
        "& input": {
            width: "100%",
        }
    },
    input: {
        width: "100%",
        maxWidth: 290,
        margin: "0 auto",

        "& .MuiIconButton-root": {
            padding: 5
        }
    }
}))

const AddPostLink = styled(Link)({
    maxWidth: 180,
    margin: "4px auto",
    textDecoration: "none"
})



const AddPostButton = styled(Button)(props => ({
    borderColor: props.isactive ? props.theme.palette.warning.main : "#666666",
    color: props.isactive ? props.theme.palette.warning.main : "#666666",
    padding: 5,
    fontSize: 16
}))