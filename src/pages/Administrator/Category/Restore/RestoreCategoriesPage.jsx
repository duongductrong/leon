import React from 'react';
import { Table, message } from 'antd';
import { getCategoriesAPI, disableCategoryAPI } from '../http_request';
import { columns } from './columns';
import Module from '../../../../modules/Module';

export default class RestoreCategoriesPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            loading: false,
            pagination: {}
        }
    }

    //get categories
    fetchCategories = (params = {}) => {
        //change setup query to API
        let query = "";
        if(Module.isEmptyObj(params)) {
            query = window.location.search;
        }
        else {
            query = `?page=${params.page}`
        }
        getCategoriesAPI(true, query)
        .then(({data}) => {
            let { status, msgVi, code, categories, page, total } = data; //get item
            let pagination = {...this.state.pagination}; //get pagination
            //Response -> ok
            if(status !== "error" && status === "ok") {
                //Edit each object category of categories to add status, actions
                categories = categories.map(category => {
                    return {
                        ...category,
                        _id: category._id,
                        status: "Đã bị xóa",
                        actions: [
                            { action: "restore", name: "Restore", onFunc: this.onRestoreCategory(category._id) }
                        ]
                    }
                })

                //add pagination
                pagination.total = total;
                pagination.current = page;
                //setState
                this.setState({
                    loading: false,
                    categories,
                    pagination
                }, () => Module.goTo(`page=${page}`, `page=${page}`, `?page=${page}`));
            } //Error
            else {
                this.setState({ loading: false }, () => message.error(`${status} ${code}: ${msgVi}`));
            }
        }) //Error
        .catch(err => this.setState({loading: false}, () => message.error(err)))
    }

    //Handle Restore category item
    onRestoreCategory = (id) => () => {
        //request
        disableCategoryAPI(id)
        .then(({data}) => {
            const { status, code, msgVi } = data;
            switch(status) {
                case "ok":
                    this.setState({ loading: false }, () => message.success("Khôi phục thành công")); //set loading: false
                    this.fetchCategories(); //call get data again
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
        this.fetchCategories({page: temp.current})
    }

    UNSAFE_componentWillMount() {
        //Before mount JSX, sent request get data categories
        this.fetchCategories();
    }

    render() {
        const { categories, loading, pagination } = this.state;
        return <div className="restore-categories-page" style={{padding: "10px", background: "white"}}>
            <Table
            onChange={this.onHandleTable}
            columns={columns}
            dataSource={categories}
            loading={loading}
            pagination={pagination} />
        </div>
    }
}