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
    enum: ["Throw", "Half Start", "Turnover", "Half End", "Bad Behaviour"],
    required: true
  },

  team: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: true
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: "Player"
  },
  location: {
    type: Object
  },
  relatedEvents: {
    type: Array
  },

  BadBehaviour: {
    type: String,
    required: function() {
      if (this.type === "Bad Behaviour") return true;
    }
  },
  throw: {
    outcome: {
      // Blocked, goal, post, saved ..
      type: String,
      required: function() {
        if (this.type === "Throw") return true;
      }
    },

    endLocation: {
      type: Object,
      required: function() {
        if (this.type === "Throw") return true;
      }
    },

    technique: {
      //Jump Shot, Overarm, Underarm,
      type: String,
      required: function() {
        if (this.type === "Throw") return true;
      }
    },

    type: {
      // Penalty,
      type: String,
      required: function() {
        if (this.type === "Throw") return true;
      }
    }
  }
});

//Export the model
module.exports = Event = mongoose.model("Event", eventSchema);
