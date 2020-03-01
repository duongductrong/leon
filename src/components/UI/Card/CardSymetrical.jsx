import React from 'react';
import { NavLink } from 'react-router-dom';
import FigureBox from '../FigureBoxes/FigureBox';
import Button from '../Button/Button';

//assets
import FigureOne from '../../../assets/images/000-1024x1024.jpg';

class CardSymetrical extends React.Component {
    render() {
        const { children, title, url, image, date } = this.props;
        //modify
        const { reverse } = this.props;
        return (
            <div className={`card-symetrical${reverse ? " card-symetrical--reverse" : ""}`}>
                <div className={`card-symetrical__thumbnail${reverse ? " card-symetrical__thumbnail--reverse" : ""}`}>
                    <FigureBox image={image} title={date} url={url} card/>
                </div>
                <div className="card-symetrical__content">
                    { 
                        children && children.map((e,i) => (
                                <Button key={`${i}CardSymetrical_Content_Category}`} style={{margin: "0 3px",padding: "3px 5px", fontSize: "10px"}} url={e.url} link> 
                                    {e.name} 
                                </Button>
                            ))
                    }
                    <NavLink to={url}> <h1 className="card-symetrical__content__title"> {title} </h1> </NavLink>
                    <NavLink className="card-symetrical__content__see-mores"  to={url}> View posts </NavLink> 
                </div>
            </div>
        )
    }
}

CardSymetrical.defaultProps = {
    title: "",
    url: "/",
    image: ""
}

export default CardSymetrical;