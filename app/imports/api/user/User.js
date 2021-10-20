import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The UserCollection. It encapsulates state and variable values for users.
 */
class UserCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UserCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      email: String,
      firstName: {
        type: String,
        defaultValue: '',
      },
      lastName: {
        type: String,
        defaultValue: '',
      },
      likedShows: {
        type: Array,
        defaultValue: [],
      },
      'likedShows.$': String,
      friends: {
        type: Array,
        defaultValue: [],
      },
      'friends.$': String,
      image: {
        type: String,
        defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        optional: true,
      },
      displayName: String,
      bio: {
        type: String,
        defaultValue: '',
        optional: true,
      },
      messages: {
        type: Array,
        defaultValue: [],
      },
      'messages.$': Object,
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.publicPublicationName = `${this.name}.publication.public`;
  }
}

/**
 * The singleton instance of the UserCollection.
 * @type {UserCollection}
 */
export const Users = new UserCollection();
