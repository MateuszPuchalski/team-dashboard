const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var seasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

//Export the model
module.exports = Season = mongoose.model("Season", userSchema);
