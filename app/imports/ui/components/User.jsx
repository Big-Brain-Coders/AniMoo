import React from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the User List table. */
class User extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell><Image size='small' circular src={this.props.user.image} centered={true}/></Table.Cell>
        <Table.Cell textAlign='centered'>{this.props.user.firstName} {this.props.user.lastName}</Table.Cell>
        <Table.Cell>{this.props.user.bio}</Table.Cell>
        <Table.Cell>
          <Link to={`/user-page/${this.props.user._id}`}>Go To Profile</Link>
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
