import React from 'react';

class Input extends React.Component {
    render() {
        const { className, style, type, placeholder, value, onClick, onChange, id, name } = this.props;
        return (
            <React.Fragment>
                <input name={name} className={`input${` ${className}`}`} style={style} id={id} type={type} placeholder={placeholder} value={value} onClick={onClick} onChange={onChange} />
            </React.Fragment>
        )
    }
}

export default Input;