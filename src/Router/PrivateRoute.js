import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Axios from 'axios';
import Module from '../modules/Module';

const checkAuth = () => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/users/user_authorization`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: true
        }
    }

    componentWillMount() {
        checkAuth()
        .then(res => {
            const { data } = res;
            if(data.status === "auth" && data["user"].permission === "admin") 
                this.setState({isAuth: true})
            else {
                this.setState({isAuth: false})
            }
        })
    }

    render() {
        const { path, component, exact } = this.props;
        const { isAuth } = this.state;
        return (
            <React.Fragment>
                {
                    isAuth ? 
                    <Route path={path} exact={exact} component={component} /> :
                    Module.Redirect("/")
                }
            </React.Fragment>
        )
    }
}

PrivateRoute.defaultProps = {
    exact: false
}

export default PrivateRoute;