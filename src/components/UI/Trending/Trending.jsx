import React from 'react';
import WidgetTitle from '../WidgetTitle/WidgetTitle';
import CardTrending from '../Card/CardTrending';

//assets
import FigureOne from '../../../assets/images/000-1024x1024.jpg';

class Trending extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <div className="trending">
                <WidgetTitle left> {title} </WidgetTitle>
                <CardTrending style={{height: "70px"}} image={FigureOne} title={"Something else a title"} date="January 6, 2016" />
            </div>
        )
    }
}

export default Trending;