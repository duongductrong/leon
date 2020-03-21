import React from 'react';
import WidgetTitle from '../WidgetTitle/WidgetTitle';
import Textarea from '../Textarea/Textarea';
import Label from '../Label/Label';
import Input from '../Input/Input';
import Button from '../Button/Button';

class CommentForm extends React.Component {
    render() {
        const { onSubmit, style, className } = this.props;
        const { title } = this.props;
        return (
            <form onSubmit={onSubmit} style={style} className={`comment-form${` ${className}`}`}>
                <WidgetTitle center> {title} </WidgetTitle>
                <div className="comment-form__group">
                    <Label htmlFor="comment"> <small>Comment*</small> </Label>
                    <Textarea id="comment"></Textarea>
                </div>
                <div className="comment-form__multiple-group comment-form--grid3">
                    <div className="comment-form__group">
                        <Label htmlFor="name"> <small>Name*</small> </Label>
                        <Input id="name" value="" />
                    </div>
                    <div className="comment-form__group">
                        <Label htmlFor="email"> <small>Email*</small> </Label>
                        <Input id="email" value="" />
                    </div>
                    <div className="comment-form__group">
                        <Label htmlFor="website"> <small>Website</small> </Label>
                        <Input id="website" value="" />
                    </div>
                </div>
                <Button type="submit" style={{marginTop: "30px"}}> POST COMMENT </Button>
            </form>
        )
    }
}

export default CommentForm;