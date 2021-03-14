const mongoose = require('mongoose');
const {Schema} = mongoose;

const MovieSchema = new Schema({
    title: String,
    votes: {
        type: Number,
        default: 0
    },
    overview: { 
        type:String,
        default: "No description at this time"
    },
    releaseDate: {
        type: String,
        default: "No release date at this time"
    }

})

module.exports = mongoose.model('movies', MovieSchema);