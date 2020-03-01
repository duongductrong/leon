import React from 'react';
import Input from '../Input/Input';
import WidgetTitle from '../WidgetTitle/WidgetTitle';
import Button from '../Button/Button';

class Subscribe extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <form className="subscribe">
                <WidgetTitle left> {title} </WidgetTitle>
                <Input type="text" placeholder="Your email address" />
                <Button style={{fontSize: "12px", fontWeight: "100", marginTop: "15px"}}>SIGN UP</Button>
            </form>
        )
    }
}

Subscribe.defaultProps = {
    title: "",
}

export default Subscribe;