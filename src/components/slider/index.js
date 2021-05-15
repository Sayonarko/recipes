import { Box, Typography, Button, Fade } from "@material-ui/core"
import CircularProgress from "../UI/circular-progress"
import { makeStyles, styled } from '@material-ui/core/styles'
import React, { useState, useEffect } from "react"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import formateDate from "../helpers/formate-date"


export default function Slider(props) {
    const classes = useStyles()
    const [slides, setSlides] = useState([])
    const [slideIndex, setSlideIndex] = useState(1)
    const [requestSucess, setRequestSucess] = useState(false)


    function sortSlides(arr) {
        return arr.sort((a, b) => b.likes - a.likes).slice(0, 4)
    }

    useEffect(() => {
        if (props.data.length) {
            setSlides(sortSlides(props.data))
            setRequestSucess(true)
        }
    }, [props.data]);

    useEffect(() => {
        if (slides.length) {
            let newSlides = [...slides];
            newSlides.forEach(item => {
                item.active = false;
            });
            (slideIndex === 0) ? setSlideIndex(slides.length)
                : (slideIndex > slides.length) ? setSlideIndex(1)
                    : newSlides[slideIndex - 1].active = true;
            setSlides(newSlides);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slideIndex])

    // useEffect(() => {
    //     const autoSlide = setInterval(() => setSlideIndex(slideIndex + 1), 6000);
    //     return () => clearInterval(autoSlide);
    // }, [slideIndex]);

    function RenderSlider() {

        return (
            <>
                <Box
                    display="flex"
                    width="100%"
                    flexGrow="1"
                    height="100%">
                    {slides.map(({ img, title, date, desc, link, active, _id }, id) => {
                        return (
                            <Fade in={active} key={id}>
                                <Box
                                    display={active ? "flex" : "none"}
                                    flexDirection="column"
                                    alignItems="center"
                                    width="100vw"
                                    p={{ xs: 6, sm: 9 }}
                                    style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
                                    <Typography variant="h1" className={classes.title}>{title}</Typography>
                                    <Typography variant="button" className={classes.date}>{formateDate(date)}</Typography>
                                    <Typography variant="body1" className={classes.text}>{desc}</Typography>
                                    <SliderButton as="a" href={`post/${_id}`}>read more</SliderButton>
                                </Box>
                            </Fade>
                        );
                    })}
                </Box>
                <ControlButton position="prev" onClick={() => setSlideIndex(slideIndex - 1)}>
                    <KeyboardArrowDownIcon color="inherit" fontSize="large" />
                </ControlButton>
                <ControlButton position="next" onClick={() => setSlideIndex(slideIndex + 1)}>
                    <KeyboardArrowDownIcon color="inherit" fontSize="large" />
                </ControlButton>
            </>
        )
    }

    return (
        <Box
            position="relative"
            component="section"
            width="100%"
            maxWidth="1980px"
            margin="0 auto"
            overflow="hidden"
            className={classes.root}>
            {requestSucess ? <RenderSlider /> : <CircularProgress />}
        </Box>
    );
}
const SliderButton = styled(Button)(props => ({
    color: "white",
    borderColor: "white",
    marginTop: "auto"
}));

const ControlButton = styled(Button)(props => ({
    background: "transparent",
    color: "white",
    position: "absolute",
    top: "calc(50% - 20px)",
    left: props.position === "prev" && "-32px",
    right: props.position === "next" && "-32px",
    transform: `rotate(${props.position === "prev" ? "90deg" : "270deg"})`,
    paddingTop: "5px",
    height: "40px",
    width: "100px",
    borderColor: "white",
    borderWidth: "2px",
    "@media (max-width: 767px)": {
        top: "calc(50% - 30px)",
        border: "none",
        paddingTop: "10px",

    }
}));

const useStyles = makeStyles(theme => ({
    root: {
        height: "400px",
        "@media (max-width: 767px)": {
            height: "300px"
        }
    },
    title: {
        marginBottom: "10px",
        color: "white",
        textAlign: "center",
    },
    date: {
        color: "white",
    },
    text: {
        color: "white",
        maxWidth: "350px",
        maxHeight: "100px",
        margin: "30px auto 20px",
        overflowY: "hidden",

        "@media (max-width: 767px)": {
            margin: "10px auto 0",
        }
    }

}))
