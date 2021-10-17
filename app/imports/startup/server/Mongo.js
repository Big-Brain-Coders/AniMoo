import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Anime } from '../../api/anime/Anime.js';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the database with a default data document.
function addAnime(data) {
  console.log(`  Adding: ${data.title}`);
  Anime.collection.insert({
    title: data.title,
    img_url: data.image_url,
    synopsis: data.synopsis,
    episodes: data.episodes,
    rating: data.score,
  });
}

// Initialize the AnimeCollection if empty.
if ((Meteor.settings.loadAssetsFile) && (Anime.collection.find().count() === 0)) {
  console.log('Loading data anime data');
  const jsonData = JSON.parse(Assets.getText('anime.json'));
  jsonData.defaultAnimeData.map(data => addAnime(data));
}
