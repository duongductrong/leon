import React from 'react';
import WidgetTitle from '../WidgetTitle/WidgetTitle';
import FigureBox from '../FigureBoxes/FigureBox';

class RelationPosts extends React.Component {
    render() {
        const { posts, title, thumbnail } = this.props;
        const { style, className } = this.props;
        return (
            <div style={style} className={`relation-posts${className ? " " + className : ""}`}>
                <WidgetTitle center> { title } </WidgetTitle>
                <div className="relation-posts__wrapper">
                    {
                        posts && posts.map((e, i) => (
                            <FigureBox key={e._id || i} style={{height: "250px"}} title={e.title} url={e.url} image={e.image || e.thumbnail} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default RelationPosts;