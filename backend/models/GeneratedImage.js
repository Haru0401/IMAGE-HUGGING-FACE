// backend/models/GeneratedImage.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeneratedImageSchema = new Schema({
  text: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('GeneratedImage', GeneratedImageSchema);
