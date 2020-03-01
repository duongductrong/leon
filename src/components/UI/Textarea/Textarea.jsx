import React from 'react';

class Textarea extends React.Component {
    render() {
        const { name, id, cols, rows, className } = this.props;
        const { children } = this.props;
        return (
            <textarea className={`textarea${`${className ? " " + className : ""}`}`} name={name} id={id} cols={cols} rows={rows} value={children}></textarea>
        )
    }
}

Textarea.defaultProps = {
    cols: "300px",
    rows: "100%",
}

export default Textarea;