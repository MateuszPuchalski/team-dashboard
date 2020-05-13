const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
var eventSchema = new Schema({
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
  },
  location: Object,
  type: String,
  player: {
    type: Schema.Types.ObjectId,
    ref: "Player",
  },
  timestamp: Number,
  throw: Object,
  turnover: Object,
  punishment: Object,
});

//Export the model
module.exports = Event = mongoose.model("Event", eventSchema);
