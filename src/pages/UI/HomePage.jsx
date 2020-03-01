import React from 'react';
import UserInterface from '../../components/layouts/commons/UserInterface';
import ProfileImage from '../../components/UI/ProfileImage/ProfileImage';
import LayoutMedium from '../../components/layouts/commons/LayoutMedium/LayoutMedium';
import FigureBox from '../../components/UI/FigureBoxes/FigureBox';
import WidgetTitle from '../../components/UI/WidgetTitle/WidgetTitle';
import CardSimple from '../../components/UI/Card/CardSimple';
import Button from '../../components/UI/Button/Button'
import Axios from 'axios';
import Module from '../../modules/Module';
import { message, Skeleton, Result } from 'antd';
//assets
import Avatar from '../../assets/images/about-me-3-550x550.jpg';
import Avt from '../../assets/images/avt.jpg';
import FigureOne from '../../assets/images/test.jpg';
import FigureTwo from '../../assets/images/test_1.jpg';
import FigureThree from '../../assets/images/02-2-683x1024.jpg';
import FigureFour from '../../assets/images/aa-1024x802.jpg';
import IronImage from '../../assets/images/iron.png';
import HahaImage from '../../assets/images/haha.png';
import ReactImage from '../../assets/images/react.png';
import MeImage from '../../assets/images/me.jpg';
import BearImage from '../../assets/images/bear.png';

const getBlogAPI = () => {
    return new Promise((resolve ,reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/blog?onpage=${6}`
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

class HomePage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            blogs: [],
            loading: false
        }
    }

    onToTopAfterLoaded = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    getBlog = () => {
        this.setState({loading: true}, () => {
            getBlogAPI()
            .then(data => {
                const { status, blogs, msgVi } = data;
                if(status !== "error" && status === "ok") {
                    this.setState({
                        loading: false,
                        blogs: blogs
                    })
                }
                else {
                    this.setState({loading: false}, message.error(msgVi))
                }
            })
            .catch(err => {
                this.setState({loading: false}, message.error(err))
            })
        })
    }
    
    componentDidMount() {
        this.onToTopAfterLoaded();
        this.getBlog();

        document.title = "Homepage - Leon";
    }

    render() {
        const { blogs, loading} = this.state;
        return (
            // <UserInterface>
                <LayoutMedium className="home-page">
                    <div className="home-page__container">
                        <ProfileImage image={MeImage} />
                        <div className="home-page__container__figure-boxes">
                            <FigureBox image={FigureOne} title="About me" url="/" />
                            <FigureBox image={FigureTwo} title="Resume" url="/resume" />
                            <FigureBox image={FigureThree} title="Read my blog" url="/blog" />
                            <FigureBox image={FigureFour} title="Contact" url="/contact" />
                        </div>
                        <WidgetTitle center>LATEST FROM THE BLOG</WidgetTitle>
                        <div className="home-page__container__blog-simple">
                            {
                                loading ? 
                                <Skeleton active paragraph={{rows: 6}} /> :
                                blogs.length > 0 ? blogs.map((blog, i) => (
                                    <CardSimple 
                                    url={`/blog/${blog.url}`} 
                                    key={blog._id} 
                                    image={blog.thumbnail} 
                                    title={blog.title} 
                                    day={Module.DateBeautiful(blog.created).getDay} 
                                    month={Module.DateBeautiful(blog.created).getMonth} />
                                )) :
                                <Result
                                subTitle="There are currently no posts from Hey, bro!" />
                            }
                        </div>
                        <div className="home-page__container__see-mores">
                            <Button url="/blog" link>See all posts</Button>
                        </div>
                    </div>
                </LayoutMedium>
            // </UserInterface>
        )
    }
}

export default HomePage;