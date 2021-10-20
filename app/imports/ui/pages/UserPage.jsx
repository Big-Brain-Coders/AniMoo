import React from 'react';
import { Grid, Loader, Header, Segment, Container, Divider, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';

/** Renders the Page for editing a single document. */
class UserPage extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div id='user-page'>
        <Container text style={{ marginTop: '3em' }}>
          <Header as='h1' textAlign='center'>User Profile</Header>
          <Divider/>
          <Grid columns={2} divided>
            <Grid.Column>
              <Segment>
                <Header as='h1'
                  textAlign='center'>{this.props.userProfile.firstName} {this.props.userProfile.lastName}</Header>
                <Grid.Column>
                  <Image size='medium' rounded src={this.props.userProfile.image} wrapped ui={true} centered/>
                </Grid.Column>
                <Divider/>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>Bio</Header>
              <Segment>
                <Grid.Column>
                  <Container>{this.props.userProfile.bio}</Container>
                </Grid.Column>
              </Segment>
            </Grid.Column>
          </Grid>
          <Divider/>
        </Container>
      </div>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
UserPage.propTypes = {
  userProfile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const userProfile = Users.collection.findOne(documentId);
  return {
    userProfile,
    ready,
  };
})(UserPage);
