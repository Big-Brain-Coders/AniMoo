import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Anime } from '../../api/anime/Anime.js';
import { Users } from '../../api/user/User';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addAnime(data) {
  console.log(`  Adding: ${data.title}`);
  Anime.collection.insert({
    title: data.title,
    image_url: data.image_url,
    synopsis: data.synopsis,
    episodes: data.episodes,
    rating: data.score,
  });
}

/** Initialize the database with a default users. */
function addUser(data) {
  console.log(`  Adding: ${data.email}`);
  Users.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating default data.');
    Meteor.settings.defaultUsers.map(data => addUser(data));
  }
}

// Initialize the AnimeCollection if empty.
if ((Meteor.settings.loadAssetsFile) && (Anime.collection.find().count() === 0)) {
  console.log('Loading data anime data');
  const jsonData = JSON.parse(Assets.getText('anime.json'));
  jsonData.defaultAnimeData.map(data => addAnime(data));
}
