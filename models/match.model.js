const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
var matchSchema = new Schema({
  competition: {
    type: Schema.Types.ObjectId,
    ref: "Competition"
  },
  matchDate: {
    type: Date
  },
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: true
  },
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: true
  },
  homeScore: {
    type: Number,
    required: true
  },
  awayScore: {
    type: Number,
    required: true
  },
  ytId: {
    type: String
  }
});

//Export the model
module.exports = Match = mongoose.model("Match", matchSchema);
