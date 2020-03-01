import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button/Button';

class CardFullDetails extends React.Component {
    render() {
        const { title, category, image, description, url } = this.props;
        const { style, className } = this.props;
        return (
            <div style={style} className={`card-full-details${className ? " " + className : ""}`}>
                <NavLink to={url}>
                    <h1 className="card-full-details__title"> { title } </h1>
                </NavLink>
                <div className="card-full-details__detail">
                    {
                        category && category.map((e,i) => (<Button style={{margin:"0 3px", padding: "3px"}} url={e.url} link> {e.name || e.title} </Button>))
                    }
                    <small className="card-full-details__detail__date"> JANUARY 6, 2016 </small>
                </div>
                <NavLink to={url}>
                    <img className="card-full-details__image" src={image} />
                </NavLink>
                <div className="card-full-details__description"> {description} <NavLink className="card-full-details__readmore" to={url}> Read More <FontAwesomeIcon icon={faArrowRight} /> </NavLink> </div>
            </div>
        )
    }
}

CardFullDetails.defaultProps = {
    title: "",
    category: [],
    url: "/"
}

export default CardFullDetails;