import React from 'react';
import WidgetTitle from '../WidgetTitle/WidgetTitle'

class Aboutme extends React.Component {
    render() {
        const { title, image, description } = this.props;
        return (
            <div className="about-me">
                <WidgetTitle left> {title} </WidgetTitle>
                <img className="about-me__image" src={image} />
                <p className="about-me__description"> { description } </p>
            </div>
        )
    }
}

export default Aboutme;