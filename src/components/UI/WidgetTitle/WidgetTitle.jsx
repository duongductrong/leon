import React from 'react';

class WidgetTitle extends React.Component {
    render() {
        const { children, left, center, right, style } = this.props;
        const styleSheet = {
            textAlign: left ? "left" : center ? "center" : right ? "right" : "initial"
        }
        return (
            <h1 style={{...styleSheet, ...style}} className="widget-title"> {children} </h1>
        )
    }
}

export default WidgetTitle