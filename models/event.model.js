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
  type: {
    type: String,
    enum: ["throw"],
    required: true
  },

  team: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: true
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    required: true
  },
  location: {
    type: Object
  },
  relatedEvents: {
    type: Array
  },
  throw: {
    endLocation: {
      type: Object,
      required: function() {
        if (this.type === "throw") return true;
      }
    },

    outcome: {
      // Blocked, goal, post, saved ..
      type: String,
      required: function() {
        if (this.type === "throw") return true;
      }
    },

    technique: {
      //Jump Shot, Overarm, Underarm,
      type: String,
      required: function() {
        if (this.type === "throw") return true;
      }
    },

    type: {
      // Penalty,
      type: String,
      required: function() {
        if (this.type === "throw") return true;
      }
    }
  }
});

//Export the model
module.exports = Event = mongoose.model("Event", eventSchema);
