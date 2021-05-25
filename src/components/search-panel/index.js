import { Box, Typography, makeStyles, Input, Avatar, Divider, Button, Collapse, TextField, FormControl, IconButton } from "@material-ui/core"
import React, { useEffect, useState, useRef } from "react"

import { Link, useHistory, useLocation } from "react-router-dom"
import SearchIcon from '@material-ui/icons/Search';

export default function SearchPanel() {
    const classes = useStyles()
    const history = useHistory()
    const inputRef = useRef()
    const [expanded, setExpanded] = useState(false)
    const [value, setValue] = useState("")

    useEffect(() => {
        if (expanded) {
            inputRef.current.focus();
        }
    }, [expanded]);


    function submitSearch(e) {
        e.preventDefault()
        if (value) {
            history.push(`/search/${value}`)
            setValue("")
            setExpanded(false)
        }
    }

    return (

        <FormControl
            component="form"
            className={classes.root}
            onMouseEnter={() => setExpanded(true)}
            onSubmit={(e) => submitSearch(e)}
            onFocus={() => setExpanded(true)}
            onBlur={() => setExpanded(false)}
        >
            {/* <Collapse in={expanded} timeout={300} collapsedHeight={0} > */}
            <TextField
                inputProps={{
                    style: {
                        width: expanded ? "300px" : "0px",
                        transition: "width 0.3s ease"
                    }
                }}
                style={{ opacity: expanded ? 1 : 0, transition: "opacity 0.3s ease-out" }}
                className={classes.input}
                inputRef={inputRef}
                placeholder="Введите и нажмите Enter ..."
                type="text"
                InputProps={{ disableUnderline: true }}
                value={value}
                onChange={e => setValue(e.target.value)} />
            {/* </Collapse> */}
            <IconButton
                color="secondary"
                type="submit"
            >
                <SearchIcon />
            </IconButton>
        </FormControl>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "noWrap",
        height: 30,
        position: "absolute",
        right: 3,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        backgroundColor: "white",

        [theme.breakpoints.down("xs")]: {
            display: "none"
        },

        "&:focus-within": {
            "& .MuiSvgIcon-root": {
                fill: theme.palette.warning.main,
            }
        },

        "& svg": {
            width: 32,
            height: 32,
        },

        "& input::placeholder": {
            fontStyle: "italic"
        }
    }
}))
