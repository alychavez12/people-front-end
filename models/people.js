const mongoose = require("mongoose");

const PeopleSchema = new mongoose.Schema({
  name: String,
  image: String,
  title: String,
  createdBy: String // google firebase user uid
}, { timestamps: true });


module.exports = mongoose.model("People", PeopleSchema);
