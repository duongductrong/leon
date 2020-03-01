import React from 'react';
import { Table, message, Modal, Button } from 'antd'
import { fetchSubmenu, disableSubmenu, deleteSubmenu } from './request';
import { columnsSubmenu } from './constants';
import EditSubmenuSystem from '../Edit/EditSubmenuSystem';

class FetchSubmenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submenu: [],
            loading: false,
            pagination: {},
            isVisible: false,
            needUpdate: ""
        }
    }

    fetchSubmenuItem = (params = {}) => {
        let query = "";
        if(params["page"]) {
            query = `?page=${params["page"]}`
        }
        else {
            query = `?page=${1}`;
        }
        this.setState({loading: true}, () => {
            //get submenu
            fetchSubmenu(query)
            .then(res => {
                const { data } = res;
                let pagination = {...this.state.pagination};
                //response -> ok
                if(data["status"] !== "error" && data["status"] === "ok") {
                    //desctructing submenu
                    const submenu = data["list_submenu"].map(e => {
                        return {
                            ...e,
                            key: e._id,
                            actions: [
                                { action: "edit", name: "Edit", onFunc: () => this.setState({isVisible: true, needUpdate: e._id}) },
                                { action: "disable", name: "Disable", onFunc: this.onDisable(e._id) },
                                { action: "delete", name: "Delete", onFunc: this.onDelete(e._id) }
                            ]
                        }
                    })

                    //set pagination
                    pagination.current = data["page"] || 1;
                    pagination.total = data["total"] || 1;

                    this.setState({
                        loading: false,
                        submenu: submenu,
                        pagination
                    })
                } //response -> error
                else {
                    this.setState({loading: false})
                }
            }) // catch -> error
            .catch(err => {
                this.setState({ loading: false })
            })
        })
    }

    //Handle action change table
    onChangeTable = (pagination) => {
        let paper = {...this.state.pagination}
        paper.current = pagination.current;
        this.setState({
            pagination: paper
        });
        this.fetchSubmenuItem({page: paper.current || 1})
    }

    onDisable = (id) => () => {
        //request to api delete
        disableSubmenu(id)
        .then(data => {
            //response -> ok
            if(data["status"] !== "error" && data["status"] === "ok") {
                this.setState({loading: false}, () => {
                    message.success(data["msgVi"]);
                    this.fetchSubmenuItem()
                })
            } //response -> error
            else {
                this.setState({loading: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`));
            }
        }) //catch -> error
        .catch(err => this.setState({loading: false}, () => message.error(err)))
    }

    onDelete = (id) => () => {
        //request to api delete
        deleteSubmenu(id)
        .then(data => {
            //response -> ok
            if(data["status"] !== "error" && data["status"] === "ok") {
                this.setState({loading: false}, () => {
                    message.success(data["msgVi"]);
                    this.fetchSubmenuItem()
                })
            } //response -> error
            else {
                this.setState({loading: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`));
            }
        }) //catch -> error
        .catch(err => this.setState({loading: false}, () => message.error(err)))
    }

    componentDidMount() {
        this.fetchSubmenuItem();
    }

    render() {
        const { submenu, loading, pagination, needUpdate, isVisible } = this.state;
        return (
            <React.Fragment>
                <Button type="dashed" loading={loading} onClick={() => this.fetchSubmenuItem()}> Reload </Button>
                <Table
                bordered={true}
                dataSource={submenu}
                onChange={this.onChangeTable}
                columns={columnsSubmenu}
                loading={loading}
                pagination={pagination} />
                
                {
                    isVisible && <Modal 
                    title="Edit Menu Item"
                    visible={ isVisible }
                    onOk={() => this.setState({isVisible: false})}
                    onCancel={() => this.setState({isVisible: false})}>
                        <EditSubmenuSystem id={needUpdate} />
                    </Modal>
                }
            </React.Fragment>
        )
    }
}

export default FetchSubmenu;