import React from 'react';
import { Grid, Loader, Image, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Users } from '../../api/user/User';

/** Renders the Page for editing a single document. */
class FriendProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  cullFriend = () => {
    const friendUser = Users.collection.findOne({ displayName: this.props.doc.friends[0] });
    return friendUser._id;
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container style={{ marginTop: '3em' }}>
        <Grid.Row centered divided>
          <Grid.Column width={2}>
            <Image src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              size={'small'} bordered circular/>
          </Grid.Column>
          <Grid.Column width={10}>
            <p>{this.props.doc.displayName}</p>
            <p>{this.props.doc.bio}</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched centered>
          <Grid.Column stretched width={10}>
            <Card centered fluid>
              <Card.Content textAlign={'center'}>
                <Card.Header>Favorite Anime</Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column stretched width={5}>
            <Card centered fluid>
              <Card.Content textAlign={'center'}>
                <Card.Header>Friends List</Card.Header>
                <Image src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  size={'small'} bordered centered/>
                <Card.Description><Link to={`/friendProfile/${this.cullFriend}`}>{this.props.doc.friends[0]}</Link></Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

        </Grid.Row>

      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
FriendProfile.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.publicPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Users.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(FriendProfile);
