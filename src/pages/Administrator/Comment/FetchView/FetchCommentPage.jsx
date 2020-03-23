import React from 'react';
import { Table, message } from 'antd';
import { columns } from './columns';
import { getCommentsAPI } from '../../../../components/UI/Comment/http_request';
import Module from '../../../../modules/Module';
import { disableCommentAPI, deleteCommentAPI } from '../http_request';

class FetchCommentPage extends React.Component {

    state = {
        comments: [],
        pagination: {},
        loading: false
    }

    getComments = (options = {}) => {
        let query = "";
        query = options["current"] ? `?page=${options.current}` : query //query page

        this.setState({loading: true}, () => {
            getCommentsAPI(query)
            .then(({data}) => {
                let { msgVi, code, status, comments, total, page } = data;
                let pagination;

                if(status !== "error" && status === "ok") {
                    comments = comments.map(comment => {
                        return {
                            loading: false,
                            ...comment,
                            actions: [
                                { action: "disable", name: "Disable", onFunc: () => this.onDisable(comment._id) },
                                { action: "delete", name: "Delete", onFunc: () => this.onDelete(comment._id) }
                            ]
                        }
                    })

                    pagination = {
                        current: page,
                        total
                    }
                    this.setState({ comments, pagination, loading: false }, () => {
                        Module.goTo(
                        `?page=${this.state.pagination.current}`,
                        `?page=${this.state.pagination.current}`,
                        `?page=${this.state.pagination.current}`)
                    })
                }
            })
        })
    }

    onDisable = (id) => {
        disableCommentAPI(id)
        .then(({data}) => {
            const { msgVi, status, code } = data;
            if(status !== "error" && status === "ok") {
                message.success(msgVi);
                this.getComments();
            }
            else {
                message.error(`${status} ${code}: ${msgVi}`);
            }
        })
        .catch(err => {
            message.error(JSON.stringify(err))
        })
    }

    onDelete = (id) => {
        deleteCommentAPI(id)
        .then(({data}) => {
            const { msgVi, status, code } = data;
            if(status !== "error" && status === "ok") {
                message.success(msgVi);
                this.getComments();
            }
            else {
                message.error(`${status} ${code}: ${msgVi}`);
            }
        })
        .catch(err => {
            message.error(JSON.stringify(err))
        })
    }

    handleTable = (pagination) => {
        let pager = {...this.state.pagination}
        pager.current = pagination.current;

        this.setState({
            pagination: pager
        });

        this.getComments(pager);
    }

    componentDidMount() {
        this.getComments();
    }

    render() {
        const { pagination, comments, loading } = this.state;

        return (
            <div className="fetch-comment" style={{background: "white", padding: "15px"}}>
                <Table
                rowKey={comments => comments._id}
                loading={loading}
                onChange={this.handleTable}
                columns={columns}
                dataSource={comments}
                pagination={pagination} />
            </div>
        )
    }
}

export default FetchCommentPage;