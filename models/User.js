const mongoose = require('mongoose');
const {Schema} = mongoose;
const Movie = require("../models/Movie");

const UserSchema = new Schema({
    username: {
      type: String, 
      required: true
    },
    password: {
      type: String,
      required: true
    },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('User', UserSchema);