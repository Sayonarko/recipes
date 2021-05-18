import { Box, Typography, Grid, Fade, CardMedia, makeStyles, Avatar, Divider, List, ListItem, Hidden } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import Container from "../components/UI/container"
import PostComments from "../components/post-comments"
import Sidebar from "../components/sidebar"
import CircularProgress from "../components/UI/circular-progress"
import formateDate from "../components/helpers/formate-date"
import { Facebook, Instagram, LinkedIn, Twitter, YouTube, StopSharp, VisibilityOutlined, FiberManualRecord } from "@material-ui/icons";
import { API, API_ROUTER } from "../api/api"
import { Link } from "react-router-dom"


export default function PostPage(props) {
    const classes = useStyles()
    const [card, setCard] = useState({})
    const [requestSucess, setRequestSucess] = useState(false)
    const { views, title, date, img, desc, tags, author, ingredients, steps } = card

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [card])
    //data
    useEffect(() => {
        API({...API_ROUTER.getPosts, url: API_ROUTER.getPosts.url + props.match.params.id})
                    .then(result => {
                        console.log(result.data);
                setCard(result.data)
                setRequestSucess(true)
            })
            .catch(error => console.log(error))
    }, [props.match.params.id])
    //views page count
    useEffect(() => {
        setTimeout(() => {
            let body = JSON.stringify({
                        views: views + 1
                    })
                API({...API_ROUTER.updateViews, url: API_ROUTER.updateViews.url + props.match.params.id, data: body})
        .catch(error => console.log(error))
        }, 10000)

    }, [views])


    function RenderRecipePage() {
        return (

            <Fade in={requestSucess}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={8} lg={9}>

                        {/* author and date */}

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent={{ xs: "flex-end", sm: "flex-start" }}
                                    marginBottom={{ xs: 0, sm: 10 }}>

                                    <Box textAlign={{ xs: "right", sm: "left" }}>
                                        <Typography
                                            variant="button"
                                            color="textSecondary"
                                            component="div">
                                            автор
                                            </Typography>
                                        <Typography variant="button" color="textSecondary"
                                        >{author}</Typography>
                                    </Box>
                                    <Avatar
                                        variant="circular"
                                        src={img}
                                        alt={author}
                                        className={classes.authorAvatar} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex"
                                    alignItems="center"
                                    justifyContent="flex-end">
                                    <Typography
                                        variant="button"
                                        color="textSecondary">
                                        {formateDate(date)}
                                    </Typography>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        m={1}>
                                        <StopSharp className={classes.divideIcon} />
                                    </Box >
                                    <Typography variant="button" color="textSecondary"
                                    >{tags[0]}</Typography>
                                </Box>
                                <Box display="flex"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    marginBottom={{ xs: 3, sm: 10 }}>
                                    <VisibilityOutlined className={classes.viewIcon} />
                                    <Typography variant="button" color="textSecondary"
                                    >{views}</Typography>
                                </Box>

                            </Grid>
                        </Grid>

                        {/* main  */}

                        <Typography variant="h1" gutterBottom>{title}</Typography>
                        <Typography variant="body1" gutterBottom>{desc}</Typography>

                        {(ingredients && ingredients.length)
                            && <Box>
                                <Typography variant="h2" gutterBottom>Ингредиенты</Typography>
                                <List>
                                    {ingredients.map(item => <ListItem key={item} disableGutters><FiberManualRecord className={classes.divideIcon} />{item}</ListItem>)}
                                </List>
                            </Box>}

                        {(steps && steps.length)
                            && <Box>
                                <Typography variant="h2" gutterBottom>Приготовление</Typography>
                                {steps.map((item, id) => {
                                    return (
                                        <div key={id}>
                                            <Typography variant="h3" gutterBottom>Шаг {id + 1}</Typography>
                                            <Typography variant="body1" gutterBottom>{item}</Typography>
                                        </div>
                                    )
                                })}
                            </Box>}

                        {/* tags & socials */}
                        <Divider className={classes.divider} />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Box display="flex"
                                    flexWrap="wrap"
                                    justifyContent={{ xs: "center", sm: "flex-start" }}>
                                    {tags.map(item => <Typography
                                        key={item}
                                        component={Link}
                                        to={`/search/tags/${item}`}
                                        className={classes.tagLink}
                                        variant="button"
                                        color="textSecondary"
                                    >
                                        #{item}
                                    </Typography>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Box textAlign={{ xs: "center", sm: "right" }}>
                                    <Typography variant="h4" >Поделись или сохрани себе</Typography>
                                </Box>
                                <Box display="flex"
                                    alignItems="center"
                                    justifyContent={{ xs: "center", sm: "flex-end" }}
                                    mt={1}>
                                    <Box component="a"
                                        href="#"
                                        ml={{ xs: 2, sm: 3 }}
                                        display="flex"
                                        alignItems="flex-end"
                                        justifyContent="center"
                                        color="secondary.main">
                                        <Facebook />
                                    </Box>
                                    <Box component="a"
                                        href="#"
                                        ml={{ xs: 1, sm: 2 }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        color="secondary.main">
                                        <Instagram />
                                    </Box>
                                    <Box component="a"
                                        href="#"
                                        ml={{ xs: 1, sm: 2 }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        color="secondary.main">
                                        <LinkedIn />
                                    </Box>
                                    <Box component="a"
                                        href="#"
                                        ml={{ xs: 1, sm: 2 }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        color="secondary.main">
                                        <Twitter />
                                    </Box>
                                    <Box component="a"
                                        href="#"
                                        ml={{ xs: 1, sm: 2 }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        color="secondary.main">
                                        <YouTube />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        {/* Comments */}
                        <PostComments postId={props.match.params.id} />
                    </Grid>
                    <Hidden smDown>
                        <Grid item xs={12} md={4} lg={3}>
                            <Sidebar />
                        </Grid>
                    </Hidden>
                </Grid>
            </Fade>
        )
    }

    return (
        <Box component="section">
            {img ? <CardMedia image={img} title={title} className={classes.image} /> : <CircularProgress />}
            <Container
                display="flex"
                flexDirection="column"
                justifyContent="center"
                pt={{ xs: 5, sm: 10 }}
                pb={{ xs: 5, sm: 10 }}>
                {requestSucess ? <RenderRecipePage /> : <CircularProgress />}
            </Container>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    image: {
        height: 0,
        paddingTop: "21.02%",
        marginRight: 100,
        marginLeft: 100,

        [theme.breakpoints.down("sm")]: {
            paddingTop: "39.065%",
            marginRight: 25,
            marginLeft: 25,
        },

        [theme.breakpoints.down("xs")]: {
            paddingTop: "46.5%",
            marginRight: 15,
            marginLeft: 15,
        }
    },
    authorAvatar: {
        width: 50,
        height: 50,
        marginLeft: 10,

        [theme.breakpoints.down("xs")]: {
            width: 40,
            height: 40,
        }

    },
    divideIcon: {
        fontSize: 12,
        color: theme.palette.info.main,
        transform: "rotate(45deg)",
        marginRight: 5
    },
    viewIcon: {
        fontSize: 16,
        color: theme.palette.secondary.main,
        marginRight: 5
    },
    tagLink: {
        textDecoration: "none",
        transition: "color 0.3s ease",
        marginRight: 10,
        lineHeight: "18px",

        "&:hover": {
            color: theme.palette.info.main
        }
    },
    divider: {
        marginTop: 15,
        marginBottom: 15,
        height: 2,
        backgroundColor: theme.palette.secondary.main,
    }
}))
