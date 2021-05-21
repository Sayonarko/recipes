import { Box, Typography, Fade, makeStyles, FormControl, TextField, Button } from "@material-ui/core"
import React, { useState, useEffect, useRef } from "react"
import Container from "../components/UI/container"
import CircularProgress from "../components/UI/circular-progress"
import { API, API_ROUTER } from "../api/api"

export default function AddPost() {
    const classes = useStyles()
    const [requestSucess, setRequestSucess] = useState(false)
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

    console.log(value);
    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])


    function encodeImage() {
        const file = uploadInputRef.current.files[0];

        if (!file) {
            return
        }

        // Load the data into an image
        new Promise((resolve, reject) => {
            let rawImage = new Image();

            rawImage.addEventListener("load", function () {
                resolve(rawImage);
            });

            rawImage.src = URL.createObjectURL(file);
        })
            .then((rawImage) => {
                // Convert image to webp ObjectURL via a canvas blob
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");
                canvas.width = rawImage.width;
                canvas.height = rawImage.height;
                ctx.drawImage(rawImage, 0, 0);

                const data = canvas.toDataURL('image/webp', 0.2)

                setValue({
                    ...value,
                    img: data
                })
            })
            .catch(err => console.log(err))
    }

    function onSubmitPost(event) {
        event.preventDefault()

        API({ ...API_ROUTER.addPost, data: JSON.stringify(value) })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    return (
        <Box component="section">
            <Container
                display="flex"
                flexDirection="column"
                justifyContent="center"
                pt={{ xs: 5, sm: 10 }}
                pb={{ xs: 5, sm: 10 }}>
                <Typography
                    variant="h1"
                    align="left"
                    gutterBottom>
                    Добавить пост
                       </Typography>
                <FormControl
                    onSubmit={(e) => onSubmitPost(e)}
                    component="form"
                    className={classes.form}
                >
                    <Typography
                        variant="h2"
                        component="label"
                        htmlFor="title">
                        Заголовок
                            </Typography>
                    <TextField
                        id="title"
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
                        htmlFor="desc">
                        Описание
                            </Typography>
                    <TextField
                        id="desc"
                        multiline
                        rows="7"
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
                        htmlFor="ingredients" >
                        Список ингредиентов
                             </Typography>
                    <TextField
                        id="ingredients"
                        className={classes.input}
                        InputProps={{ disableUnderline: true }}
                        placeholder="Перечислите ингредиенты через точку с запятой: 1кг картофеля; 1 ч.л. соли; и.тд"
                        onChange={e => setValue({
                            ...value,
                            ingredients: e.target.value.split("; ")
                        })} />
                    <Typography
                        variant="h2"
                        component="label"
                        htmlFor="steps" >
                        Приготовление
                             </Typography>
                    <TextField
                        id="steps"
                        className={classes.input}
                        multiline
                        rows="7"
                        placeholder={`Перечислите шаги через точку с запятой:\nВскипятить воду;\nДобавить овощи;\n... и.т.д`}
                        InputProps={{ disableUnderline: true }}
                        onChange={e => setValue({
                            ...value,
                            steps: e.target.value.split("; ")
                        })} />
                    <Typography
                        variant="h2"
                        component="label"
                        htmlFor="tags" >
                        Tags
                             </Typography>
                    <TextField
                        id="tags"
                        className={classes.input}
                        placeholder="Перечислите теги через точку с запятой: завтрак; напитки; и.тд"
                        InputProps={{ disableUnderline: true }}
                        required
                        onChange={e => setValue({
                            ...value,
                            tags: e.target.value.split("; ")
                        })} />
                    <Typography
                        variant="h2"
                    >Добавить фото</Typography>
                    <label
                        htmlFor="photo"
                        className={classes.addPhoto}
                        required>
                        {value.img
                            ? <img src={value.img} alt="preview" style={{ maxHeight: "100%" }} />
                            : <><div></div><div></div></>}

                        <input
                            type="file"
                            id="photo"
                            style={{ display: 'none' }}
                            ref={uploadInputRef}
                            onChange={() => encodeImage()} />
                    </label>
                    <Box textAlign="center" mt={{ xs: 3.75, sm: 6.25 }}>
                        <Button size="large" type="submit">опубликовать</Button>
                    </Box>
                </FormControl>

            </Container>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    form: {
        width: 700,
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

    addPhoto: {
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: 120,
        height: 120,
        borderRadius: 5,
        border: `2px solid ${theme.palette.secondary.main}`,
        marginTop: 10,
        marginBottom: 20,

        [theme.breakpoints.down("xs")]: {
            marginTop: 5,
            marginBottom: 10,
            width: 80,
            height: 80,
        },

        "& div": {
            width: 60,
            height: 1,
            backgroundColor: theme.palette.secondary.main,

            [theme.breakpoints.down("xs")]: {
                width: 40,
            },

            "&:last-of-type": {
                transform: "rotate(90deg)",
                position: "absolute",
                top: "50%",
                left: "25%",
            }
        }
    }
}))
