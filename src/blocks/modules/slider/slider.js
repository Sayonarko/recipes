import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";

function Slider() {
    const [slides, setSlides] = useState([
        {
            id: 0,
            img: "../../../img/homepage/slider/slide-1.png",
            title: "Уличная еда в США",
            date: "19 january 2021",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
            link: "#"
        },
        {
            id: 1,
            img: "../../../img/homepage/slider/slide-2.png",
            title: "Полезны ли сырые яйца",
            date: "10 december 2020",
            desc: "                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
            link: "#"
        },
        {
            id: 2,
            img: "../../../img/homepage/slider/slide-3.png",
            title: "Тыквенный муп",
            date: "02 april 2020",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
            link: "#"
        },
        {
            id: 3,
            img: "../../../img/homepage/slider/slide-4.png",
            title: "Завтак - это важно",
            date: "20 january 2021",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
            link: "#"
        }
    ]);

    function nextSlide() {
        let newSlides = [...slides];
        newSlides.slice();
        newSlides.push(newSlides.shift());
        setSlides(newSlides);
    }

    function prevSlide() {
        let newSlides = [...slides];
        newSlides.slice();
        newSlides.unshift(newSlides.pop());
        setSlides(newSlides);
    }
    console.log(slides);
    return (
        <>
            <button className="slider__prev"
                onClick={prevSlide}>
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <title />
                    <g>
                        <path
                            d="M353,450a15,15,0,0,1-10.61-4.39L157.5,260.71a15,15,0,0,1,0-21.21L342.39,54.6a15,15,0,1,1,21.22,21.21L189.32,250.1,363.61,424.39A15,15,0,0,1,353,450Z" />
                    </g>
                </svg>
            </button>
            <div className="slider">

                {slides.map(({ id, img, title, date, desc, link }) => {
                    return (
                        <SwitchTransition
                            mode="out-in">
                            <CSSTransition
                                key={id}
                                classNames='fade'
                                timeout={200}>
                                <div
                                    className="slide"
                                    style={{ backgroundImage: `url(${img})` }}>
                                    <h1 className="slide__title">{title}</h1>
                                    <span className="slide__date">{date}</span>
                                    <p className="slide__desc">{desc}</p>
                                    <a className="slide__btn"
                                        href={link}>read more</a>
                                </div>
                            </CSSTransition>
                        </SwitchTransition>

                    );
                })};
            </div>
            <button className="slider__next"
                onClick={nextSlide}>
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