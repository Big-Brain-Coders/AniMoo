import React from 'react';
// import { Container, Table, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CommentSection extends React.Component {

  render({ props }) {
    this.props.user = props;
    console.log(this.props.user);
    return (
      <div></div>
    );
  }
}

// Require an array of Stuff documents in the props.
CommentSection.propTypes = {
  user: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default CommentSection;
