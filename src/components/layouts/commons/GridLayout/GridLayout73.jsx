import React from 'react';

class GridLayout73 extends React.Component {
    render() {
        const { children } = this.props;
        const { style, className } = this.props;
        return (
            <div style={style} className={`grid-layout-73${className ? " " + className : ""}`}>
                <div className="grid-layout-73__main">
                    {
                        children[0]
                    }
                </div>
                <div className="grid-layout-73__side">
                    {
                        children[1]
                    }
                </div>
            </div>
        )
    }
}

GridLayout73.defaultProps = {
    children: {
        0: <div></div>,
        1: <div></div>
    }
}

export default GridLayout73;