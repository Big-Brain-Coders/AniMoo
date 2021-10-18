import { Meteor } from 'meteor/meteor';
import { User } from 'meteor/socialize:user-model';

User.methods({
  aniMoofriends() {
    const ids = this.friends().map(friend => friend.friendId);
    return Meteor.users.find({ _id: { $in: ids }, status: { $exists: true } });
  },
});
