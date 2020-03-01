import React from 'react';
import { NavLink } from 'react-router-dom';

class CardSimple extends React.Component {
    constructor(props) {
        super(props);
        this.monthList = [
            { id: 1, name: "Jan" },
            { id: 2, name: "Feb" },
            { id: 3, name: "Mar" },
            { id: 4, name: "Apr" },
            { id: 5, name: "May" },
            { id: 6, name: "Jun" },
            { id: 7, name: "Jul" },
            { id: 8, name: "Aug" },
            { id: 9, name: "Sep" },
            { id: 10, name: "Oct" },
            { id: 11, name: "Nov" },
            { id: 12, name: "Dec" }
        ]
    }

    onMonthClassification(month) {
        month = Number(month);
        let found = this.monthList.find(e => month === e.id);
        return found ? found.name : "Jan";
    }

    render() {
        const { image, title, url, day, month } = this.props;
        return (
            <div className="card-simple">
                <NavLink to={url}>
                    <div className="card-simple__left">
                        <span className="card-simple__left__created">{day} <span className="card-simple__left__created__month"> {this.onMonthClassification(month)} </span> </span>
                        <img src={image} className="card-simple__left__image" />
                    </div>
                    <div className="card-simple__main">
                        <h1 className="card-simple__main__title"> {title} </h1>
                    </div>
                </NavLink>
            </div>
        )
    }
}

CardSimple.defaultProps = {
    image: "",
    title: "",
    url: "/",
    day: "01",
    month: "1"
}

export default CardSimple;