import React from 'react';
import { Form, Input, Button, message, notification } from 'antd';
import LibraryImages from '../../../../components/UI/LibraryImages/LibraryImages';
import Module from '../../../../modules/Module';
import { createCategoryAPI } from '../http_request';

class CreateCategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleLibraryImage: false,
            loading: false
        }

        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    onHandleSubmit = e => {
        e.preventDefault();
        const { form } = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true}, () => {
                    createCategoryAPI(values)
                    .then(res => {
                        const { data } = res;
                        if(data.status !== "error") {
                            message.success(data.msgVi);
                            form.resetFields();
                            this.setState({loading: false})
                        }
                        else {
                            const { errors } = data;
                            this.setState({loading: false})
                            //Bắt lỗi xác thực trước khi khởi tạo
                            if(errors) {
                                //get keys error
                                const keys = Object.keys(errors);
                                keys.map(key => {
                                    notification["error"]({
                                        message: key,
                                        description: errors[key].msgVi //get value of key error
                                    })
                                })
                            }
                            else {
                                //Chưa xác thực tài khoảng, báo lỗi
                                notification["error"]({
                                    message: "Authorization",
                                    description: data.msgVi
                                })
                            }
                        }
                    })
                    .catch(err => {
                        this.setState({loading: false})
                        message.error(err);
                    })
                })
            }
        })
    }

    onValidateUrl(rule, value, cb) {
        //validate url input
        if(value && value.indexOf(" ") !== -1) {
            cb([{message: "Path has no spaces"}])
        }
        else {
            cb()
        }
    }

    onAdd = (list) => () => {
        //turn off library image and set value
        this.setState({visibleLibraryImage: false});
        this.props.form.setFieldsValue({["thumbnail"]: list[0]})
    }

    //turn off library image
    onClose = () => this.setState({visibleLibraryImage: false});

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { visibleLibraryImage, loading } = this.state;

        return (
            <div className="create-category-page">
                <h1 className="create-category-page__title">
                    Create new category
                </h1>
                <Form onSubmit={this.onHandleSubmit} className="create-category-page__form">
                    <Form.Item label="Name">
                        {
                            getFieldDecorator("name", { rules: [{required: true, message: "Please type category name"}] })
                            ( <Input type="text" placeholder="Name of category" onChange={(e) => this.props.form.setFieldsValue({["url"]: Module.ConvertURL(e.target.value)})} /> )
                        }
                    </Form.Item>
                    <Form.Item label="Url">
                        {getFieldDecorator("url", { rules: [
                            { required: true, message: "Please type your url" },
                            { required: true, validator: this.onValidateUrl }
                        ] })(
                            <Input type="text" placeholder="Url of category" />
                        )}
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input type="text" placeholder="Description of category" />
                    </Form.Item>
                    <Form.Item label="Thumbnail">
                        {getFieldDecorator("thumbnail", { rules: [{required: true, message: "Please choose image in button \'Chọn ảnh\' "}] })(
                            <Input type="text" placeholder="Thumbnail" disabled={true} />
                        )}
                        <Button type="dashed" onClick={() => this.setState({visibleLibraryImage: true})}>Chọn ảnh</Button>
                        { getFieldValue("thumbnail") && <img style={{objectFit: "cover"}} width="100%" height="250px" src={getFieldValue("thumbnail")} /> }
                    </Form.Item>
                    <Button type="primary" htmlType="submit" disabled={loading}>Create</Button>
                </Form>
                {
                    visibleLibraryImage && 
                    <LibraryImages 
                        amountAdd={1} 
                        onClose={this.onClose} 
                        onAdd={this.onAdd} />
                }
            </div>
        )
    }
}

const WrapperCreateCategoryPage = Form.create({name: "create-category-page"})(CreateCategoryPage);

export default WrapperCreateCategoryPage;