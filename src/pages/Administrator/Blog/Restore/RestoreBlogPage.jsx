import React from 'react';
import { Table, message, Tag } from 'antd';
import { getBlogsAPI, restoreBlogAPI } from '../http_request';
import { columnsRestoreBlog } from './columns';
import Module from '../../../../modules/Module';

export default class RestoreBlogPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pagination: {},
            loading: false
        }
    }

    fetchData = (params = {}) => {
        let query = "";
        if(params["page"]) {
            query += `?page=${params.page}`
        }
        else {
            query += window.location.search;
        }
        this.setState({loading: true}, () => {
            getBlogsAPI(true, query)
            .then(data => {
                let { status, msgVi, code, blogs, total, page } = data;
                let pagination = {...this.state.pagination};

                if(status !== "error" && status === "ok") {
                    blogs = blogs.map(blog => {
                        return {
                            ...blog,
                            status: "Đã bị xóa hoặc dạng nháp",
                            actions: [
                                {
                                    action: "edit", name: "Edit Draft", onFunc: () => {}, href: `/administrator/blog/edit/${blog.url}?disable=${true}`
                                },
                                {
                                    action: "restore", name: "Restore", onFunc: this.onRestoreBlog(blog._id)
                                }
                            ]
                        }
                    })

                    pagination.total = total;
                    pagination.current = page;

                    this.setState({
                        loading: false,
                        data: blogs,
                        pagination
                    }, Module.goTo(`page=${page}`, `page=${page}`, `?page=${page}`))
                }
                else {
                    this.setState({loading: false}, () => message.error(`${status} ${code}: ${msgVi}`))
                }
            })
            .catch(err => this.setState({loading: false}, () => message.error(err)));
        })
    }

    onRestoreBlog = (id) => () => {
        this.setState({loading: true}, () => {
            restoreBlogAPI(id)
            .then(data => {
                const { status, code, msgVi } = data;
                if(status !== "error" && status === "ok") {
                    this.setState({loading: false}, () => {
                        message.success("Khôi phục bài viết thành công.");
                        this.fetchData();
                    });
                }
                else {
                    this.setState({loading: false}, () => message.error(`${status} ${code}: ${msgVi}`))
                }
            })
            .catch(err => this.setState({loading: false}, () => message.error(err)))
        })
    }

    onHandleTable = (pagination) => {
        let paper = {...pagination};
        paper.current = pagination.current;
        this.setState({
            pagination: paper
        });
        this.fetchData({page: paper.current})
    }

    componentWillMount() {
        this.fetchData();
    }

    render() {
        const { loading, data, pagination } = this.state;
        return (
            <div className="restore-blog-page" style={{background: "white", padding: "10px"}}>
                <Table
                onChange={this.onHandleTable}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                columns={columnsRestoreBlog} />
            </div>
        )
    }
}