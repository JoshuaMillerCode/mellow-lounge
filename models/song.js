const { Schema, model } = require('mongoose');

const songSchema = new Schema({
    song: String,
    artist: String,
    img: Array
})

const Song = model('Song', songSchema);

module.exports = Song;