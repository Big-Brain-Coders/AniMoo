import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The AnimeCollection. It encapsulates state and variable values for stuff.
 */
class AnimeCollection {
  constructor() {
    // The name of this collection.
    this.name = 'AnimeCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: String,
      image_url: String,
      synopsis: String,
      episodes: {
        type: Number,
        optional: true,
      },
      rating: {
        type: Number,
        optional: true,
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the AnimeCollection.
 * @type {AnimeCollection}
 */
export const Anime = new AnimeCollection();
