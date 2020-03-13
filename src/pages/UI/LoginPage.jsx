import React from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom';
import UserInterface from '../../components/layouts/commons/UserInterface';
import Label from '../../components/UI/Label/Label';
import InputUI from '../../components/UI/Input/Input';
import ButtonUI from '../../components/UI/Button/Button';
import { Checkbox, message } from 'antd';
import Module from '../../modules/Module';

const login = (url, data) => {
    return new Promise((resolve, reject) => {
        Axios({method: "POST", url: url, data: data})
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

const checkLoginAPI = () => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/users/user_authorization`,
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`
            }
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false,
            isAuth: null
        }
    }

    onToTopAfterLoaded = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    checkLogin = () => {
        if(Cookies.get("access_token")) {
            checkLoginAPI()
            .then(data => {
                if(data.status === "auth" && data["user"].permission === "admin") 
                    this.setState({isAuth: true})
                else 
                    this.setState({isAuth: false}, () => message.warn("Cảnh báo: Người dùng sẽ không thể đăng nhập hệ thống"))
            })
            .catch(err => {
                this.setState({isAuth: false})
            })
        }
    }

    onChangeUsername = (e) => this.setState({username: e.target.value});

    onChangePassword = (e) => this.setState({password: e.target.value});

    onHandleLogin = (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        let notice = message.loading("Đang đăng nhập hệ thống", 1) //Notice handling login
        this.setState({loading: true}, () => {
            login(`${process.env.REACT_APP_API_ENDPOINT}/api/users/login`,{username, password})
            .then(res => {
                const { data } = res;
                if(data.status === "error") {
                    //notice
                    notice.then(() => message.error(data.msgVi))
                }
                else {
                    //notice
                    notice
                    .then(() => message.success(data["msgVi"] + " - sắp chuyển hướng"), 0.2)
                    .then(() => Cookies.set("access_token", data.token, { expires: Module.newExpires(60) }))
                    .then(() => Module.Redirect("/administrator")) //redirect administrator
                }
            })
            .catch(err => {
                notice.then(() => message.error(err))
            })
        })
    }

    componentWillMount() {
        this.onToTopAfterLoaded();
        this.checkLogin();
    }

    componentDidMount() {
        document.title = "Login - Leon"
    }

    render() {
        const { username, password, isAuth, loading } = this.state;
        return (
            <React.Fragment>
                {
                    (isAuth !== null && isAuth === true) && Module.Redirect("/administrator")
                }
                <form onSubmit={this.onHandleLogin} className="login-page">
                    <h1 className="login-page__title"> Login </h1>
                    <div className="login-page__group">
                        <Label htmlFor="username">Username*</Label>
                        <InputUI type="text" placeholder="Your username" onChange={this.onChangeUsername} value={username} />
                    </div>
                    <div className="login-page__group">
                        <Label htmlFor="username">Password*</Label>
                        <InputUI type="password" placeholder="Your password" onChange={this.onChangePassword} value={password} />
                    </div>
                    <Checkbox style={{display: "block", marginTop: "15px"}}>Remember me</Checkbox>
                    <ButtonUI style={{marginTop: "30px", textTransform: "uppercase"}} type="submit">{loading ? "Loading" : "Login now"}</ButtonUI>
                </form>
            </React.Fragment>
        )
    }
}

export default LoginPage;