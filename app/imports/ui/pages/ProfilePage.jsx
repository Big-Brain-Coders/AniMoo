import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/Profile/Profile';
import ProfileItem from '../components/ProfileItem';

/** Renders a table containing all of the Profile documents. Use <ProfileItem> to render each row. */
class ProfilePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        {this.props.profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)}
      </Container>
    );
  }
}

// Require an array of Profile documents in the props.
ProfilePage.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Profile documents
  const profiles = Profiles.collection.find({}).fetch();
  return {
    profiles,
    ready,
  };
})(ProfilePage);
