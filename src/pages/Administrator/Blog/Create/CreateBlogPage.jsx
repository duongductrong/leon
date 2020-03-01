import React from 'react';
import Axios from 'axios';
import { Form, Button, Input, Select, message, Icon, notification } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Redirect } from 'react-router-dom';
import LibraryImages from '../../../../components/UI/LibraryImages/LibraryImages';
import Module from '../../../../modules/Module';
import { createBlogAPI, uploadImageCallBack } from '../http_request';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { Option } = Select;
const { TextArea } = Input;

const FetchCategories = (query = "") => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/categories${query}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

class CreateBlogPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            treeTagsSelected: [], //selected tags/categories
            description: "",
            isShowLib: false, // for library image -> state
            imageSelectedFromLib: "", //return image selected from library images
            loadingPage: false, //Loading all create page
            loadingTags: false, //Loading for tag/category -> call api get value
            created: false
        }

        this.fetchTags = this.fetchTags.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeEditor = this.onChangeEditor.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    onChangeEditor = editorState => {
        this.setState({editorState})
    };
    onChangeDescription = (e) => this.setState({description: e.target.value});

    fetchTags = () => {
        this.setState({loadingTags: true}, () => {
            FetchCategories()
            .then(res => {
                //get data response from api
                const { data } = res;
                if(data["status"] !== "error" && data["status"] === "ok") {
                    let categories = data["categories"].map(category => {
                        return (<Option key={category._id}> {category.name} </Option>)
                    })
                    this.setState({
                        loadingTags: false,
                        treeTagsSelected: categories
                    })
                }
                else {
                    //Loading false, show error
                    this.setState({loadingTags: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`));
                }
            }) //Error => show error
            .catch(err => this.setState({loadingTags: false}, () => message.error(err)))
        })
    }

    onValidateUrlBlog = (rules, value, cb) => {
        if(value && (value.indexOf(" ") !== -1 || value.indexOf("_") !== -1)) {
            cb("The path does not include spaces, underscores/underline");
            return;
        }
        else {
            cb();
        }
    }

    onHandleSubmit(e) {
        e.preventDefault();
        const { form } = this.props;
        form.validateFields((err, values) => {
            if(!err) {
                this.setState({loadingPage: true}, () => {
                    createBlogAPI(
                        {
                            ...values,
                            categories: values["tags"],
                            paragraph: Module.EditorToHtml(this.state.editorState)
                        }
                    )
                    .then(res => {
                        const { data } = res;
                        if(data["status"] !== "error" && data["status"] === "ok") {
                            this.setState({loadingPage: false, created: true}, () => {
                                message.success(data["msgVi"]) //notification
                            })
                        }
                        else {
                            this.setState({loadingPage: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`))
                            if(data["errors"]) {
                                let errors = Object.keys(data["errors"]);
                                //loop list errors to show
                                errors.map(error => {
                                    notification["error"]({
                                        message: error, //get name error
                                        description: data["errors"][error].msgVi //get value of error in errors
                                    })
                                })
                            }
                        }
                    })
                    .catch(err => this.setState({loadingPage: false}, () => message.error(err)))
                })
            }
        })
    }

    componentDidMount() {
        this.fetchTags();
    }

    render() {
        const { getFieldDecorator, getFieldValue, setFields , setFieldsValue} = this.props.form;
        const { editorState, treeTagsSelected, description, loadingPage, loadingTags, isShowLib, created } = this.state;
        return (
            <div className="create-blog-page">
                {
                    created && <Redirect to={`/administrator/blog/edit/${getFieldValue("url")}`} />
                }
                <Form className="create-blog-page__form" onSubmit={this.onHandleSubmit}>
                    <div className="create-blog-page__grid">
                        <div className="create-blog-page__grid__main">
                            <Form.Item label="Title">
                                {getFieldDecorator("title",{
                                    rules: [{required: true, message: "Can not leave the title blank"}] //Validate class 1
                                })(
                                    <Input 
                                    size="large" 
                                    onChange={(e) => setFieldsValue({["url"]: Module.ConvertURL(e["target"].value)})} 
                                    prefix={<Icon type="info-circle" />} 
                                    placeholder="Title for blog" />
                                )}
                            </Form.Item>
                            <Form.Item label="Url">
                                {getFieldDecorator("url",{
                                    rules: [
                                        {required: true, message: "Can not leave the url blank"}, //validate class 1
                                        { validator: this.onValidateUrlBlog } //validate class 2
                                    ]
                                })(
                                    <Input addonBefore={`${window.location.origin}/blog/`} placeholder="Url for blog" />
                                )}
                            </Form.Item>
                            <Form.Item label="Paragraph">
                                {getFieldDecorator("paragraph", { rules: [ { required: true, message: "Can not leave the paragraph blank" } ] })(
                                    <Editor
                                        toolbar={{
                                            inline:  {inDropdown: true},
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            image: {
                                                uploadCallback: uploadImageCallBack, 
                                                defaultSize: {width: "auto", height: "500"} , 
                                                alt: { present: true, mandatory: true },
                                                previewImage: true
                                            }
                                        }}
                                        mention={{
                                            separator: ' ',
                                            trigger: '@',
                                            suggestions: [
                                              { text: 'APPLE', value: 'apple', url: 'apple' },
                                              { text: 'BANANA', value: 'banana', url: 'banana' },
                                              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                                              { text: 'DURIAN', value: 'durian', url: 'durian' },
                                              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                                              { text: 'FIG', value: 'fig', url: 'fig' },
                                              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                                              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                                            ]
                                        }}
                                        hashtag={{}}
                                        editorState={editorState}
                                        wrapperClassName="create-blog-page__form__editor"
                                        editorClassName="create-blog-page__form__demo-editor"
                                        onEditorStateChange={this.onChangeEditor}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Description blog">
                                {getFieldDecorator("description", {rules: [ { required: true, message: "Can not leave the description blank" } ]})(
                                    <TextArea autoSize={{minRows: 10, maxRows: 12}} />
                                )}
                            </Form.Item>
                        </div>
                        <div className="create-blog-page__grid__side">
                            <div className="create-blog-page--box">
                                <Button className="create-blog-page--btn" type="primary" htmlType="submit" block>Đăng bài</Button>
                            </div>
                            <div className="create-blog-page--box">
                                <Form.Item label={`Tags - Selected ${(getFieldValue("tags") && getFieldValue("tags").length) || 0}`}> 
                                    {
                                        getFieldDecorator("tags",{
                                            rules: [{required: true, message: "At least one tag must be selected"}]
                                        })(
                                            <Select mode="multiple" tokenSeparators={[","]} size="default" loading={loadingTags}>
                                                {treeTagsSelected}
                                            </Select>
                                        )
                                    }
                                </Form.Item>
                            </div>
                            <div className="create-blog-page--box">
                                <Form.Item label="Thumbnail">
                                    {getFieldDecorator("thumbnail", { rules: [ {required: true, message: "Can not leave the thumbnail blank"} ] })(
                                        <React.Fragment>
                                            <Button type="dashed" onClick={() => this.setState({isShowLib: true})} block>Chọn ảnh</Button>
                                            {
                                                getFieldValue("thumbnail") && <img style={{marginTop: "10px"}} src={getFieldValue("thumbnail")} width="100%" />
                                            }
                                        </React.Fragment>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
                {
                    isShowLib && 
                    <LibraryImages
                    onClose={() => this.setState({isShowLib: false})}
                    onAdd={(image) => () => this.setState({isShowLib: false}, () => setFields({ thumbnail: { value: image[0], errors: [""] } }))} amountAdd={1}/>
                }
            </div>
        )
    }
}

const WrapperCreateBlogPage = Form.create({name: "create-blog-page"})(CreateBlogPage);

export default WrapperCreateBlogPage;