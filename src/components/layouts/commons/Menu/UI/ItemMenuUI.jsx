import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

function ItemMenuUI(props) {
    const [show, setShow] = useState(false)
    const { label, url, children } = props;

    window.addEventListener("resize", () => window.innerWidth > 1024 ? setShow(false) : setShow(true) )
    window.removeEventListener("resize", () => window.innerWidth > 1024 ? setShow(false) : setShow(true) )
    
    return (
        <li className="menu-ui__container__category__box__item">
            <NavLink className="menu-ui__container__category__box__item__child" to={url}> {label} {(children && show) && <FontAwesomeIcon icon={faPlus} />} </NavLink>
            { children }
        </li>
    )
}

ItemMenuUI.defaultProps = {
    label: "",
    url: "/"
}

export default ItemMenuUI;