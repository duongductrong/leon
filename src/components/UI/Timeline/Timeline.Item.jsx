import React from 'react';

export default function TimelineItem({date, name, location, description, currently}) {
    return (
        <div className={`timeline__item${currently ? " timeline--currently" : ""}`}>
            <small className="timeline__item__date">{date}</small>
            <h3 className="timeline__item__name">{name}</h3>
            <small className="timeline__item__location">{location}</small>
            <p className="timeline__item__description">{description}</p>
        </div>
    )
}