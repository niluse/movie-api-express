const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  releaseDate: { type: String },
  overview: { type: String },
  popularity: { type: Number },
});

module.exports = mongoose.model('Movie', movieSchema);