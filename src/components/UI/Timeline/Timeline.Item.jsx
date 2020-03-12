import React from 'react';

export default function TimelineItem({date, name, location, description, using, currently}) {
    return (
        <div className={`timeline__item${currently ? " timeline--currently" : ""}`}>
            <small className="timeline__item__date">{date}</small>
            <h3 className="timeline__item__name">{name}</h3>
            <small className="timeline__item__location">{location}</small>
            <div className="timeline__item__using"> {using} </div>
            <p className="timeline__item__description">{description}</p>
        </div>
    )
}