import React from 'react';
import { Card, Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/User';

/** Renders a single row in the List Profile table. See pages/ListProfile.jsx. */
class ProfileItem extends React.Component {
  cullFriend = () => {
    const friendUser = Users.collection.findOne({ displayName: this.props.users.friends[0] });
    return friendUser._id;
  }

  render() {
    return (
      <Grid container style={{ marginTop: '3em' }}>
        <Grid.Row centered divided>
          <Grid.Column width={2}>
            <Image src={this.props.users.image}
              size={'small'} bordered circular/>
          </Grid.Column>
          <Grid.Column width={10}>
            <p>{this.props.users.displayName}</p>
            <p>{this.props.users.bio}</p>
            <Link to={`/editProfile/${this.props.users._id}`}>Edit</Link>
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
                <Card.Description><Link to={`/friendProfile/${this.cullFriend}`} >{this.props.users.friends[0]}</Link></Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

        </Grid.Row>

      </Grid>
    );
  }
}

// Require a document to be passed to this component.
ProfileItem.propTypes = {
  users: PropTypes.shape({
    displayName: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    friends: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
  friendlies: PropTypes.array,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Profile documents
  const friendlies = Users.collection.find({}).fetch();
  return {
    friendlies,
    ready,
  };
})(ProfileItem);
