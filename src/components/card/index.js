import React, { useEffect, useLayoutEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CardContent, CardMedia, Card, Grid, Box, Fade } from '@material-ui/core';
import formateDate from "../helpers/formate-date";
import StopSharpIcon from '@material-ui/icons/StopSharp';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { Link } from "react-router-dom";

export default function RecipesCard({ views, title, date, img, desc, tags, _id, id, small }) {
    const classes = useStyles();
    const [isRaised, setIsRaised] = useState(false)
    const [windowWidth, setWindowWith] = useState(0)
    const [fullWidth, setFullWidth] = useState(4)

    useLayoutEffect(() => {
        function updateSize() {
            setWindowWith([window.innerWidth]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        if (small) {
            setFullWidth(0)
        } else {
            windowWidth < 1200 ? setFullWidth(3) : setFullWidth(4)
        }
    }, [windowWidth, small])

    return (
        <Fade in={_id ? true : false}>
            <Grid

                item
                xs={12}
                sm={id % fullWidth !== 0 && 6}
                lg={id % fullWidth !== 0 && 4}>
                <Card
                    className={classes.root}
                    component={Link}
                    to={`/post/${_id}`}
                    raised={isRaised}
                    square
                    onMouseEnter={() => setIsRaised(true)}
                    onMouseLeave={() => setIsRaised(false)}>
                    <CardMedia
                        className={classes.media}
                        image={img}
                        title={title}
                    />
                    <Box display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                        pr={1}>
                        <VisibilityOutlinedIcon className={classes.viewIcon} />
                        <Typography variant="caption" component="span" align="right">{views}</Typography>
                    </Box>
                    <CardContent className={classes.content}>
                        <Typography
                            className={classes.title}
                            variant="h2"
                            align="center"
                            gutterBottom>
                            {title}
                        </Typography>
                        <Typography
                            noWrap
                            className={classes.date}
                            variant="button"
                            color="textSecondary"
                            align="center"
                            component="div"
                            gutterBottom
                        >
                            {formateDate(date, (id % fullWidth !== 0) ? "short" : "long")}
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                m={{xs: "0 3px 3px 2px", sm: "5px"}}>
                                <StopSharpIcon className={classes.divideIcon} />
                            </Box>
                            {tags[0]}
                        </Typography>

                        <Typography variant="body2" className={classes.text}>{desc}</Typography>
                    </CardContent>
                </Card>
            </Grid >
        </Fade>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 450,
        height: "calc(100% - 4px)",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        border: `2px solid ${theme.palette.secondary.main}`,

        "@media (max-width: 424px)": {
            minHeight: 375
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    content: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    title: {
        maxHeight: 65,
        overflow: 'hidden',
    },
    date: {
        marginTop: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
    },
    text: {
        overflow: "hidden",
        maxHeight: 120,
        maxWidth: 365,
        margin: "0 auto",
        textAlign: "center",
    },
    divideIcon: {
        fontSize: 12,
        color: theme.palette.info.main,
        transform: "rotate(45deg)",

        [theme.breakpoints.down("xs")]: {
            fontSize: 10
        }
    },
    viewIcon: {
        fontSize: 12,
        color: theme.palette.secondary.main,
        marginRight: 5
    }

}));