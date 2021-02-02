import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

function Slider() {
    const [slides, setSlides] = useState([
        {
            img: "../../../img/homepage/slider/slide-1.png",
            title: "Уличная еда в США",
            date: "19 january 2021",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
            link: "#",
            view: false

        },
        {
            img: "../../../img/homepage/slider/slide-2.png",
            title: "Полезны ли сырые яйца",
            date: "10 december 2020",
            desc: "                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
            link: "#",
            view: false
        },
        {
            img: "../../../img/homepage/slider/slide-3.png",
            title: "Тыквенный cуп",
            date: "02 april 2020",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
            link: "#",
            view: false
        },
        {
            img: "../../../img/homepage/slider/slide-4.png",
            title: "Завтак - это важно",
            date: "20 january 2021",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
            link: "#",
            view: false
        }
    ]);
    const [slideIndex, setSlideIndex] = useState(1);

    function sliderSwap(num) {
        if (slideIndex < slides.length && slideIndex > 0) {
            setSlideIndex(slideIndex + num);
        } else if (slideIndex >= slides.length) {
            setSlideIndex(1);
        } else if (slideIndex == 0) {
            setSlideIndex(slides.length - 1);
        }
    }

    useEffect(() => {
        let newSlides = [...slides];
        newSlides.map(item => {
            item.view = false;
        });
        
        if (slideIndex === 0) {
            newSlides[slides.length - 1].view = true;
        } else {
            newSlides[slideIndex - 1].view = true;
        }
        setSlides(newSlides);
    }, [slideIndex]);

    useEffect(() => {
        const autoSlide = setInterval(() => sliderSwap(1), 4000);
        return () => clearInterval(autoSlide);
    },[slideIndex]);

    return (
        <>
            <button className="slider__prev" onClick={() => sliderSwap(-1)}
            >
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <title />
                    <g>
                        <path
                            d="M353,450a15,15,0,0,1-10.61-4.39L157.5,260.71a15,15,0,0,1,0-21.21L342.39,54.6a15,15,0,1,1,21.22,21.21L189.32,250.1,363.61,424.39A15,15,0,0,1,353,450Z" />
                    </g>
                </svg>
            </button>
            <div className="slider">
                {slides.map(({ img, title, date, desc, link, view }, id) => {
                    return (
                        <div
                            key={id}
                            className="slide"
                            style={{ backgroundImage: `url(${img})`, display: view ? "flex" : "none" }}>
                            <h1 className="slide__title">{title}</h1>
                            <span className="slide__date">{date}</span>
                            <p className="slide__desc">{desc}</p>
                            <a className="slide__btn"
                                href={link}>read more</a>
                        </div>
                    );
                })}
            </div>
            <button className="slider__next" onClick={() => sliderSwap(1)}
            >
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <title />
                    <g>
                        <path
                            d="M353,450a15,15,0,0,1-10.61-4.39L157.5,260.71a15,15,0,0,1,0-21.21L342.39,54.6a15,15,0,1,1,21.22,21.21L189.32,250.1,363.61,424.39A15,15,0,0,1,353,450Z" />
                    </g>
                </svg>
            </button>

        </>
    );
}

ReactDOM.render(<Slider />, document.getElementById("slider"));