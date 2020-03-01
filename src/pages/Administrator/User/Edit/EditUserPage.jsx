import React from 'react';
import { Form, Input, Button, Typography, message, notification } from 'antd';
import { formLayout, itemLayout } from './constants';
import { Redirect } from 'react-router-dom';
import Module from '../../../../modules/Module'
import { getUserAPI, updateUserAPI } from '../http_request';

const { Title } = Typography;

class EditUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdatePassword: false,
            loading: false,
            got: true
        }

        this.onHandleSubmit = this.onHandleSubmit.bind(this); //Handle submit data update
        this.onUpdatePassword = this.onUpdatePassword.bind(this); //Handle status update password 
    }

    fetchUser(id) {
        const { form } = this.props;
        //get detail user
        getUserAPI(id)
        .then(res => {
            const { data } = res;
            //response ok
            if(data["status"] !== "error" && data["status"] === "ok") {
                this.setState({loading: false}, () =>{
                    const { user } = data;
                    //set value of field for user
                    message.success(data["msgVi"]);
                    form.setFieldsValue({["username"]: user.username});
                    form.setFieldsValue({["firstname"]: user.firstname});
                    form.setFieldsValue({["lastname"]: user.lastname});
                    form.setFieldsValue({["email"]: user.email});
                    form.setFieldsValue({["permission"]: user.permission})
                });
            } //response error
            else {
                this.setState({got: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`, 1));
            }
        }) //Error
        .catch(err => this.setState({loading: false}, () => message.error(err)));
    }
    
    //Validate username
    validateToUsername = (rule, value, cb) => {
        if(value && value.indexOf(" ") !== -1) {
            cb("User account name does not contain whitespace");
        }
        else {
            cb();
        }
    }

    //Validate password confirm
    validateConfirm = (rule, value, cb) => {
        const { form } = this.props;
        if(this.state.isUpdatePassword && value) {
            if(value && value !== form.getFieldValue("password")) {
                cb("The setup password and confirmation password are not the same");
            }
            else {
                cb();
            }
        }
        else {
            cb();
        }
    }

    //Validate password
    validatePassword = (rule, value, cb) => {
        let patternPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
        if(this.state.isUpdatePassword && value) {
            if(value && !patternPass.test(value)) {
                cb("Password includes only uppercase, lowercase, numbers and over 8 characters");
            }
            else {
                cb();
            }
        }
        else {
            cb();
        }
    }

    //Validate permission
    validatePermision = (rule, value, cb) => {
        const listPermision = ["admin", "member", "writer"];
        let result = listPermision.find(e => e === value);
        if(value && !result) {
            cb(`Permission includes: ${listPermision.join(",")}`)
        }
        else {
            cb();
        }
    }

    //Change state update password
    onUpdatePassword = () => {
        this.setState({isUpdatePassword: !this.state.isUpdatePassword});
    }

    //Submit
    onHandleSubmit = (e) => {
        e.preventDefault();
        const { form, match } = this.props;
        const { isUpdatePassword } = this.state;
        //Validate all fields and submit data
        form.validateFields((err, values) => {
            if(!err) {
                this.setState({loading: true}, () => {
                    //request post create new user
                    //change values to submit api
                    isUpdatePassword ? 
                    values = {
                        ...values,
                        old_password: values["old_password"],
                        confirm_password: values["confirm"]
                    } : 
                    values = {
                        username: values["username"],
                        firstname: values["firstname"],
                        lastname: values["lastname"],
                        email: values["email"],
                        permission: values["permission"]
                    }

                    //Updat user detail
                    updateUserAPI(match["params"].id, values)
                    .then(res => {
                        const { data } = res;
                        //response ok, not error
                        if(data["status"] !== "error" && data["status"] === "ok") {
                            //Create new user completed, not error, stoping loading and notice for user was created new account
                            this.setState({created: true, loading: false}, () => message.success(data["msgVi"], 1));
                        }
                        else {
                            //response errors
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

    componentDidMount() {
        //get user
        this.fetchUser(this.props.match.params["id"]);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading, got, isUpdatePassword } = this.state;
        return (
            <div className="create-user-page">
                {
                    !got && <Redirect to={`/administrator/user/`} />
                }
                <Form {...formLayout} onSubmit={this.onHandleSubmit} className="create-user-page__wrapper">
                    <Title className="create-user-page__wrapper__title" level={2}> Form Update User </Title>
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
                        })(<Input placeholder="type your username" disabled={true}/>)}
                    </Form.Item>
                    {
                        isUpdatePassword && <Form.Item label="Old Password" hasFeedback>
                            {getFieldDecorator("old_password", {
                                rules: [
                                    {
                                        required: isUpdatePassword ? true : false,
                                        message: "Please input your old password!"
                                    },
                                    {
                                        validator: this.validatePassword
                                    }
                                ]
                            })(<Input.Password disabled={!isUpdatePassword} placeholder="type your old password" />)}
                        </Form.Item>
                    }
                    {
                        isUpdatePassword && <Form.Item label="Password" hasFeedback>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: isUpdatePassword ? true : false,
                                        message: "Please input your password!"
                                    },
                                    {
                                        validator: this.validatePassword
                                    }
                                ]
                            })(<Input.Password disabled={!isUpdatePassword} placeholder="type your password" />)}
                        </Form.Item>
                    }
                    {
                        isUpdatePassword && <Form.Item label="Confirm Password" hasFeedback>
                            {getFieldDecorator("confirm", {
                                rules: [
                                    {
                                        required: isUpdatePassword ? true : false,
                                        message: "Please input your password confirm!"
                                    },
                                    {
                                        validator: this.validateConfirm
                                    }
                                ]
                            })(<Input.Password disabled={!isUpdatePassword} placeholder="type your password confirm" />)}
                        </Form.Item>
                    }
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
                    <Form.Item label="Permission">
                        {getFieldDecorator('permission', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Lastname!',
                                },
                                {
                                    validator: this.validatePermision
                                }
                            ],
                        })(<Input placeholder="Your permission" />)}
                    </Form.Item>
                    <Form.Item {...itemLayout}>
                        <Button type="primary" htmlType="submit" loading={loading}> Update detail user </Button>
                        <Button style={{marginLeft: "10px"}} onClick={this.onUpdatePassword}>Set new password</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrapperEditUserPage = Form.create({name: "edit-user-page"})(EditUserPage);

export default WrapperEditUserPage;