const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
var eventSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
    required: true
  },
  period: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  on: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "onType"
  },
  onType: {
    type: String,
    required: true,
    enum: ["Throw"]
  },
  team: {
    type: Schema.Types.ObjectId,
    required: true
  },
  player: {
    type: Schema.Types.ObjectId,
    required: true
  },
  location: {
    type: Object
  },
  relatedEvents: {
    type: Array
  }
});

//Export the model
module.exports = Event = mongoose.model("Event", eventSchema);
