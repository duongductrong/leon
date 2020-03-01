import React from 'react';
import { NavLink } from 'react-router-dom';

class CardTrending extends React.Component {
    render() {
        const { image, title, date, style, url } = this.props;
        return (
            <div style={style} className="card-trending">
                <NavLink to={url}>
                    <img className="card-trending__image" src={image} />
                    <div className="card-trending__content">
                        <h1 className="card-trending__content__title"> {title} </h1>
                        <p className="card-trending__content__date"> {date} </p>
                    </div>
                </NavLink>
            </div>
        )
    }
}

CardTrending.defaultProps = {
    image: "",
    title: "",
    date: "",
    style: {},
    url: "/"
}

export default CardTrending;