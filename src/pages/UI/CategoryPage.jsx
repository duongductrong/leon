import React from 'react';
import UserInterface from '../../components/layouts/commons/UserInterface';
import Carousel from '../../components/UI/Carousel/Carousel';
import LayoutMedium from '../../components/layouts/commons/LayoutMedium/LayoutMedium';
import GridLayout73 from '../../components/layouts/commons/GridLayout/GridLayout73';
import SideBar from '../../components/layouts/commons/Sidebar/Sidebar';
import CardFullDetails from '../../components/UI/Card/CardFullDetails';
import Pagination from '../../components/UI/Pagination/Pagination';
import Axios from 'axios';

//assets
import FigureOne from '../../assets/images/000-1024x1024.jpg';
import { message, Skeleton, Result, Button } from 'antd';
import Module from '../../modules/Module';
import { NavLink } from 'react-router-dom';
import SkeletonSquare from '../../components/UI/Skeleton/SkeletonSquare';

const getBlogAPI = (id, page = 1) => {
    return new Promise((resolve ,reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/categories/${id}?page=${page}&onpage=${10}`
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}   

class CategoryPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blogs: [],
            pagination: {},
            loading: false
        }
    }

    onToTopAfterLoaded = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    getBlogsOfCategory = (page = 1) => {
        const { id } = this.props.match.params;
        this.setState({loading: true}, () => {
            getBlogAPI(id, page)
            .then(data => {
                const { blog_of_category, status, page, total, onPage, msgVi } = data;
                let pagination = {...this.state.pagination};
                //completed get data -> status ok
                if(status !== "error" && status === "ok") {
                    //Set pagination value page, total, onPage
                    pagination.total = total;
                    pagination.onPage = onPage;
                    pagination.page = page;
                    //SetState
                    this.setState({
                        blogs: blog_of_category,
                        pagination,
                        loading: false
                    }, () => {
                        this.onToTopAfterLoaded();
                        Module.goTo(`page=${this.state.pagination.page}`,`page=${this.state.pagination.page}`,`?page=${this.state.pagination.page}`);
                    })
                } //completed get data -> status error
                else {
                    this.setState({loading: false}, () => message.error(msgVi));
                }
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err))
            })
        })
    }

    onHandlePagination = (page) => {
        this.getBlogsOfCategory(page)
    }

    UNSAFE_componentWillMount() {
        this.getBlogsOfCategory()
    }

    componentDidMount() {
        document.title = `${this.props.match.params.id} category - Leon`
    }

    render() {
        const { blogs, pagination, loading } = this.state;
        return (
            // <UserInterface>
                <div className="category-page">
                    {
                        loading ? <SkeletonSquare height="50vh" /> :
                            blogs.length > 0 ? <Carousel posts={blogs.map((blog, i) => {
                                return {
                                    ...blog, 
                                    url: `/blog/${blog.url}`, 
                                    categories: blog.categories.map(category => {
                                        category = JSON.parse(category);
                                        return {...category, url: `/category/${category.url}`}
                                    })}
                            }
                        ).filter((_, i) => i < 3)} /> : <SkeletonSquare height="50vh" />
                    }
                    <LayoutMedium className="category-page__wrapper">
                        <GridLayout73 className="category-page__wrapper__v1">
                            <div className="category-page__wrapper__v1__main">
                                {
                                    loading ? <Skeleton active paragraph={{rows: 10}} /> :
                                        blogs.length > 0 ? 
                                        blogs.map((blog, i) => (
                                            <CardFullDetails title={blog.title}
                                            url={`/blog/${blog.url}`}
                                            category={blog.categories.map(category => {
                                                category = JSON.parse(category);
                                                return {...category, url: `/category/${category.url}`}
                                            })} 
                                            image={blog.thumbnail}
                                            description={blog.description} />
                                        )) : 
                                        <Result status="error" title="Did not find any content for this object"
                                        extra={
                                            <NavLink to="/">
                                                <Button type="primary" key="console">
                                                Go home
                                                </Button>
                                            </NavLink>
                                        } />
                                }
                                <div className="category-page__wrapper__v1__main__pagination">
                                    <Pagination page={pagination.page} total={pagination.total} onPage={pagination.onPage} onPagination={this.onHandlePagination} />
                                </div>
                            </div>
                            <div>
                                <SideBar />
                            </div>
                        </GridLayout73>
                    </LayoutMedium>
                </div>
            // </UserInterface>
        )
    }
}

export default CategoryPage;