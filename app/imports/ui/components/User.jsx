import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class User extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.user.firstName} {this.props.user.lastName}</Table.Cell>
        <Table.Cell>{this.props.user.image}</Table.Cell>
        <Table.Cell>{this.props.user.bio}</Table.Cell>
        <Table.Cell>
          <Link to={`/user-page/${this.props.user._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
User.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(User);
