import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
// import { Grid, Header, Segment, Button } from 'semantic-ui-react';
import { User } from 'meteor/socialize:user-model';
import PropTypes from 'prop-types';
import { Profile, ProfilesCollection } from 'meteor/socialize:user-profile';
import { SubsCache } from 'meteor/ccorcos:subs-cache';

const subsCache = new SubsCache();

class UserProfile extends React.Component {
  static propTypes = {
    ready: PropTypes.bool,
    areFriends: PropTypes.bool,
    hasRequest: PropTypes.bool,
    hasPendingRequest: PropTypes.bool,
    friends: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    friendsReady: PropTypes.bool,
    isSelf: PropTypes.bool,
    profileUser: PropTypes.instanceOf(User),
    user: PropTypes.instanceOf(User),
    profile: PropTypes.instanceOf(Profile),
    // percentUploaded: PropTypes.number,
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  };

  state = { showModal: false }

  handleProfileAction = () => {
    const { areFriends, hasRequest, hasPendingRequest, profileUser } = this.props;

    if (areFriends) {
      profileUser.unfriend();
    } else
    if (hasRequest) {
      profileUser.acceptFriendshipRequest();
    } else
    if (hasPendingRequest) {
      profileUser.cancelFriendshipRequest();
    } else {
      profileUser.requestFriendship();
    }
  }

  handleShow = () => {
    this.setState({ showModal: true });
  }

  handleHide = () => {
    this.setState({ showModal: false });
  }

  render() {
    const {
      ready,
      areFriends,
      hasRequest,
      friends,
      friendsReady,
      hasPendingRequest,
      isSelf,
      profileUser,
      profile,
      user,
      params,
      // percentUploaded,
      // ...props
    } = this.props;

    // let actionText;
    // let icon;

    // if (areFriends) {
    // actionText = 'Unfriend';
    // icon = 'ban';
    // } else if (hasRequest) {
    // actionText = 'Accept Request';
    // icon = 'check';
    // } else if (hasPendingRequest) {
    // actionText = 'Cancel Request';
    // glyph = 'x icon';
    // } else {
    // actionText = 'Add Friend';
    // glyph = 'plus';
    // }
    return (
      <div className="actions-container">
        <h1 className="username">({profileUser.username})</h1>
      </div>
    );
  }
}
const UserProfileContainer = withTracker(({ user, match: { params } }) => {
  const { username } = params;
  const ready = subsCache.subscribe('socialize.userProfile', username).ready();
  let uploadingFile;

  // if (Meteor.isClient) {
  // uploadingFile = Cloudinary.collection.findOne({ status: 'uploading', groupId: 'avatar' });
  // }

  let profile;
  let profileUser;
  let areFriends;
  let hasRequest;
  let hasPendingRequest;
  let blocking;
  let isSelf;
  let friends;
  let friendsReady;

  if (ready) {
    profile = ProfilesCollection.findOne({ username });

    profileUser = profile.user();
    friendsReady = Meteor.subscribe('socialize.friends', profileUser._id, { limit: 4 }).ready();
    friends = profileUser.friendsAsUsers({ limit: 4 }).fetch();
    areFriends = profileUser && profileUser.isFriendsWith();
    hasRequest = user.hasFriendshipRequestFrom(profileUser);
    hasPendingRequest = profileUser.hasFriendshipRequestFrom(user);
    isSelf = profileUser.isSelf();
  }

  return {
    ready,
    areFriends,
    hasRequest,
    friends,
    friendsReady,
    hasPendingRequest,
    blocking,
    isSelf,
    profileUser,
    profile,
    params,
    user,
    percentUploaded: uploadingFile && uploadingFile.percent_uploaded,
  };
})(UserProfile);

export default UserProfileContainer;
