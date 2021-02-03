import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";


function BurgerMenu() {
    const localBtn = sessionStorage.getItem("btn");
    const [btn, setBtn] = useState(localBtn ? JSON.parse(localBtn) :
        [
            {
                id: 0,
                name: "Главная",
                active: true,
                href: "#"

            },
            {
                id: 1,
                name: "Лучшее",
                active: false,
                href: "#"
            },
            {
                id: 2,
                name: "Новые",
                active: false,
                href: "#"

            },
            {
                id: 3,
                name: "О нас",
                active: false,
                href: "#"

            },
            {
                id: 4,
                name: "Контакты",
                active: false,
                href: "#"

            }
        ]
    );
    const [open, setOpen] = useState(false);


    function changeActive(x) {
        let newBtn = [...btn];
        newBtn.map(item => {
            (item.id === x) ? item.active = true : item.active = false;
        });
        setBtn(newBtn);
        sessionStorage.setItem("btn", JSON.stringify(btn));
        setOpen(false);
    }

    useEffect(() => {
        const body = document.querySelector("body");
        open ? body.style.overflowY = "hidden" : body.style.overflowY = "";
    }, [open]);

    return (
        <>
            <button className="menu__btn" onClick={() => setOpen(!open)}>
                <div style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }} />
                <div style={{ transform: open ? "translateX(-20px)" : "translateX(0)", opacity: open ? "0" : "1" }} />
                <div style={{ transform: open ? "rotate(-45deg)" : "rotate(0)" }} />
            </button>
            <nav style={{ transform: open ? "translateX(0)" : "translateX(100%)" }} className="burger-menu">
                <ul className="container">
                    {btn.map(({ id, name, active, href }) => {
                        return (
                            <li key={id}
                                className="menu__item">
                                <a className={active ? "active" : ""}
                                    href={href}
                                    onClick={() => changeActive(id)}>
                                    {name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <div className="copy-r">©2021 Sergeevna</div>
            </nav>
        </>
    );
}

ReactDOM.render(<BurgerMenu />, document.getElementById("burger-menu"));
