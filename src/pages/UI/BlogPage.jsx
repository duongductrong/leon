import React from 'react';
import LayoutMedium from '../../components/layouts/commons/LayoutMedium/LayoutMedium';
import UserInterface from '../../components/layouts/commons/UserInterface';
import Carousel from '../../components/UI/Carousel/Carousel';
import CardSymetrical from '../../components/UI/Card/CardSymetrical';
import Pagination from '../../components/UI/Pagination/Pagination';
import GridLayout73 from '../../components/layouts/commons/GridLayout/GridLayout73';
import SideBar from '../../components/layouts/commons/Sidebar/Sidebar';
import Axios from 'axios';
import Module from '../../modules/Module';

//assets
import FigureOne from '../../assets/images/000-1024x1024.jpg';
import { message, Skeleton, Result, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import SkeletonSquare from '../../components/UI/Skeleton/SkeletonSquare';

const getBlogAPI = (page = 1) => {
    return new Promise((resolve ,reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/blog?page=${page}&onpage=${10}`
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

class BlogPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blogs: [],
            pagination: {}
        }
    }

    onToTopAfterLoaded = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    getBlogs = (page = 1) => {
        this.setState({loading: true}, () => {
            getBlogAPI(page)
            .then(data => {
                const { blogs, status, page, total, onPage, msgVi } = data;
                let pagination = {...this.state.pagination};
                //completed get data -> status ok
                if(status !== "error" && status === "ok") {
                    //Set pagination value page, total, onPage
                    pagination.total = total;
                    pagination.onPage = onPage;
                    pagination.page = page;
                    //SetState
                    this.setState({
                        blogs,
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
                this.setState({loading: false}, () => message.error(err));
            })
        })
    }

    onHandlePagination = (page) => {
        this.getBlogs(page);
    }

    componentWillMount() {
        this.getBlogs()
    }

    componentDidMount() {
        document.title = "My blog"
    }

    render() {
        const { blogs, pagination, loading } = this.state;
        return (
            <div className="blog-page">
                {
                    //Loading: true -> Show Skeleton loading
                    //Loading: false -> Blogs.length > 0 -> Show Carousel blog
                    //Loading: false -> Blogs.length < 0 -> Show Skeleton loading
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
                <LayoutMedium className="blog-page__wrapper">
                    <GridLayout73>
                        <div className="blog-page__wrapper__posts">
                            {
                                loading ? <Skeleton active paragraph={{rows: 10}} /> :
                                    blogs.length > 0 ? blogs.map((blog, i) => (
                                        <CardSymetrical
                                        key={blog._id}
                                        image={blog.thumbnail} 
                                        title={blog.title}
                                        url={`/blog/${blog.url}`}
                                        date={Module.DateBeautiful(blog.created).date}
                                        reverse={i % 2 !== 0 ? true : false}>
                                                {/* Categories */}
                                            { 
                                                blog.categories.map(category => {
                                                category = JSON.parse(category);
                                                    return {...category, url: `/category/${category.url}`}
                                                }) 
                                            }
                                        </CardSymetrical>
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
                            <div className="blog-page__wrapper__posts__pagination">
                                <Pagination page={pagination.page} total={pagination.total} onPagination={this.onHandlePagination} />
                            </div>
                        </div>
                        <div className="blog-page__wrapper__side">
                            <SideBar />
                        </div>
                    </GridLayout73>
                </LayoutMedium>
            </div>
        )
    }
}

export default BlogPage;