const { Schema, model } = require('mongoose');

const songSchema = new Schema({
	song: String,
	artist: String,
	img: String,
	type: String
});

const Song = model('Song', songSchema);

module.exports = Song;
