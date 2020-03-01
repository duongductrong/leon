import React from 'react';
import { Form, Input, Typography, Button, message, notification, Select } from 'antd';
import {fetchAPISubMenu, fetchAPIMenu, postApiCreateSubmenu, putApiCreateSubmenu} from '../Create/request';
import Module from '../../../../../modules/Module';
import { layoutForm, layoutBtn } from './constants';

const { Option } = Select;

class EditSubmenuSystem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            menuItem: []
        }
    }

    fetchMenuItem = () => {
        //get menu item for form select
        this.setState({loading: true}, () => {
            //fetch data menu
            fetchAPIMenu()
            .then(res => {
                const {data} = res;
                //response -> ok
                if(data["status"] !== "error" && data["status"] === "ok") {
                    this.setState({loading: false, menuItem: data["menu"]})
                } // ->response -> error
                else {
                    this.setState(
                        {
                            loading: false
                        }
                        //notification
                        , () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`)
                    )
                }
            }) // -> error, notification error message
            .catch(err => this.setState({loading: false}, () => message.error(err)));
        })
    }

    fetchSubmenu = (id) => {
        const { form } = this.props;
        //init loading
        this.setState({loading: true}, () => {
            //fetch data old of submenu need edit
            fetchAPISubMenu(id)
            .then(res => {
                const { data } = res;
                //response -> ok
                if(data["status"] !== "error" && data["status"] === "ok") {
                    this.setState({loading: false}, () => {
                        //set file
                        const { sub_menu } = data;
                        form.setFieldsValue({["label"]: sub_menu["label"]})
                        form.setFieldsValue({["url"]: sub_menu["url"]})
                        form.setFieldsValue({["menu"]: sub_menu["menu"]})
                        //notification
                        message.success(data["msgVi"]);
                    })
                    
                } //response -> error
                else {
                    this.setState({loading: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`))
                }
            }) //error -> message UI
            .catch(err => this.setState({loading: false}, () => message.error(err)))
        })
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        const { form, id } = this.props;
        //validate all fields of form (form provider)
        form.validateFields((err, values) => {
            if(!err) {
                this.setState({loading: true}, () => {
                    //Request create navigation/menu
                    putApiCreateSubmenu(id, values)
                    .then(res => {
                        const { data } = res;
                        //Not error, response is -> ok
                        if(data["status"] !== "error" && data["status"] === "ok") {
                            this.setState({loading: false}, () => {
                                message.success(data["msgVi"], 0.2, () => window.location.reload()) //notification for user is success create
                            })
                        }
                        else {
                            //Show error, response is -> error
                            //error is array includes some object
                            this.setState({loading: false}, () => {
                                if(data["errors"]) {
                                    const keyErrors = Object.keys(data["errors"]); //return keys object
                                    keyErrors.map(key => {
                                        //Notification with key, values object
                                        notification["error"]({
                                            message: key,
                                            description: data["errors"][key].msgVi
                                        })
                                    })
                                } //errors is object simple
                                else {
                                    notification["error"]({
                                        message: "ERROR",
                                        description: data["msgVi"]
                                    })
                                }
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
        this.fetchMenuItem();
        this.fetchSubmenu(this.props.id);
    }

    render() {
        const { getFieldDecorator,  setFieldsValue } = this.props.form;
        const { menuItem } = this.state;
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
                        <Button type="primary" htmlType="submit"> Update </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create({name: "edit-submenu-system"})(EditSubmenuSystem);