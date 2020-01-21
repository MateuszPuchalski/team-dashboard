const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
var competitionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  countryName: {
    type: String,
    required: true
  },
  seasonName: {
    type: String,
    required: true
  }
});

//Export the model
module.exports = Competition = mongoose.model("Competition", competitionSchema);
