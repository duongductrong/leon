import React from 'react';
import Input from '../../components/UI/Input/Input';
import Label from '../../components/UI/Label/Label';
import Button from '../../components/UI/Button/Button';
import Axios from 'axios';
import { message, notification } from 'antd';
import Module from '../../modules/Module';

const registerUser = (data) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/users`,
            data
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email: "",
            loading: false
        }
    }

    onRegister = (e) => {
        e.preventDefault();
        const { username, password, firstname, lastname, email } = this.state;
        let data = {username, password, firstname, lastname, email};
        registerUser(data)
        .then(data => {
            const { status, msgVi, code, errors } = data;
            if(status !== "error" && status === "ok") {
                this.setState({loading: false}, () => message.success("Đăng ký thành công"));
            }
            else {
                this.setState({loading: false}, () => message.error(`${status} ${code}: ${msgVi}`));
                if(!Module.isEmptyObj(errors)) {
                    let keyErrors = Object.keys(errors);
                    keyErrors.forEach(error => {
                        notification["error"]({
                            message: error,
                            description: errors[error].msgVi
                        })
                    })
                }
            }
        })
        .catch(err => {
            this.setState({loading: false}, message.error(err));
        })
    }

    componentDidMount() {
        document.title = "Register - Leon !"
    }
    
    render() {
        const { username, password, firstname, lastname, email } = this.state;
        return (
            <div className="register-page">
                <h1 className="register-page__title">
                    REGISTER ACCOUNT
                </h1>
                <form onSubmit={this.onRegister} className="register-page__form">
                    <div className="register-page__form__group">
                        <Label htmlFor="username">Username*</Label>
                        <Input onChange={({target}) => this.setState({username: target.value})} value={username} type="text" placeholder="Your username" />
                    </div>
                    <div className="register-page__form__group">
                        <Label htmlFor="username">Password*</Label>
                        <Input onChange={({target}) => this.setState({password: target.value})} value={password} type="password" placeholder="Your password" />
                    </div>
                    <div className="register-page__form__group">
                        <Label htmlFor="username">Firstname*</Label>
                        <Input onChange={({target}) => this.setState({firstname: target.value})} value={firstname} type="text" placeholder="Your firstname" />
                    </div>
                    <div className="register-page__form__group">
                        <Label htmlFor="username">Lastname*</Label>
                        <Input onChange={({target}) => this.setState({lastname: target.value})} value={lastname} type="text" placeholder="Your lastname" />
                    </div>
                    <div className="register-page__form__group">
                        <Label htmlFor="username">Email*</Label>
                        <Input onChange={({target}) => this.setState({email: target.value})} value={email} type="email" placeholder="Your Email" />
                    </div>
                    <Button type="submit" className="">Đăng ký</Button>
                </form>
            </div>
        )
    }
}

export default RegisterPage;