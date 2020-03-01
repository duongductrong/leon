import React from 'react';
import { Result, Button } from 'antd';
import { NavLink } from 'react-router-dom';

class Error404 extends React.Component {

    onLoadedToTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: "smooth" });
    }

    componentWillMount() {
        this.onLoadedToTop();
    }

    render() {
        return (
            <div className="error-404">
                <Result
                status="404"
                title="Error 404 ?"
                subTitle="Sorry, the content you searched for may not exist or has been deleted"
                extra={
                    <Button type="dashed"><NavLink to="/"> Go home, find again </NavLink></Button>
                } />
            </div>
        )
    }
}

export default Error404