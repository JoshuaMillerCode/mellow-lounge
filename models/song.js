const { Schema, model } = require('mongoose');

const songSchema = new Schema({
	song: String,
	artist: String,
	img: String
});

const Song = model('Song', songSchema);

module.exports = Song;
