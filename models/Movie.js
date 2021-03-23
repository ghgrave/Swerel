const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
  _id: Number,
  title: {
    type: String,
    default: "Doggie Dog!!!"
  } ,
  vote_average: {
    type: Number,
    default: 0,
  },
  overview: {
    type: String,
    default: "No description at this time",
  },
  release_date: {
    type: String,
    default: "No release date at this time",
  },
  poster_path: {
    type: String,
    default: this.title
  }
});

module.exports = mongoose.model("Movie", MovieSchema);
