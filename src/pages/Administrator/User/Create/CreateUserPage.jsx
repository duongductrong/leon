import React from 'react';
import { Form, Input, Button, Typography, message, notification } from 'antd';
import { formLayout, itemLayout } from './constants';
import { Redirect } from 'react-router-dom';
import { createUserAPI } from '../http_request';

const { Title } = Typography;

class CreateUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            created: false
        }
    }
    
    validateToUsername = (rule, value, cb) => {
        if(value && value.indexOf(" ") !== -1) {
            cb("User account name does not contain whitespace");
        }
        else {
            cb();
        }
    }

    validateConfirm = (rule, value, cb) => {
        const { form } = this.props;
        if(value && value !== form.getFieldValue("password")) {
            cb("The setup password and confirmation password are not the same");
        }
        else {
            cb();
        }
    }

    validatePassword = (rule, value, cb) => {
        let patternPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
        if(value && !patternPass.test(value)) {
            cb("Password includes only uppercase, lowercase, numbers and over 8 characters");
        }
        else {
            cb();
        }
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFields((err, values) => {
            if(!err) {
                this.setState({loading: true}, () => {
                    //request post create new user
                    createUserAPI(values)
                    .then(res => {
                        const { data } = res;
                        //response ok, not error
                        if(data["status"] !== "error" && data["status"] === "ok") {
                            //Create new user completed, not error, stoping loading and notice for user was created new account
                            this.setState({created: true, loading: false}, () => message.success(data["msgVi"], 1));
                        }
                        else {
                            //response errors
                            this.setState({loading: false});
                            const keyErrors = Object.keys(data["errors"]);
                            //loop keys error to show notification
                            keyErrors.map(err => {
                                //Notification for user includes message["Tên"], description: ["Lời nhắn"]
                                notification["error"]({
                                    message: err,
                                    description: data["errors"][err].msgVi
                                })
                            })
                        }
                    }) //Catch error -> notification for user
                    .catch(err => this.setState({loading: false}, message.error(err))); 
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading, created } = this.state;
        return (
            <div className="create-user-page">
                {
                    created && <Redirect to={`/administrator/user/`} />
                }
                <Form {...formLayout} onSubmit={this.onHandleSubmit} className="create-user-page__wrapper">
                    <Title className="create-user-page__wrapper__title" level={2}> Form Create User </Title>
                    <Form.Item label="Username" hasFeedback>
                        {getFieldDecorator("username", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your username!"
                                },
                                {
                                    validator: this.validateToUsername
                                }
                            ]
                        })(<Input placeholder="type your username" />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your password!"
                                },
                                {
                                    validator: this.validatePassword
                                }
                            ]
                        })(<Input.Password placeholder="type your password" />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator("confirm", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your password confirm!"
                                },
                                {
                                    validator: this.validateConfirm
                                }
                            ]
                        })(<Input.Password placeholder="type your password confirm" />)}
                    </Form.Item>
                    <Form.Item label="E-mail" hasFeedback>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                }
                            ],
                        })(<Input placeholder="Your email"/>)}
                    </Form.Item>
                    <Form.Item label="Firstname">
                        {getFieldDecorator('firstname', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Firstname!',
                                },
                            ],
                        })(<Input placeholder="Your Firstname" />)}
                    </Form.Item>
                    <Form.Item label="Lastname">
                        {getFieldDecorator('lastname', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Lastname!',
                                }
                            ],
                        })(<Input placeholder="Your Lastname" />)}
                    </Form.Item>
                    <Form.Item {...itemLayout}>
                        <Button type="primary" htmlType="submit" loading={loading}> Create new user </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrapperCreateUserPage = Form.create({name: "create-user-page"})(CreateUserPage);

export default WrapperCreateUserPage;