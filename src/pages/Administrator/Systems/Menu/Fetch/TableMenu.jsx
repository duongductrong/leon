import React from 'react';
import { Table, message, Modal, Button, Form } from 'antd'
import { FetchNavigationBuilt, FetchMenuItem, FetchSubmenu, disableMenu, deleteMenu } from './request';
import { columns } from './constants';
import EditMenuSystem from '../Edit/EditMenuSystem';

class FetchNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuItem: [],
            loading: false,
            pagination: {},
            isVisible: false,
            needUpdate: ""
        }
    }

    fetchMenuItem = (params = {}) => {
        let query = "";
        if(params["page"]) {
            query = `?page=${params["page"]}`
        }
        else {
            query = `?page=${1}`;
        }
        this.setState({loading: true}, () => {
            //get menu item (menu)
            FetchMenuItem(query)
            .then(res => {
                const { data } = res;
                let pagination = {...this.state.pagination};
                //response -> ok
                if(data["status"] !== "error" && data["status"] === "ok") {
                    //desctructing menu add actions and key
                    const menu = data["menu"].map(e => {
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

                    //Add value current, total to pagination get from api
                    pagination.current = data["page"] || 1;
                    pagination.total = data["total"] || 1;
                    //setState and re-rendering
                    this.setState({
                        loading: false,
                        menuItem: menu,
                        pagination
                    })
                } //Response -> error
                else {
                    this.setState({loading: false})
                }
            }) //catch -> error
            .catch(err => {
                this.setState({ loading: false })
            })
        })
    }

    //Handle change, pagination of table
    onChangeTable = (pagination) => {
        let paper = {...this.state.pagination}
        paper.current = pagination.current;
        this.setState({
            pagination: paper
        });
        this.fetchMenuItem({page: paper.current || 1})
    }

    onDisable = (id) => () => {
        //request to api delete
        disableMenu(id)
        .then(data => {
            //response -> ok
            if(data["status"] !== "error" && data["status"] === "ok") {
                this.setState({loading: false}, () => {
                    message.success(data["msgVi"]);
                    this.fetchMenuItem()
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
        deleteMenu(id)
        .then(data => {
            //response -> ok
            if(data["status"] !== "error" && data["status"] === "ok") {
                this.setState({loading: false}, () => {
                    message.success(data["msgVi"]);
                    this.fetchMenuItem()
                })
            } //response -> error
            else {
                this.setState({loading: false}, () => message.error(`${data["status"]} ${data["code"]}: ${data["msgVi"]}`));
            }
        }) //catch -> error
        .catch(err => this.setState({loading: false}, () => message.error(err)))
    }

    componentDidMount() {
        this.fetchMenuItem();
    }

    render() {
        const { menuItem, loading, pagination, isVisible, needUpdate } = this.state;
        const { getFieldDecorator } = this.props;
        
        return (
            <React.Fragment>
                <Button type="dashed" loading={loading} onClick={() => this.fetchMenuItem()}> Reload </Button>
                <Table
                bordered={true}
                dataSource={menuItem}
                onChange={this.onChangeTable}
                columns={columns}
                loading={loading}
                pagination={pagination} />

                {
                    isVisible && <Modal 
                    title="Edit Menu Item"
                    visible={ isVisible }
                    onOk={() => this.setState({isVisible: false})}
                    onCancel={() => this.setState({isVisible: false})}>
                        <EditMenuSystem id={needUpdate} />
                    </Modal>
                }
            </React.Fragment>
        )
    }
}

export default FetchNavigation;