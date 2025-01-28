const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  items: [menuItemSchema],
});

module.exports = mongoose.model("Menu", menuSchema);
