const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    original_language:{type: String},
    overview: { type: String },
    popularity:{type: Number},
    poster_path: { type: String },
    release_date: { type: String },
    title: { type: String, required: true },
    video:{type:Boolean},
    vote_average: { type: Number }, // Oy ortalaması
    vote_count:{type:Number},
    genres: [{ id: Number, name: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);