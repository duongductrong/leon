import React from 'react';

function SubMenuUI(props) {
    const { submenu } = props;
    return (
        <div className="menu-ui__container__category__box__item__submenu">
            {
                submenu && submenu.map((e,i) => (
                    <a
                    key={`${i}-SubMenuUIChild`}
                    className="menu-ui__container__category__box__item__submenu__child" 
                    href={`${e.url}`}>
                        { e.label }
                    </a>
                ))
            }
        </div>
    )
}

SubMenuUI.defaultProps = {
    submenu: []
}

export default SubMenuUI;