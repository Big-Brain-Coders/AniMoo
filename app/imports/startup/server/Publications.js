import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { User } from 'meteor/socialize:user-model';
import { Stuffs } from '../../api/stuff/Stuff';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});


publishComposite('onlineFriends', {
  find() {
    return User.createEmpty(this.userId).friends();
  },
  children: [
    {
      find(friend) {
        return Meteor.users.find({ _id: friend.friendId, status: { $exists: true } }, { fields: User.fieldsToPublish });
      },
    },
  ],
});

Meteor.publish(null, function publishNewUsers() {
  return Meteor.users.find({ _id: { $ne: this.userId } }, { limit: 18, sort: { createdAt: -1 }, fields: { ...User.fieldsToPublish, createdAt: 1 } });
});

Meteor.publish(null, function appData() {
  return Meteor.users.find({ _id: this.userId }, { fields: { ...User.fieldsToPublish, friendCount: 1 } });
}, { is_auto: true });
