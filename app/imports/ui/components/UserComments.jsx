import React from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class UserComment extends React.Component {
  render() {
    return (
      <Comment>
        <Comment.Avatar as='a' src={this.props.user.image}/>
        <Comment.Content>
          <Comment.Author>{this.props.user.username}</Comment.Author>
          <Comment.Text>{this.props.user.message}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

UserComment.propTypes = {
  user: PropTypes.shape({
    message: PropTypes.string,
    username: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default UserComment;
