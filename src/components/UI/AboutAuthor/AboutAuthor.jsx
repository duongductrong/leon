import React from 'react';

class AboutAuthor extends React.Component {
    render() {
        const { image, name, description } = this.props;
        const { style } = this.props;
        return (
            <div style={style} className="about-author">
                <img src={image} className="about-author__image" />
                <div className="about-author__content">
                    <h3 className="about-author__content__name"> {name} </h3>
                    <p className="about-author__content__description"> {description} </p>
                </div>
            </div>
        )
    }
}

export default AboutAuthor;