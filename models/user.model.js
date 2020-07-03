const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: { type: [String], required: true }, // array of string for multiple roles
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", userSchema);
