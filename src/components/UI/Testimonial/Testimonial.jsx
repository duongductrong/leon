import React from 'react';

export default function Testimonial({image, name, location, description, children}) {
    return (
        <div className="testimonial">
            <img src={image} alt="" className="testimonial__image"/>
            <h1 className="testimonial__name"> {name} </h1>
            <small className="testimonial__location"> {location} </small>
            <p className="testimonial__description"> {description || children} </p>
        </div>
    )
}