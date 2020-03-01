import React from 'react';

class Label extends React.Component {
    render() {
        const { htmlFor, children } = this.props;
        return (
            <label htmlFor={htmlFor} className="label"> {children} </label>
        )
    }
}

export default Label;