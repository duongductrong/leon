import React from 'react';
import { NavLink } from 'react-router-dom';

class Button extends React.Component {
    render() {
        const { link, button, children, url } = this.props;
        const { style, type, disabled } = this.props;
        const { onClick } = this.props;
        return (
            link ?
            <NavLink style={style} className="button button--link" to={url}> {children} </NavLink> :
            <button type={type} style={style} className="button" onClick={onClick} disabled={disabled}> {children} </button>
        )
    }
}

Button.defaultProps = {
    link: false,
    button: true,
    url: "/"
}

export default Button;