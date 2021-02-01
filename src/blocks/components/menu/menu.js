// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ReactDOM from "react-dom";

function Menu() {
    const localBtn = localStorage.getItem("btn");
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

    function changeActive(x) {
        let newBtn = [...btn];

        newBtn.map(item => {
            (item.id === x) ? item.active = true : item.active = false;
        });
        setBtn(newBtn);
        localStorage.setItem("btn", JSON.stringify(btn));
    }

    return (
        <ul className="menu__row">
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
    );
}

ReactDOM.render(<Menu />, document.getElementById("header__menu"));