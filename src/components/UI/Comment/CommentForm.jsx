import React from 'react';
import WidgetTitle from '../WidgetTitle/WidgetTitle';
import Textarea from '../Textarea/Textarea';
import Label from '../Label/Label';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Comments from '../Comment/Comments';
import { createCommentAPI, getCommentsAPI } from './http_request';
import { Pagination, Spin, Empty } from 'antd';
import Module from '../../../modules/Module';


class CommentForm extends React.Component {

    state = {
        name: "",
        email: "",
        website: "",
        message: "",
        errors: {},
        loading: false,

        comments: [],
        pagination: {},
        loadingComments: false
    }

    onChangeInput = (e) => {
        let { name, value } = e.target;

        //Change value
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { name, email, website, message } = this.state;

        this.setState({ loading: true }, () => {
            createCommentAPI({
                name,
                email,
                message, 
                website,
                blog: this.props.postId
            })
            .then(({data}) => {
                const { msgVi, code, status, errors } = data;

                // status -> ok
                if(status !== "error" && status === "ok") {
                    this.setState({
                        errors: {},
                        name: "",
                        message: "",
                        website: "",
                        email: "",
                        loading: false
                    }, () => this.fetchComments())
                } // status -> error
                else {
                    this.setState({ errors, loading: false });
                }
            })
            .catch(err => {
                this.setState({ loading: false })
            })
        })
    }

    fetchComments = (option = {}) => {
        this.query = `?page=${ option["page"] || 1 }&onpage=${option["total"] || 4}&blogId=${this.props.postId}`

        this.setState({ loadingComments: true }, () => {
            getCommentsAPI(this.query)
            .then(({data}) => {
                let { msgVi, code, status, comments, total, page, onPage } = data;
                
                // status -> ok
                if(status !== "error" && status === "ok") {
                    this.setState({
                        comments,
                        pagination: {
                            ...this.state.pagination,
                            total,
                            page,
                            onPage
                        },
                        loadingComments: false
                    })
                } // status -> error
                else {
                    this.setState({ loadingComments: false })
                }
            })
            .catch(err => {
                this.setState({ loadingComments: false })
            })
        })
    }

    onHandleComment = (current, total) => {
        this.fetchComments({
            page: current,
            total
        })
    }

    componentDidMount() {
        this.fetchComments();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.postId !== prevProps.postId) {
            this.fetchComments()
        }
    }

    render() {
        const { style, className } = this.props;
        const { title } = this.props;
        const { name, message, email, website, errors, loading, comments, loadingComments, pagination } = this.state;
        return (
            <>
                <div className="comment-form--commentLists">
                    <WidgetTitle>COMMENTS</WidgetTitle>
                    <Spin spinning={loadingComments} className="comment">
                    {
                        comments.length !== 0 ? comments.map((comment, index) => (
                            <Comments name={comment.name} message={comment.message} date={`${Module.DateBeautiful(comment.created).date} ${Module.DateBeautiful(comment.created).time}`} key={index} />
                        )) :
                        <Empty description={false} />
                    }
                    </Spin>
                    <Pagination total={pagination.total} onChange={this.onHandleComment} size="small" defaultPageSize={4} style={{float: "right"}} />
                </div>
                <form onSubmit={this.handleSubmit} style={style} className={`comment-form${` ${className}`}`}>
                    <WidgetTitle center> {title} </WidgetTitle>
                    <div className="comment-form__group">
                        <Label htmlFor="message"> <small>Comment*</small> </Label>
                        <Textarea onChange={this.onChangeInput} id="message" name="message">{message}</Textarea>
                        { errors["message"] && <small className="comment-form--errors"> {errors["message"].msgVi} </small> }
                    </div>
                    <div className="comment-form__multiple-group comment-form--grid3">
                        <div className="comment-form__group">
                            <Label htmlFor="name"> <small>Name*</small> </Label>
                            <Input onChange={this.onChangeInput} id="name" name="name" value={name} />
                            { errors["name"] && <small className="comment-form--errors"> {errors["name"].msgVi} </small> }
                        </div>
                        <div className="comment-form__group">
                            <Label htmlFor="email"> <small>Email*</small> </Label>
                            <Input onChange={this.onChangeInput} id="email" name="email" value={email} />
                            { errors["email"] && <small className="comment-form--errors"> {errors["email"].msgVi} </small> }
                        </div>
                        <div className="comment-form__group">
                            <Label htmlFor="website"> <small>Website</small> </Label>
                            <Input onChange={this.onChangeInput} id="website" name="website" value={website} />
                            { errors["website"] && <small className="comment-form--errors"> {errors["website"].msgVi} </small> }
                        </div>
                    </div>
                    <Button type="submit" style={{marginTop: "30px"}}> {loading? "SUBMITING" : "POST COMMENT"} </Button>
                </form>
            </>
        )
    }
}

export default CommentForm;