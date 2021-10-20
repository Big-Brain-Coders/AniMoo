import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Comment, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CommentSection extends React.Component {
  addMessage = ({ username, message }) => {
    Users.collection.update({ _id: this.props.myID },
      { $push: { messages: { user: username, message: message } } });
    console.log();
  };

  render() {
    console.log(this.props.myID);
    return (
      <Comment.Group>
        <Form reply>
          <Form.TextArea />
          <Button content='Add Comment' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    );
  }
}

// Require an array of Stuff documents in the props.
CommentSection.propTypes = {
  myID: PropTypes.String,
};

export default withTracker(() => {
  const subscription2 = Meteor.subscribe(Users.userPublicationName);
  // DON'T DELETE CURRENT IDK WHY BUT IT'S SUPER NECESSARY
  // eslint-disable-next-line no-unused-vars
  const current = Users.collection.find({}).fetch();
  return {
    ready: subscription2.ready(),
  };
})(CommentSection);
// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
