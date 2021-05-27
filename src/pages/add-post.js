import { Box, Typography, Fade, makeStyles, FormControl, TextField, Button, CircularProgress, Snackbar } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import React, { useState, useEffect, useRef } from "react"
import Container from "../components/UI/container"
import { API, API_ROUTER } from "../api/api"
import RichTextEditor from "react-rte";

export default function AddPost() {
    const classes = useStyles()
    const [requestPending, setRequestPending] = useState(false)
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
    const [requestError, setRequestError] = useState({
        error: false,
        message: "Что-то пошло не так... Попробуйте позже"
    })
    const [editorValue, setEditorValue] = useState(
        RichTextEditor.createValueFromString("", "html")
    );
    const toolbarConfig = {
        display: [
            "INLINE_STYLE_BUTTONS",
            "BLOCK_TYPE_BUTTONS",
            "LINK_BUTTONS",
            "BLOCK_TYPE_DROPDOWN",
            "HISTORY_BUTTONS",
            "ALIGNMENTS_BUTTONS"
        ],
        INLINE_STYLE_BUTTONS: [
            { label: "Bold", style: "BOLD", className: "custom-css-class" },
            { label: "Italic", style: "ITALIC" },
            { label: "Underline", style: "UNDERLINE" }
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: "Normal", style: "unstyled" },
            { label: "Heading Medium", style: "header-two" },
            { label: "Heading Small", style: "header-three" }
        ],
        BLOCK_TYPE_BUTTONS: [
            { label: "UL", style: "unordered-list-item" },
            { label: "OL", style: "ordered-list-item" }
        ]
    };

    console.log(value.desc)

    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])

    useEffect(() => {
        setValue({
            ...value,
            desc: editorValue.toString("html")
        })

    }, [editorValue])

    function onChange(value) {
        setEditorValue(value)
    }


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

                const data = canvas.toDataURL('image/webp', 0.65)

                setValue({
                    ...value,
                    img: data
                })
            })
            .catch(err => console.log(err))
    }

    function onSubmitPost(event) {
        event.preventDefault()
        setRequestPending(true)
        API({ ...API_ROUTER.addPost, data: JSON.stringify(value) })
            .then(res => {
                if (res.status === 200) {
                    setRequestPending(false)
                    setRequestSucess(true)
                    setValue({
                        img: "",
                        title: "",
                        desc: "",
                        author: "Admin",
                        ingredients: [],
                        steps: [],
                        tags: []
                    })
                }
            })
            .catch(err => {
                setRequestPending(false)
                setRequestError({
                    error: true,
                    message: err.message
                })
            })

    }


    return (
        <Box component="section">
            <Container
                display="flex"
                flexDirection="column"
                justifyContent="center"
                position="relative"
                pt={{ xs: 5, sm: 10 }}
                pb={{ xs: 5, sm: 10 }}>
                {requestPending && <Box className={classes.request}><CircularProgress size="75px" /></Box>}
                <Snackbar
                    open={requestSucess}
                    onClose={() => setRequestSucess(false)}
                    TransitionComponent={Fade}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={5000} >
                    <Alert
                        onClose={() => setRequestSucess(false)}
                        elevation={6}
                        variant="filled"
                        severity="success">
                        "Спасибо! Ваш пост скоро будет опубликован!"
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={requestError.error}
                    onClose={() => setRequestError({
                        ...requestError,
                        error: false
                    })}
                    TransitionComponent={Fade}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={5000} >
                    <Alert
                        onClose={() => setRequestError({
                            ...requestError,
                            error: false
                        })}
                        elevation={6}
                        variant="filled"
                        severity="error">
                        {requestError.message}
                    </Alert>
                </Snackbar>
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
                    {/* <TextField
                        id="desc"
                        multiline
                        rows="5"
                        rowsMax="30"
                        className={classes.input}
                        InputProps={{ disableUnderline: true }}
                        required
                        value={value.desc}
                        onChange={e => setValue({
                            ...value,
                            desc: e.target.value
                        })} /> */}
                    <RichTextEditor
                     onChange={onChange}
                      value={editorValue}
                       toolbarConfig={toolbarConfig} />
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
                        multiline
                        rows="5"
                        rowsMax="30"
                        placeholder="Перечислите ингредиенты через точку с запятой: 1кг картофеля; 1 ч.л. соли; и.тд"
                        value={value.ingredients.join("; ")}
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
                        rows="5"
                        rowsMax="30"
                        placeholder={`Перечислите шаги через точку с запятой:\nВскипятить воду;\nДобавить овощи;\n... и.т.д`}
                        InputProps={{ disableUnderline: true }}
                        value={value.steps.join("; ")}
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
                        value={value.tags.join("; ")}
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
                            ? <Fade in={value.img}><img src={value.img} alt="preview" style={{ maxHeight: "100%" }} /></Fade>
                            : <><div></div><div></div></>}
                        <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            required
                            style={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
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
        width: 700,
        margin: "0 auto",

        [theme.breakpoints.down("sm")]: {
            width: 400,
        },

        [theme.breakpoints.down("xs")]: {
            width: "100%"
        },

        "& .RichTextEditor__root___2QXK-": {
            marginTop: 10,
            marginBottom: 20,
            minHeight: 150,
            border: `2px solid ${theme.palette.secondary.main}`,
            borderRadius: 4,
            fontFamily: theme.typography.fontFamily,
            fontSize: 16,
            display: "flex",
            flexDirection: "column-reverse",

            [theme.breakpoints.down("xs")]: {
                marginTop: 5,
                marginBottom: 10,
                fontSize: 14,
            },
        }, 

        "& .EditorToolbar__root___3_Aqz": {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            borderBottom: "none",
            borderTop: `1px solid ${theme.palette.secondary.main}`,
        }
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
