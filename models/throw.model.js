const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
var throwSchema = new Schema({
  endLocation: {
    type: Object,
    required: true
  },

  outcome: {
    // Blocked, goal, post, saved ..
    type: String
  },
  technique: {
    //Jump Shot, Overarm, Underarm,
    type: String
  },
  type: {
    // Penalty,
    type: String
  }
});

//Export the model
module.exports = Event = mongoose.model("Throw", throwSchema);
