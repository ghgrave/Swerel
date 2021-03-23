const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
  _id: Number,
  title: {
    type: String,
    default: "Doggie Dog!!!"
  } ,
  votes: {
    type: Number,
    default: 0,
  },
  overview: {
    type: String,
    default: "No description at this time",
  },
  releaseDate: {
    type: String,
    default: "No release date at this time",
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
