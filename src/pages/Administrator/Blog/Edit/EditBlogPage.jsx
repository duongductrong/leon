import React from 'react';
import Axios from 'axios';
import { Form, Button, Input, Select, message, Icon, notification, Alert } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Redirect } from 'react-router-dom';
import LibraryImages from '../../../../components/UI/LibraryImages/LibraryImages';
import Module from '../../../../modules/Module';
import { updateBlogAPI, getBlogAPI, uploadImageCallBack } from '../http_request';
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

class EditBlogPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            isFocusEditor: false,

            treeTagsSelected: [], //selected tags/categories
            description: "",

            isShowLib: false, // for library image -> state
            imageSelectedFromLib: "", //return image selected from library images

            loadingPage: false, //Loading all create page
            loadingTags: false, //Loading for tag/category -> call api get value

            updated: false,
            got: true
        }

        this.fetchTags = this.fetchTags.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeEditor = this.onChangeEditor.bind(this);
        this.onCloseLib = this.onCloseLib.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    onChangeEditor = editorState => this.setState({editorState}); //Function change editor state
    onChangeDescription = (e) => this.setState({description: e.target.value}); //Function change description
    onCloseLib = () => this.setState({isShowLib: false}); //Function change state library
    onAddLib = (image) => () => this.setState({isShowLib: false}, () => this.props.form.setFields({ thumbnail: { value: image[0], errors: [""] } })) //Function handle add image from library

    fetchTags = () => {
        this.setState({loadingTags: true}, () => {
            //Fetch get categories list
            FetchCategories()
            .then(res => {
                //get data response from api
                const { data } = res;
                //response ok, not error
                if(data["status"] !== "error" && data["status"] === "ok") {
                    //Loop and return new array with some new component <Option> (ant.design)
                    let categories = data["categories"].map(category => {
                        return (<Option key={category._id}> {category.name} </Option>)
                    })
                    //Finial setState loading, set Tree tags got it
                    this.setState({
                        loadingTags: false,
                        treeTagsSelected: categories
                    })
                }
                else {
                    //response error, check error and show
                    this.setState({loadingTags: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`));
                }
            }) //Error => show error
            .catch(err => this.setState({loadingTags: false}, () => message.error(err)))
        })
    }

    fetchBlog = (id) => {
        const { form } = this.props;
        this.setState({loadingPage: true}, () => {
            getBlogAPI(id, window.location.search)
            .then(res => {
                const { data } = res;
                //Response ok, not error
                if(data["status"] !== "error" && data["status"] === "ok") {
                    this.setState({ loadingPage: false, 
                        editorState: Module.HtmlToEditor(data["blog"].paragraph) }, () => { //set value ["paragraph"] for editor
                        form.setFieldsValue({["title"]: data["blog"].title}) //Set value of field title
                        form.setFieldsValue({["url"]: data["blog"].url}) //Set value of field url
                        form.setFieldsValue({["description"]: data["blog"].description}) //Set value of field description
                        form.setFieldsValue({["tags"]: data["blog"].categories.map(e => JSON.parse(e)._id)}) //Set value of field tags
                        form.setFieldsValue({["thumbnail"]: data["blog"].thumbnail}) //Set value of field thumbnail
                    })
                } //response error
                else {
                    this.setState({ loadingPage: false, got: false }, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`))
                }
            }) // Error
            .catch(err => {
                this.setState({loadingPage: false, got: false}, () => message.error(err));
            })
        })
    }

    onValidateUrlBlog = (rules, value, cb) => {
        //Check value url have space or underline/underscore return error, if not return callback
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
        const { form, match } = this.props;
        form.validateFields((err, values) => {
            if(!err) {
                this.setState({loadingPage: true}, () => {
                    updateBlogAPI(
                        match["params"].id,
                        {
                            ...values,
                            categories: values["tags"],
                            paragraph: Module.EditorToHtml(this.state.editorState)
                        }
                    )
                    .then(res => {
                        const { data } = res;
                        //Response is ok, not error
                        if(data["status"] !== "error" && data["status"] === "ok") {
                            this.setState({loadingPage: false, created: true}, () => {
                                message.success(data["msgVi"], 0.5, () =>  window.location.reload()) //notification
                            })
                        } //Have error ?
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
                    }) //Error
                    .catch(err => this.setState({loadingPage: false}, () => message.error(err)))
                })
            }
        })
    }

    componentDidMount() {
        this.fetchTags();
        this.fetchBlog(this.props.match.params["id"]);
    }

    render() {
        const { getFieldDecorator, getFieldValue, setFields , setFieldsValue} = this.props.form;
        const { editorState, isFocusEditor, treeTagsSelected, description, loadingPage, loadingTags, isShowLib, got } = this.state;
        return (
            <div className="create-blog-page">
                {
                    !got && <Redirect to="/administrator/blog" />
                }
                <Form className="create-blog-page__form" onSubmit={this.onHandleSubmit}>
                    <div className="create-blog-page__grid">
                        <div className="create-blog-page__grid__main">
                            <Form.Item label="Title">
                                {getFieldDecorator("title",{
                                    rules: [ { required: true, message: "Can not leave the title blank" } ] //Validate class 1
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
                                        { required: true, message: "Can not leave the url blank" }, //validate class 1
                                        { validator: this.onValidateUrlBlog } //validate class 2
                                    ]
                                })(
                                    <Input 
                                    addonBefore={`${window.location.origin}/blog/`} 
                                    addonAfter={<Button href={`/blog/${getFieldValue("url")}`} type="dashed">View</Button>} 
                                    placeholder="Url for blog" />
                                )}
                                <Alert showIcon type="warning" message="Warning: The path is unique, if changed the old path will no longer exist" />
                            </Form.Item>
                            <Form.Item label="Paragraph" onClick={() => this.setState({isFocusEditor: true})}>
                                <Alert type={isFocusEditor ? "success" : "warning"} 
                                message={isFocusEditor ? "Focused" : "Focus this paragraph before your click button update this post"} 
                                showIcon/>

                                {getFieldDecorator("paragraph", { rules: [ { required: true, message: "Can not leave the paragraph blank" } ] })(
                                    <Editor
                                        id="editor"
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
                                <Button className="create-blog-page--btn" type="primary" htmlType="submit" block>Cập nhật bài</Button>
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
                    onClose={this.onCloseLib}
                    onAdd={this.onAddLib} amountAdd={1}/>
                }
            </div>
        )
    }
}

const WrapperEditBlogPage = Form.create({name: "edit-blog-page"})(EditBlogPage);

export default WrapperEditBlogPage;