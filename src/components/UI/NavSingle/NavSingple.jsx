import React from 'react';
import WidgetTitle from '../WidgetTitle/WidgetTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

class NavSingle extends React.Component {
    render() {
        const { nextPost,  prevPost, style } = this.props;
        return (
            <div style={style} className="nav-single__direction">
                <div className="nav-single__direction__left">
                    <WidgetTitle style={{margin: "10px 0"}} left>PREVIOUS POST</WidgetTitle>
                    <div className="nav-single__direction__content nav-single__direction__left__content">
                        <NavLink to={prevPost ? prevPost.url : "/"}>
                            <FontAwesomeIcon icon={faArrowLeft} /> 
                            <h2> {prevPost.title} </h2>
                        </NavLink>
                    </div>
                </div>
                <div className="nav-single__direction__right">
                    <WidgetTitle style={{margin: "10px 0"}} style={{margin: "10px 0"}} right>NEXT POST</WidgetTitle>
                    <div className="nav-single__direction__content nav-single__direction__right__content">
                        <NavLink to={nextPost ? nextPost.url : "/"}>
                            <h2> {nextPost.title} </h2>
                            <FontAwesomeIcon icon={faArrowRight} /> 
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

NavSingle.defaultProps = {
    nextPost: {
        title: "",
        url: "/"
    },
    prevPost: {
        title: "",
        url: "/"
    }
}

export default NavSingle;