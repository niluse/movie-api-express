const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  releaseDate: { type: String },
  overview: { type: String },
  popularity: { type: Number },
  vote_average: { type: Number }, // Oy ortalaması
  provider: { type: String },     // Netflix gibi platform adı
  region: { type: String },       // TR
  poster_path: { type: String },
},{timestamps:true});

module.exports = mongoose.model('Movie', movieSchema);