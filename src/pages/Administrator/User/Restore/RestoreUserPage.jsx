import React from 'react';
import { Table, message } from 'antd';
import { disableUserAPI, getUserAPI, getUserListAPI } from '../http_request';
import { columns } from './columns';
import Module from '../../../../modules/Module';

export default class RestoreUsersPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            loading: false,
            pagination: {}
        }
    }

    //get users
    fetchUsersList = (params = {}) => {
        //change setup query to API
        let query = "";
        if(Module.isEmptyObj(params)) {
            query = window.location.search;
        }
        else {
            query = `?page=${params.page}`
        }
        getUserListAPI(true, query)
        .then(({data}) => {
            let { status, msgVi, code, users, page, total } = data; //get item
            let pagination = {...this.state.pagination}; //get pagination
            //Response -> ok
            if(status !== "error" && status === "ok") {
                //Edit each object user of users to add status, actions
                users = users.map(user => {
                    return {
                        ...user,
                        _id: user._id,
                        status: "Đã bị xóa",
                        actions: [
                            { action: "restore", name: "Restore", onFunc: this.onRestoreUser(user._id) }
                        ]
                    }
                })

                //add pagination
                pagination.total = total;
                pagination.current = page;
                //setState
                this.setState({
                    loading: false,
                    users,
                    pagination
                }, () => Module.goTo(`page=${page}`, `page=${page}`, `?page=${page}`));
            } //Error
            else {
                this.setState({ loading: false }, () => message.error(`${status} ${code}: ${msgVi}`));
            }
        }) //Error
        .catch(err => this.setState({loading: false}, () => message.error(err)))
    }

    //Handle Restore user item
    onRestoreUser = (id) => () => {
        //request
        disableUserAPI(id)
        .then(({data}) => {
            const { status, code, msgVi } = data;
            switch(status) {
                case "ok":
                    this.setState({ loading: false }, () => message.success("Khôi phục thành công")); //set loading: false
                    this.fetchUsersList(); //call get data again
                break;
                case "error":
                    this.setState({ loading: false }, () => message.error(`${status} ${code}: ${msgVi}`)); //Show error
                break;
                default: console.log("nothing");
            }
        })
        .catch(err => message.error(err)); //Show error
    }

    onHandleTable = pagination => {
        let temp = { ...this.state.pagination }; //spread pagination of state for temp variable
        temp.current = pagination.current; //get pagination current

        this.setState({
            pagination: temp
        })
        this.fetchUsersList({page: temp.current})
    }

    UNSAFE_componentWillMount() {
        //Before mount JSX, sent request get data users
        this.fetchUsersList();
    }

    render() {
        const { users, loading, pagination } = this.state;
        return <div className="restore-users-page" style={{padding: "10px", background: "white"}}>
            <Table
            onChange={this.onHandleTable}
            columns={columns}
            dataSource={users}
            loading={loading}
            pagination={pagination} />
        </div>
    }
}