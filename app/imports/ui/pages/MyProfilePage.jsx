import React from 'react';
import { Loader, Header, Container, Item } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Users } from '../../api/user/User';
import { Anime } from '../../api/anime/Anime';
import MyProfile from '../components/MyProfile';
import LikesSection from '../components/LikesSection';

/** Renders the user my profile page */
class MyProfilePage extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const username = Meteor.user().username;
    console.log(username);
    const profile = _.filter(this.props.myProfile, function (profs) {
      if (username === profs.owner) {
        return profs;
      }
      return 0;
    });
    console.log(profile);

    const likes = this.props.myProfile.likedShows;
    const findInCollection = _.filter(likes, (anime) => _.contains(this.props.animes, anime._id));
    console.log(findInCollection);
    // const likes = this.props.myProfile.likedShows;
    console.log("THIS IS THE LIKED SHOWS", likes);
    return (
      <div id='user-page'>
        <Container text style={{ marginTop: '3em' }}>
          <Header as='h1' textAlign='center'>My Profile</Header>
          {profile.map((prof) => <MyProfile key={prof._id} mProfile={prof}/>)}
          <Item.Group>
            {/* {likes.map(findInCollection, (anime) => <LikesSection anime={anime}/> )} */}
            {/* <LikesSection user={this.props.user}/> */}
          </Item.Group>
        </Container>
        
      </div>
    );
  }
}

// Require the presence of a my profile document in the arrays object.
MyProfilePage.propTypes = {
  myProfile: PropTypes.array.isRequired,
  animes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Users documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const subscription2 = Meteor.subscribe(Anime.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const ready2 = subscription2.ready();
  // Get the document
  const myProfile = Users.collection.find({}).fetch();
  const animes = Anime.collection.find({}).fetch();
  return {
    myProfile,
    animes,
    ready,
    ready2,
  };
})(MyProfilePage);
