import { Box, Typography, makeStyles, Input, Avatar, Divider, Button, styled, CardMedia, Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Collapse from "@material-ui/core/Collapse"
import formateDate from "../helpers/formate-date"
import CircularProgress from "../UI/circular-progress"
import bigBanner from "../../img/big-banner.png"
import smallBanner from "../../img/small-banner.png"
import { Link, useHistory, useLocation } from "react-router-dom"
import { API, API_ROUTER } from "../../api/api"

 function Sidebar() {
    const classes = useStyles()
    const history = useHistory()
    const [cards, setCards] = useState([])
    const [requestSucess, setRequestSucess] = useState(false)
    const location = useLocation()
    console.log();
    function defaultDate() {
        const date = new Date()

        let mm = date.getMonth() + 1
        if (mm < 10) mm = '0' + mm
        let yyyy = date.getFullYear()

        if (location.pathname.includes("/search/date/")) {
            return location.pathname.replace("/search/date/", "")
        }
        return `${yyyy}-${mm}`
    }

    useEffect(() => {

        const params = {
            limit: 3,
            sort: "likes"
        }
        API({ ...API_ROUTER.getPosts, params })
            .then(res => {
                setCards(res.data)
                setRequestSucess(true)
            })
            .catch(err => console.log(err))
    }, []);


    function CollapseTags(props) {
        const [expanded, setExpanded] = useState(false)
        const tags = ["Сладкое", "Выпечка", "Статья", "Завтрак", "Рецепты", "Фрукты", "Овощи", "Первое", "Второе", "Напитки", "Закуски", "Совет"]

        return (
            <>
                <Collapse in={expanded} timeout={300} collapsedHeight={68}>
                    <Box>
                        {tags.map(item => <Link key={item} to={`/search/tags/${item}`} style={{ textDecoration: "none" }}
                        ><TagButton >{item}</TagButton></Link>)}
                    </Box>
                </Collapse>
                <MoreTagButton size="small" onClick={() => setExpanded((prev) => !prev)} style={{ display: expanded ? "none" : "flex" }} >показать больше</MoreTagButton>
            </>
        )
    }

    function RenderSidebar(props) {

        return (

            <Grid container spacing={0}>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={12}>
                    <CardMedia
                        image={bigBanner}
                        className={classes.bigBanner}
                        title="banner" />
                    <Box p={6} >

                        <Typography
                            className={classes.title}
                            variant="h2"
                            gutterBottom>
                            Архив
                               </Typography>
                        <Divider className={classes.titleDivider} />
                        <Input
                            type="month"
                            fullWidth
                            disableUnderline
                            defaultValue={defaultDate()}
                            onChange={(e) => history.push(`/search/date/${e.target.value}`)} />
                        <Typography
                            className={classes.title}
                            variant="h2"
                            gutterBottom>
                            Тэги
                        </Typography>
                        <Divider className={classes.titleDivider} />
                        <CollapseTags />
                    </Box >

                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                    <Box p={6} >

                        <Typography className={classes.title} variant="h2" gutterBottom>Лучшие посты</Typography>
                        <Divider className={classes.titleDivider} />
                        {cards.map(item => {
                            return (
                                <Box
                                    className={classes.post}
                                    component={Link}
                                    to={`/post/${item._id}`}
                                    key={item._id}>
                                    <Avatar className={classes.postImg} alt={item.title} src={item.img} variant="rounded" />
                                    <Typography className={classes.postTitle} color="textPrimary" >{item.title}</Typography>
                                    <Typography className={classes.postDate} variant="button" color="secondary">{formateDate(item.date, "short")}</Typography>
                                </Box>
                            )
                        })}
                    </Box >
                    <CardMedia
                        image={smallBanner}
                        className={classes.smallBanner}
                        title="banner" />
                </Grid>
            </Grid>


        )
    }


    return (
        <Box
            className={classes.root}
            component="aside"
        >
            {requestSucess ? <RenderSidebar /> : <CircularProgress />}
        </Box>
    )
}

export default React.memo(Sidebar)

const TagButton = styled(Button)(props => ({
    fontWeight: "normal",
    height: 20,
    marginRight: 10,
    marginTop: 10,
    paddingLeft: 9,
    paddingRight: 9,
    borderRadius: 4,
    borderColor: props.theme.palette.info.main,
    borderWidth: 1,

    "&:hover": {
        background: props.theme.palette.info.main,
        color: props.theme.palette.primary.main,
        borderColor: props.theme.palette.info.main,
    }
}))

const MoreTagButton = styled(Button)({
    fontSize: 10,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 9,
    paddingRight: 9,
    border: 1,
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
})

const useStyles = makeStyles((theme) => ({

    root: {
        backgroundColor: theme.palette.primary.main,
        position: "sticky",
        top: 30
    },
    bigBanner: {
        height: 0,
        paddingTop: "148.15%",

        [theme.breakpoints.down("xs")]: {
            paddingTop: "100%",

        }
    },
    smallBanner: {
        height: 0,
        paddingTop: "100%"
    },
    title: {
        letterSpacing: 1.15,
        "&:not(:first-child)": {
            marginTop: 30
        }
    },
    titleDivider: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.info.main,
        marginBottom: 10,
        "@media(max-width: 767px)": {
            width: 10,
        }
    },
    post: {
        textDecoration: "none",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        transition: "all 0.3s ease",
        borderBottomWidth: 2,
        borderColor: theme.palette.secondary.main,
        borderBottomStyle: "solid",
        "&:hover": {
            borderColor: theme.palette.warning.main,
        }
    },
    postImg: {
        width: 60,
        height: 60,
        marginRight: 10,
        marginBottom: 10
    },
    postTitle: {
        maxWidth: 130,
        flexShrink: 1,

        "@media(max-width: 991px)": {
            maxWidth: "100%",
            fontSize: 18
        }
    },
    postDate: {
        width: "100%",
    },

}))


