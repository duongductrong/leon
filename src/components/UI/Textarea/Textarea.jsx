import React from 'react';

class Textarea extends React.Component {
    render() {
        const { name, id, cols, rows, className, value, onChange } = this.props;
        const { children } = this.props;
        return (
            <textarea className={`textarea${`${className ? " " + className : ""}`}`} onChange={onChange} name={name} value={value} id={id} cols={cols} rows={rows} value={children}></textarea>
        )
    }
}

Textarea.defaultProps = {
    cols: "300px",
    rows: "100%",
}

export default Textarea;