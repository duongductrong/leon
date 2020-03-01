import React from 'react';
import { Table, Button, message } from 'antd';
import Module from '../../../../modules/Module';

//data source for table
import { columnsSource } from './columns';

//Get request
import { deleteCategoryAPI, disableCategoryAPI, getCategoriesAPI } from '../http_request';

class FetchCategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: false,
            pagination : {},
            visibleNewItem: false
        }
    }

    //Fetch request to get some data
    fetch(params = {}) {
        //Change BaseURL 
        let query = "";
        if(Module.isEmptyObj(params)) {
            query = window.location.search;
        }
        else {
            query = `?page=${params.page}`
        }

        //Sent request get data
        this.setState({loading: true}, () => {
            getCategoriesAPI(false, query)
            .then(res => {
                //Fetch data completed
                const { data } = res;
                let { categories, page, total } = data;
                const pagination = {...this.state.pagination};
                
                //Destructing categories to add
                // * Action
                // * Key
                categories = categories.map(e => {
                    return {
                        ...e,
                        key: e._id, //ID [Primary key]
                        action: [
                            { action: "edit", name: "Edit", onFunc: () => {}, href: `/administrator/category/edit/${e.url}` },
                            { action: "disable", name: "Disable", onFunc: this.onDisable(e._id) },
                            { action: "delete", name: "Delete", onFunc: this.onDelete(e._id) }
                        ]
                    }
                })

                //Destructing pagination
                pagination.total = total; //take total posts
                pagination.current = page; //take query page current
                //setState
                this.setState({
                    categories,
                    pagination,
                    loading: false
                }, () => Module.goTo(`page=${page}`, `page=${page}`, `?page=${page}`))
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err))
            })
        })
    }

    onDisable = (id) => () => {
        this.setState({loading: true}, () => {
            disableCategoryAPI(id)
            .then(res => {
                const { data } = res;
                if(data["status"] !== "error" && data["status"] === "ok") {
                    this.setState({loading: false}, () => {
                        message.success(data["msgVi"]);
                        this.fetch()
                    })
                }
                else {
                    this.setState({loading: false}, () => message.error(`data["status"] data["code]: ${data["msgVi"]}`))
                }
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err))
            })
        })
    }

    onDelete = (id) => () => {
        this.setState({loading: true}, () => {
            deleteCategoryAPI(id)
            .then(res => {
                const { data } = res;
                if(data["status"] !== "error") {
                    this.setState({loading: false}, () => {
                        message.success(data["msgVi"]);
                        this.fetch()
                    })
                }
                else {
                    this.setState({loading: false}, () => message.error(`data["status"] data["code]: ${data["msgVi"]}`))
                }
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err))
            })
        })
    }

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        this.fetch({page: pager.current})
    };

    componentDidMount() {
        //Sent request
        this.fetch();
    }

    render() {
        const { categories, loading, pagination } = this.state;
        return (
            <div className="fetch-category-page">
                <div className="fetch-category-page__title">
                    <h1 className="fetch-category-page__title__child"> List Category </h1>
                </div>
                <div className="fetch-category-page__new">
                    <Button type="primary" className="fetch-category-page__new__btn">New Category</Button>
                </div>
                <Table 
                    className="fetch-category-page__table" 
                    dataSource={categories} 
                    columns={columnsSource}
                    loading={loading}
                    pagination={pagination}
                    onChange={this.handleTableChange}
                ></Table>
            </div>
        )
    }
}

export default FetchCategoryPage;