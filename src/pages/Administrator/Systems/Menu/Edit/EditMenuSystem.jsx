import React from 'react';
import { Form, Input, Typography, Button, message, notification } from 'antd';
import Module from '../../../../../modules/Module';
import Axios from 'axios';
import { fetchAPIMenu } from '../Create/request';

const { Title } = Typography;

const layoutForm = {
    wrapperCol: {
        xs: {
            span: 20
        },
        sm: {
            span: 18
        }
    },
    labelCol: {
        xs: {
            span: 4
        },
        sm: {
            span: 6
        }
    },
    labelAlign: "left"
}

const layoutBtn = {
    wrapperCol: {
        xs: {
            span: 20,
            offset: 4
        },
        sm: {
            span: 18,
            offset: 6
        }
    }
}

const apiUpdateMenu = (id, data) => {
    return new Promise((resolve ,reject) => {
        return Axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/menuItem/${id}`,
            headers: {
                Authorization : `Bearer ${window.localStorage.getItem("access_token")}`
            },
            data
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
}

class EditMenuSystem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }

    fetchMenu = (id) => {
        const { form } = this.props;
        this.setState({loading: true}, () => {
            fetchAPIMenu(id)
            .then(res => {
                const { data } = res;
                if(data["status"] !== "error" && data["status"] === "ok") {
                    this.setState({loading: false}, () => {
                        //set file
                        const { menu_item } = data;
                        form.setFieldsValue({["label"]: menu_item["label"]})
                        form.setFieldsValue({["url"]: menu_item["url"]})
                        //notification
                        message.success(data["msgVi"]);
                    })
                    
                }
                else {
                    this.setState({loading: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`))
                }
            })
            .catch(err => this.setState({loading: false}, () => message.error(err)))
        })
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        const { form, id } = this.props;
        form.validateFields((err, values) => {
            if(!err) {
                this.setState({loading: true}, () => {
                    //Request create navigation/menu
                    apiUpdateMenu(id, values)
                    .then(data => {
                        //Not error, response is -> ok
                        if(data["status"] !== "error" && data["status"] === "ok") {
                            this.setState({loading: false}, () => {
                                message.success(data["msgVi"], 0.2, () => window.location.reload()) //notification for user is success create
                            })
                        }
                        else {
                            //Show error, response is -> error
                            this.setState({loading: false}, () => {
                                const keyErrors = Object.keys(data["errors"]);
                                keyErrors.map(key => {
                                    notification["error"]({
                                        message: key,
                                        description: data["errors"][key].msgVi
                                    })
                                })
                            })
                        }
                    }) //Show error
                    .catch(err => this.setState({loading: false}, () => message.error(err)))
                })
            } 
        })
    }

    validateUrl = (rule, value, cb) => {
        if(value && (value.indexOf(" ") !== -1 || value.indexOf("_") !== -1)) {
            cb("The path does not include spaces, underscores/underline");
        }
        else {
            cb();
        }
    }

    onReset = () => this.props.form.resetFields();

    componentDidMount() {
        this.fetchMenu(this.props.id)
    }

    render() {
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
        const { loading } = this.state;
        return (
            <div className="create-menu-system">
                <Form onSubmit={this.onHandleSubmit} {...layoutForm} >
                    <Form.Item label="Name label">
                        {
                            getFieldDecorator("label", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Label name cannot be empty"
                                    }
                                ]
                            })(<Input onChange={(e) => setFieldsValue({["url"]: Module.ConvertURL(e.target.value)})} placeholder="Please type your label " />)
                        }
                    </Form.Item>
                    <Form.Item label="Url label">
                        {
                            getFieldDecorator("url", {
                                rules: [
                                    {
                                        required: true,
                                        message: "The url cannot be empty"
                                    },
                                    {
                                        validator: this.validateUrl
                                    }
                                ]
                            })(<Input placeholder="Please type your url" />)
                        }
                    </Form.Item>
                    <Form.Item {...layoutBtn}>
                        <Button type="primary" htmlType="submit" loading={loading}> Update label </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create({name: "edit-menu-system"})(EditMenuSystem);