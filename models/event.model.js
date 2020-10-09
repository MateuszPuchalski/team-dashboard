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
      enum: [
        "Foul",
        "Half Start",
        "Half End",
        "Interception",
        "Throw",
        "Turnover",
        "Pass",
        "Punishment",
      ],
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
    team: {
      type: Schema.Types.ObjectId,
      ref: "Club",
    },
    location: [Number],
    playPattern: {
      type: String,
      enum: ["Regular PLay", "Fast Break"],
    },
    throw: {
      endLocation: [Number],
      outcome: {
        type: String,
        enum: ["Goal", "Saved", "Miss", "Post", "Blocked"],
      },
      technique: {
        type: String,
        enum: [
          "Jump Shot",
          "Hip Shot",
          "Overarm Shot",
          "Spin Shot",
          "Lob",
          "7m",
        ],
      },
      type: {
        type: String,
        enum: ["7m", "Open Play"],
      },
    },
  })
);

const Foul = Event.discriminator(
  "Foul",
  new Schema({
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Club",
    },
    location: [Number],
    punishment: {
      type: String,
      enum: ["2min", "Yellow Card", "Red Card", "Blue Card", "None"],
    },
    penalty: Boolean,
  })
);

const Turnover = Event.discriminator(
  "Turnover",
  new Schema({
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Club",
    },
    playPattern: {
      type: String,
      enum: ["Regular PLay", "Fast Break"],
    },
    location: [Number],
    turnover: { type: String, enum: ["Pass", "Catch", "Dribble"] },
  })
);

const Pass = Event.discriminator(
  "Pass",
  new Schema({
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Club",
    },
    playPattern: {
      type: String,
      enum: ["Regular PLay", "Fast Break"],
    },
    pass: {
      recipient: { type: Schema.Types.ObjectId, ref: "Player" },
      throwAssist: Boolean,
      goalAssist: Boolean,
    },
  })
);

const BadBehaviour = Event.discriminator(
  "Punishment",
  new Schema({
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Club",
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
