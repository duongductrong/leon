import React from 'react';

export default function TimelineTitle({title, children}) {
    return (
        <h2 className="timeline__title">{ title || children }</h2>
    )
}