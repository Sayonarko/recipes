import { Box, Typography, Fade, makeStyles, FormControl, TextField, Button, CircularProgress, Snackbar, Checkbox, Input, InputAdornment, IconButton } from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import React, { useState, useEffect, useRef } from "react"
import Container from "../components/UI/container"
import { API, API_ROUTER } from "../api/api"

export default function RegistrationPage() {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [requestPending, setRequestPending] = useState(false)
    const [requestSucess, setRequestSucess] = useState(false)
    const [requestError, setRequestError] = useState({
        error: false,
        message: "Что-то пошло не так... Попробуйте позже"
    })

    const uploadInputRef = useRef()
    const [value, setValue] = useState({
        img: "",
        title: "",
        desc: "",
        author: "Admin",
        ingredients: [],
        steps: [],
        tags: []
    })

    function onSubmitRegistration(e) {
        e.preventDefault()
    }

    return (
        <Box component="section">
            <Container
                // minHeight={{ xs: "calc(100vh - 150px)", md: "calc(100vh - 180px)" }}
                pt={{ xs: 5, sm: 10 }}
                pb={{ xs: 5, sm: 10 }}
                display="flex"
                flexDirection="column"
                alignItems="center">
                <Typography variant="h1" gutterBottom>Регистрация</Typography>
                <FormControl
                    onSubmit={(e) => onSubmitRegistration(e)}
                    component="form"
                    className={classes.form}
                >
                    <Typography
                        variant="h2"
                        component="label"
                        htmlFor="firstname">
                        Имя
                            </Typography>
                    <TextField
                        id="firstname"
                        className={classes.input}
                        InputProps={{ disableUnderline: true }}
                        required
                        value={value.title}
                        onChange={e => setValue({
                            ...value,
                            title: e.target.value
                        })} />
                    <Typography
                        variant="h2"
                        component="label"
                        htmlFor="lastname">
                        Фамилия
                            </Typography>
                    <TextField
                        id="lastname"
                        className={classes.input}
                        InputProps={{ disableUnderline: true }}
                        required
                        value={value.desc}
                        onChange={e => setValue({
                            ...value,
                            desc: e.target.value
                        })} />
                    <Typography
                        variant="h2"
                        component="label"
                        htmlFor="email" >
                        Email
                             </Typography>
                    <TextField
                        id="email"
                        className={classes.input}
                        InputProps={{ disableUnderline: true }}
                        value={value.ingredients.join("; ")}
                        onChange={e => setValue({
                            ...value,
                            ingredients: e.target.value.split("; ")
                        })} />
                    <Typography
                        variant="h2"
                        component="label"
                        htmlFor="password" >
                        Пароль
                             </Typography>
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className={classes.input}
                        disableUnderline
                        // value={values.password}
                        // onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Visibility color="secondary"/> : <VisibilityOff color="secondary"/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Box
                        textAlign="center"
                        mt={{ xs: 6, sm: 10 }}
                        mb={{ xs: 6, sm: 10 }}>
                        <Button size="small" type="submit">зарегистрироваться</Button>
                    </Box>
                    <label htmlFor="policy" className={classes.policy}>
                        <Checkbox id="policy" />
                        <Typography variant="body2" color="textSecondary" component="p">
                            Даю согласие на обработку персональных
                            данныхи соглашаюсь с условиями оферты и
                            политики конфиденциальности
                        </Typography>
                    </label>
                </FormControl>
            </Container>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    request: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: "0.5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        zIndex: 100,
    },
    form: {
        width: 520,
        margin: "0 auto",

        [theme.breakpoints.down("sm")]: {
            width: 400,
        },

        [theme.breakpoints.down("xs")]: {
            width: "100%"
        },
    },
    input: {
        marginTop: 10,
        marginBottom: 20,

        "& .MuiInputBase-input": {
            minHeight: 27,

            [theme.breakpoints.down("xs")]: {
                minHeight: 12,

            },
        },

        [theme.breakpoints.down("xs")]: {
            marginTop: 5,
            marginBottom: 10,
        },
    },
    policy: {
        display: "flex",
        justifyContent: "center",
        "& .MuiTypography-root": {
            maxWidth: 260,
            fontSize: 12,
        }
    }
}))