import React from 'react';
import { Table, message } from 'antd';
import { columns } from './columns'
import { getBlogsAPI , deleteBlogAPI, disableBlogAPI } from '../http_request';
import { SimpleModule } from '../../../../modules/Application';

class FetchBlogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pagination: {},
            loading: false
        }
    }

    fetch(params = {}) {
        let query = "";
        if(SimpleModule.isEmptyObj(params)) {
            query = window.location.search;
        }
        else {
            query = `?page=${params.page}`;
        }
        
        this.setState({loading: true}, () => {
            getBlogsAPI(false, query)
            .then(data => {
                //get data
                let { blogs, page, total } = data;
                let pagination = {...this.state.pagination};

                //Desstructing blog array
                blogs = blogs.map(blog => {
                    //return new object of blog follow table ant design
                    return {
                        ...blog,
                        key: blog._id,
                        title: {
                            name: blog.title,
                            url: blog.url
                        },
                        categories: blog["categories"].map(category => JSON.parse(category)),
                        author: JSON.parse(blog["author"]),
                        actions: [
                            {action: "edit", name: "Edit", onFunc: () => {}, href: `/administrator/blog/edit/${blog.url}`},
                            {action: "disable", name: "Disable", onFunc: this.onDisable(blog._id)},
                            {action: "delete", name: "Delete", onFunc: this.onDelete(blog._id)}
                        ]
                    }
                })

                pagination.current = page;
                pagination.total = total;
                //setState new
                this.setState({dataSource: blogs, pagination, loading: false}, SimpleModule.goTo(`page=${page}`,`page=${page}`,`?page=${page}`));
            })
            .catch(err => {
                //error
                message.error(err);
                this.setState({loading: false})
            })
        })
    }

    onHandleTableChange = (pagination) => {
        let pager = {...this.state.pagination};
        pager = {...pager, current: pagination.current};
        this.setState({
            pagination: pager
        });
        this.fetch({page: pager.current || 1})
    }

    onDelete = (id) => () => {
        this.setState({loading: true}, () => {
            deleteBlogAPI(id)
            .then(res => {
                //get response
                const { data } = res;
                if(data["status"] !== "error" && data["status"] === "ok") {
                    message.success(data["msgVi"]); //notification
                    this.fetch(); //callback fetch api blog
                    this.setState({loading: false}) //turn of loading
                }
                else {
                    this.setState({loading: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`));
                }
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err))
            })
        })
    }

    onDisable = (id) => () => {
        this.setState({loading: true}, () => {
            disableBlogAPI(id)
            .then(res => {
                //get response
                const { data } = res;
                if(data["status"] !== "error" && data["status"] === "ok") {
                    this.setState({loading: false}, () => message.success(data["msgVi"])) //turn of loading
                    this.fetch(); //callback fetch api blog
                }
                else {
                    this.setState({loading: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`));
                }
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err))
            })
        })
    }

    componentDidMount() {
        this.fetch();
    }
    
    render() {
        const { dataSource, pagination, loading } = this.state;

        return (
            <div className="fetch-blog-page">
                <h1 className="fetch-blog-page__title">
                    LIST YOUR BLOG
                </h1>
                <Table dataSource={dataSource} columns={columns} pagination={pagination} onChange={this.onHandleTableChange} loading={loading} />
            </div>
        )
    }
}

export default FetchBlogPage;