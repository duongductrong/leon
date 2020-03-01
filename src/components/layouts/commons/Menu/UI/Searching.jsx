import React from 'react';
import LayoutMedium from '../../LayoutMedium/LayoutMedium';

class Searching extends React.Component {
    render() {
        return (
            <LayoutMedium style={{zIndex: "5"}}>
                <div className="menu-ui__searching">
                    <h1 className="menu-ui__searching__title">SEARCH HERE</h1>
                    <input className="menu-ui__searching__content" type="text" placeholder="type and hit enter" />
                </div>
            </LayoutMedium>
        )
    }
}

export default Searching;