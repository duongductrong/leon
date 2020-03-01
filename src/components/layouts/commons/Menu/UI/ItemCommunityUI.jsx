import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ItemCommunityUI(props) {
    const { icon, url, onClick, dark } = props;
    return (
        <a onClick={onClick} className={`menu-ui__container__community__child${dark ? " menu-ui--dark" : ""}`} href={url}>
            <FontAwesomeIcon icon={icon} />
        </a>
    )
}

ItemCommunityUI.defaultProps = {
    icon: "",
    url: "/"
}

export default ItemCommunityUI;