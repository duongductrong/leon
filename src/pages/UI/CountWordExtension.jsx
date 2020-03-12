import React from 'react';
import { Form, Input, Button, Tag } from 'antd';
import LayoutMedium from '../../components/layouts/commons/LayoutMedium/LayoutMedium';

class CountWordExtension extends React.Component {
    
    state = {
        count: 0
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFields((err, result) => {
            if(!err) {
                let { content } = result;
                content = content.split(" ").filter(e => e !== "" && e !== " ");
                this.setState({count: content.length})
            }
        })
    }

    render() {
        const { count } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <LayoutMedium>
                <div className="count-word-extension">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Item name="content" label="Your content">
                            {getFieldDecorator("content", {
                                rules: [{ required: true, message: "Can not leave the content blank" }]
                            })(<Input.TextArea rows={10} />)}
                        </Form.Item>
                        <Button type="primary" htmlType="submit">COUNT</Button>
                    </Form>
                    <p>Count word: <Tag color="magenta"> {count} </Tag></p>
                </div>
            </LayoutMedium>
        )
    }
}

export default Form.create({name: "count-word-extension"})(CountWordExtension);