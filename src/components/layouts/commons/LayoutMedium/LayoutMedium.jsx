import React from 'react';

class LayoutMedium extends React.Component {
    render() {
        let classNameOriginal = "layout-medium";
        const { children, className, style } = this.props;
        //Class name
        if(className) {
            classNameOriginal = `${classNameOriginal} ${className}`
        }
        
        return (
            <div style={style} className={`${classNameOriginal}`}>
                { children }
            </div>
        )
    }
}

LayoutMedium.defaultProps = {
    className: ""
}

export default LayoutMedium;