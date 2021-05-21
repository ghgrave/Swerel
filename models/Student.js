const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  first_name: {
    type: String,
    required: true, 
    trim: true,
    maxLength: 20
  },
  last_name: {
    type: String,
    required: true, 
    trim: true,
    maxLength: 20
  }
});

module.exports = mongoose.model("Student", StudentSchema);
