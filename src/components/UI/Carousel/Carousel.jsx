import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import FigureBox from '../../../components/UI/FigureBoxes/FigureBox';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            postsLength: this.props.posts ? this.props.posts.length : 0
        }
    }

    onHandleCarousel = (spec) => () => {
        const { postsLength, active } = this.state;
        switch(spec) {
            case "next": 
                this.setState({active : active >= postsLength - 1? 0 : active + 1});
            break;
            case "prev":
                this.setState({active : active <= 0 ? postsLength - 1 : active - 1});
            break;
            default: 
                console.log("error handle carousel");
        }
    }

    componentDidMount() {
        this.setState({postsLength: this.props["posts"] ? this.props.posts.length : 0})
    }

    componentDidUpdate() {
        this.setState({postsLength: this.props.posts.length})
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps["posts"].length !== this.state.postsLength) {
            return true;
        }
        else if (nextState.active !== this.state.active) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        const { posts } = this.props;
        const { active } = this.state;
        return (
            <div className="carousel">
                <div className="carousel__posts">
                {
                    posts && posts.map((post, i) => (
                        active === i && <FigureBox key={post._id || i} className="carousel__posts__child" title={post.title || post.name} image={post.thumbnail || post.image} url={post.url} carousel>
                            { post["categories"] ? post["categories"] : []}
                        </FigureBox>
                    ))
                }
                </div>
                <div className="carousel__control">
                    <div className="carousel__control__prev" onClick={this.onHandleCarousel("prev")}> <FontAwesomeIcon icon={faArrowLeft} /> </div>
                    <div className="carousel__control__next" onClick={this.onHandleCarousel("next")}> <FontAwesomeIcon icon={faArrowRight} /> </div>
                </div>
            </div>
        )
    }
}

Carousel.defaultProps = {
    posts: []
}

export default Carousel;