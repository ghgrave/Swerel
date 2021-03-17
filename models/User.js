const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: {
      type: String, 
      required: true
    },
    password: String,
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);