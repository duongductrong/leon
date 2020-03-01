import React from 'react';

class Item extends React.Component {
    render() {
        return (
            <div className="hello"></div>
        )
    }
}

class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return (
            <div className="timeline">
                {
                    children
                }
            </div>
        )
    }
}

export default Timeline;