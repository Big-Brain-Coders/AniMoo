import React from 'react';
import { Card, Table, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Profile table. See pages/ListProfile.jsx. */
class ProfileItem extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Card>
            <Table.Cell>{this.props.profile.displayName}</Table.Cell>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card>
            <Table.Cell>{this.props.profile.displayName}</Table.Cell>
          </Card>
        </Grid.Row>
      </Grid>

    );
  }
}

// Require a document to be passed to this component.
ProfileItem.propTypes = {
  profile: PropTypes.shape({
    displayName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileItem);
