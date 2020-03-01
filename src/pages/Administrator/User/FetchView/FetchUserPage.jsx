import React from 'react';
import { Table, message, notification, Modal } from 'antd';
import { columns } from './columns';
import Module from '../../../../modules/Module';
import { getUserListAPI, disableUserAPI, deleteUserAPI } from '../http_request';

class FetchUserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            pagination: {},
            isResetPassword: false,
            loading: false
        }

        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.onDisableUser = this.onDisableUser.bind(this);
        this.onHandleTableSubmit = this.onHandleTableSubmit.bind(this);
    }

    fetchUser(params = {}) {
        let query = "";
        if(Module.isEmptyObj(params)) {
            query = window.location.search;
        }
        else {
            query = `?page=${params["page"]}`;
        }

        this.setState({loading: true}, () => {
            //fetch user
            getUserListAPI(false, query)
            .then(res => {
                let pagination = {...this.state.pagination};
                const { data } = res;
                const { page, total } = data;

                if(data["status"] !== "error" && data["status"] === "ok") {
                    let { users } = data;
                    //desctructing users
                    users = users.map(user => {
                        //return new key for user is: key, actions
                        return {
                            ...user,
                            key: user._id,
                            actions: [
                                { action: "edit", name: "Edit", onFunc: () => console.log(1), href: `/administrator/user/edit/${user._id}` },
                                { action: "disable", name: "Disable", onFunc: this.onDisableUser(user._id)},
                                { action: "detele", name: "Delete", onFunc: this.onDeleteUser(user._id)},
                                { action: "reset", name: "Reset Password", onFunc: () => console.warn('The features is updating')}
                            ]
                        }
                    })

                    pagination.current = page;
                    pagination.total = total;

                    this.setState({users, pagination, loading: false}, () => {
                        message.success(data["msgVi"]);
                        Module.goTo(`page=${page}`,`page=${page}`,`?page=${page}` )
                    });
                }
                else {
                    this.setState({loading: false}, () => message.error(data["msgVi"]));
                }
            })
            .catch(err => this.setState({loading: false}, () => message.error(err)));
        })
    }

    onHandleTableSubmit(pagination) {
        let paper = {...this.state.pagination};
        paper = {...paper, current: pagination.current};
        this.setState({pagination: paper});
        this.fetchUser({page: paper.current || 1})
    }

    onDisableUser = (id) => () => {
        this.setState({loading: true}, () => {
            disableUserAPI(id)
            .then(res => {
                const { data } = res;
                if(data["status"] !== "error" && data["status"] === "ok") {
                    this.setState({loading: false}, () => {
                        this.fetchUser() //get user again
                        message.success(data["msgVi"], 1);
                    })
                }
                else {
                    // errors format STRING, using message antd
                    this.setState({loading: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`));
                }
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err));
            })
        })
    }

    onDeleteUser = (id) => () => {
        this.setState({loading: true}, () => {
            deleteUserAPI(id)
            .then(res => {
                const { data } = res;
                if(data["status"] !== "error" && data["status"] === "ok") {
                    this.setState({loading: false}, () => {
                        this.fetchUser() //get user again
                        message.success(data["msgVi"], 1);
                    })
                }
                else {
                    // errors format STRING, using message antd
                    this.setState({loading: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`));
                }
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err));
            })
        })
    }

    //didmount
    componentDidMount() {
        this.fetchUser();
    }

    render() {
        const { users, loading, pagination } = this.state;
        return (
            <div className="fetch-user-page">
                <Table
                pagination={pagination}
                loading={loading}
                columns={columns}
                onChange={this.onHandleTableSubmit}
                dataSource={users} />
                {/* <Modal
                title="Basic Modal"
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal> */}
            </div>
        )
    }
}

export default FetchUserPage;