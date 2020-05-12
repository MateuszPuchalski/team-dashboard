const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
var eventSchema = new Schema({
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
  },
  type: String,
  player: {
    type: Schema.Types.ObjectId,
    ref: "Player",
  },
  timestamp: Number,
  Throw: Object,
  Turnover: Object,
  Punishment: Object,
});

//Export the model
module.exports = Event = mongoose.model("Event", eventSchema);
