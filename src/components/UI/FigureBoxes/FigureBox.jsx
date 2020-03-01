import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';

class FigureBox extends React.Component {
    render() {
        //data props
        const { title, image, url, carousel, card, children } = this.props;
        //modify props
        const { className, style } = this.props;

        return (
            <div style={style} className={`figure-box${className ? ` ${className}` : ""}`}>
                <NavLink to={url}>
                    <div className="figure-box__layer">
                        <img src={image} className={`figure-box__layer__image${card ? " figure-box__layer--card" : "" }`} />
                    </div>
                    <div className="figure-box__content">
                        { 
                            (carousel && children) && 
                                children.map((e,i) => (
                                    <Button key={`${i}FigureBox_Content_Category}`} style={{margin: "0 3px",padding: "3px 5px", fontSize: "10px", color: "white", borderColor: "white"}} url={e.url} link> 
                                        {e.name} 
                                    </Button>
                                ))
                        }
                        
                        <h1 className={
                            `figure-box__content__title${carousel ? " figure-box--fontBig" : ""}${card ? " figure-box--card" : ""}`
                            }> {title} </h1>
                        
                        { 
                            carousel && <NavLink className="figure-box__content__see-mores" to={url}> View posts </NavLink> 
                        }
                    </div>
                </NavLink>
            </div>
        )
    }
}

FigureBox.defaultProps = {
    title: "",
    image: "http://via.placeholder.com/1000x1000",
    url: "/",
    carousel: false,
    children: [{name: "Undefined", url : "/"}]
}

export default FigureBox;