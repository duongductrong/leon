import React from 'react';
import { Form, Input, Typography, Button, message, notification, Select } from 'antd';
import Module from '../../../../../modules/Module';
import { createNav, fetchAPIMenu, postApiCreateSubmenu } from './request';

const { Option } = Select;

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

class CreateSubmenuSystem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            menuItem: []
        }
    }

    fetchMenuItem = () => {
        this.setState({loading: true}, () => {
            fetchAPIMenu()
            .then(res => {
                const {data} = res;
                if(data["status"] !== "error" && data["status"] === "ok") {
                    this.setState({loading: false, menuItem: data["menu"]})
                }
                else {
                    this.setState(
                        {loading: false}
                        , () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`)
                    )
                }
            })
            .catch(err => this.setState({loading: false}, () => message.error(err)));
        })
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        const { form, onReload } = this.props;
        form.validateFields((err, values) => {
            if(!err) {
                this.setState({loading: true}, () => {
                    //Request create navigation/menu
                    postApiCreateSubmenu(values)
                    .then(res => {
                        const { data } = res;
                        //Not error, response is -> ok
                        if(data["status"] !== "error" && data["status"] === "ok") {
                            this.setState({loading: false}, () => {
                                message.success(data["msgVi"]) //notification for user is success create
                                form.resetFields(); //reset all fields of form
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

    onReset = () => {
        this.props.form.resetFields();
    }

    componentDidMount() {
        this.fetchMenuItem()
    }

    render() {
        const { getFieldDecorator,  setFieldsValue } = this.props.form;
        const { reload } = this.props;
        const { menuItem } = this.state;
        return (
            <div className="create-menu-system">
                <Form onSubmit={this.onHandleSubmit} {...layoutForm} >
                    {/* <Title level={1}>Create Navigation</Title> */}
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
                    <Form.Item label="Select menu">
                        {
                            getFieldDecorator("menu", {
                                rules: [
                                    {
                                        required: true,
                                        message: "The menu id cannot be empty"
                                    }
                                ]
                            })(
                                <Select>
                                    {
                                        menuItem && menuItem.map((item, i) => (
                                            <Option key={item._id} value={item._id}> {item.label} </Option>
                                        ))
                                    }
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...layoutBtn}>
                        <Button type="primary" htmlType="submit"> Create </Button>
                        <Button style={{marginLeft: "10px"}} onClick={this.onReset}> Reset </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrapperSubmenuSystem = Form.create({name: "create-submenu-system"})(CreateSubmenuSystem);

export default WrapperSubmenuSystem;