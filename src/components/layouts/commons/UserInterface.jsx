import React from 'react';
import MenuUI from './Menu/UI/MenuUI';
import Footer from './Footer/Footer';

//administrator
import NavigationAdministrator from './Menu/Administrator/NavigationAdministrator';

// const UI = (component) => (
//     <MenuUI />
//     {
//         component
//     }
//     <Footer />
// )

const UI = (props) => {
    const { children } = props;
    return (
        <React.Fragment>
            <MenuUI />
            { children }
            <Footer />
        </React.Fragment>
    )
}

const Administrator = (props) => {
    const { children } = props;
    return (
        <NavigationAdministrator>
            { children }
        </NavigationAdministrator>
    )
}

class UserInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdministratorTheme: false
        }
    }
    componentDidMount() {
        if(window.location.pathname.indexOf("administrator") !== -1) {
            this.setState({isAdministratorTheme: true})
        }
    }

    render() {
        const { children } = this.props;
        const { isAdministratorTheme } = this.state;
        return (
            <React.Fragment>
                {
                    !isAdministratorTheme ? <UI> {children} </UI> : <Administrator> {children} </Administrator>
                }
            </React.Fragment>
        )
    }
}

export default UserInterface;