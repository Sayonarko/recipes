import React from "react";
import ReactDOM from "react-dom";

function Slider() {
    const slides = [
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
    ];

    return (
        <>
            <div className="slider">
                <button className="slider__prev">prev</button>

                {slides.map(({ id, img, title, date, desc, link }) => {
                    return (
                        <div key={id}
                            className="slide"
                            style={{ backgroundImage: `url(${img})` }}>
                            <h1 className="slide__title">{title}</h1>
                            <span className="slide__date">{date}</span>
                            <p className="slide__desc">{desc}</p>
                            <a className="slide__btn"
                                href={link}>read more</a>
                        </div>
                    );
                })};
                <button className="slider__next">next</button>
            </div>
        </>
    );
}

ReactDOM.render(<Slider />, document.getElementById("slider"));