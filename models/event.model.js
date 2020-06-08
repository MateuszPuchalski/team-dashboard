const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;
const options = { discriminatorKey: "type" };
// Declare the Schema of the Mongo model
const eventSchema = new Schema(
  {
    matchId: {
      type: Schema.Types.ObjectId,
      ref: "Match",
    },
    type: {
      type: String,
      required: true,
      enum: ["Throw", "Punishment", "Turnover", "Half Start", "Half End"],
    },
    timestamp: Number,
  },
  options
);

Event = mongoose.model("Event", eventSchema);

const Throw = Event.discriminator(
  "Throw",
  new Schema({
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
    location: [Number],
    throw: {
      endLocation: [Number],
      outcome: { type: String, enum: ["Goal", "Saved", "Blocked"] },
      technique: {
        type: String,
        enum: ["Jump Shot", "Hip Shot", "Running Shot"],
      },
    },
  })
);

const Turnover = Event.discriminator(
  "Turnover",
  new Schema({
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
    location: [Number],
    turnover: { type: { type: String, enum: ["Pass", "Catch", "Dribble"] } },
  })
);

const Punishment = Event.discriminator(
  "Punishment",
  new Schema({
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
    location: [Number],
    punishment: {
      type: {
        type: String,
        enum: ["Red Card", "Yellow Card", "Blue Card", "2min"],
      },
    },
  })
);

//Export the model
module.exports = Event;
