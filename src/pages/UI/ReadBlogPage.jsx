import React from 'react';
import { NavLink } from 'react-router-dom';
import UserInterface from '../../components/layouts/commons/UserInterface';
import FigureBox from '../../components/UI/FigureBoxes/FigureBox';
import LayoutMedium from '../../components/layouts/commons/LayoutMedium/LayoutMedium';
import ShareThisPost from '../../components/UI/ShareThisPost/ShareThisPost';
import SkeletonSquare from '../../components/UI/Skeleton/SkeletonSquare';
import NavSingle from '../../components/UI/NavSingle/NavSingple';
import AboutAuthor from '../../components/UI/AboutAuthor/AboutAuthor';
import RelationPosts from '../../components/UI/RelationPosts/RelationPosts';
import CommentForm from '../../components/UI/Comment/CommentForm';
import Module from '../../modules/Module';

//assets
import FigureOne from '../../assets/images/000-1024x1024.jpg';
import Avt from '../../assets/images/avt.jpg';
import Axios from 'axios';
import { message, Skeleton } from 'antd';

const getBlogAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/blog/${id}`
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

class ReadBlogPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blog: {},
            relate_blog: [],
            loading: false
        }
    }

    onToTopAfterLoaded = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    createMarkup = (html_text) => {
        html_text = `${html_text}`.replace(/text-align:none;/g,"text-align:center;")
        return { __html: html_text }
    }

    getBlog = (id) => {
        this.setState({loading: true}, () => {
            getBlogAPI(id)
            .then(data => {
                const { status, blog, msgVi, relate_posts } = data;
                if(status !== "error" && status === "ok") {
                    this.setState({
                        blog: {...blog, categories: blog.categories.map(e => {
                            return {
                                ...JSON.parse(e),
                                url: `/category/${JSON.parse(e).url}`
                            }
                        })},
                        relate_blog: relate_posts,
                        loading: false
                    }, () => {
                        //Inner paragraph of blog to HTML
                        document.title = this.state.blog.title + " - Leon !";
                    })
                }
                else {
                    this.setState({loading: false}, () => message.error(msgVi))
                }
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err))
            })
        })
    }

    UNSAFE_componentWillMount() {
        //Top top after did mount 
        this.onToTopAfterLoaded();
        //get data and show
        this.getBlog(this.props.match.params.id);
    }

    componentDidUpdate() {
        //Top top after did mount 
        this.onToTopAfterLoaded();
        //get data and show again
        this.getBlog(this.props.match.params.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.match.params.id !== this.props.match.params.id) {
            return true;
        }
        else if(this.state.blog._id !== nextState.blog._id) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        const { blog, relate_blog, loading } = this.state;
        return (
            // <UserInterface>
                <div className="read-blog-page">
                    {
                        loading ? <SkeletonSquare /> :
                        <FigureBox style={{height: "500px", margin: "auto"}} title={blog.title} image={blog.thumbnail} url={blog.url} carousel>
                            {blog.categories}
                        </FigureBox>
                    }
                    <LayoutMedium className="read-blog-page__wrapper">
                        {
                            loading ? <Skeleton active paragraph={{rows: 10}} /> :
                            <div id="read-blog-page--paragraph" dangerouslySetInnerHTML={this.createMarkup(blog.paragraph)} className="read-blog-page__wrapper__content" />
                        }
                        <div className="read-blog-page__wrapper__tags">
                            {
                                loading ? <Skeleton active paragraph={{rows: 2}} /> :
                                blog.categories && blog.categories.map((category, i) => (
                                    <NavLink key={category._id} className="read-blog-page__wrapper__tags__child" to={`${category.url}`}>#{category.name} </NavLink>
                                ))
                            }
                        </div>
                        <ShareThisPost 
                        title="SHARE THIS POST" 
                        facebook={window.location.href} 
                        instagram={window.location.href} 
                        linkedin={window.location.href}
                        twitter={window.location.href} />
                        <NavSingle style={{marginBottom: "40px"}} nextPost={{title: "Updating", url: "/"}} prevPost={{title: "Updating", url: "/"}} />
                        <AboutAuthor image={Avt} style={{marginBottom: "40px"}} name="CodeEN" description="Hello. I am a student of Ton Duc Thang Univerisy - College School. Currently, I am a sophomore, pursuing a programming industry. The language I use is javascript." />
                        <RelationPosts title="YOU MAY ALSO LIKE" style={{marginBottom: "40px"}} posts={relate_blog.slice(0,3)} />
                        {blog._id && <CommentForm title="LEAVE A COMMENT" style={{marginBottom: "40px"}} postId={blog._id} />}
                    </LayoutMedium>
                </div>
            // </UserInterface>
        )
    }
}

export default ReadBlogPage;