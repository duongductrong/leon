import React from 'react';
import { Comment, Tooltip, Avatar, Pagination, Spin } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import WidgetTitle from '../WidgetTitle/WidgetTitle';

class Comments extends React.Component {
  state = {
    likes: 0,
    dislikes: 0,
    action: null
  };
  
  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  };
  
  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  };

  componentWillUnmount() {
    this.setState({
      likes: 0,
      dislikes: 0,
      action: null
    })
  }

  render() {
    const { likes, dislikes, action } = this.state;
    const { message, name, date } = this.props;

    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
            onClick: this.like,
          })}
        </Tooltip>
        <span className="comment-action">{likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          {React.createElement(action === 'liked' ? DislikeFilled : DislikeOutlined, {
            onClick: this.dislike,
          })}
        </Tooltip>
        <span className="comment-action">{dislikes}</span>
      </span>
    ];

    return (
      <Comment
        actions={actions}
        author={<a> {name} </a>}
        avatar={
        <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
        />
        }
        content={
        <p>
            { message }
        </p>
        }
        datetime={
        <Tooltip title={date}>
            <span>{date}</span>
        </Tooltip>
        }
      />
    );
  }
}

export default Comments;