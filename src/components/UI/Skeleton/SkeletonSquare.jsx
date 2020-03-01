import React from 'react';

export default class SkeletonSquare extends React.Component {
    render() {
        const { width, height } = this.props;
        return (
            <div style={{width, height}} className="skeleton-square"></div>
        )
    }
}