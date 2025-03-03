const mongoose = require('mongoose');
const { Schema } = mongoose;

const netflixMovieSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  overview: { type: String },
  popularity: { type: Number },
  voteAverage: { type: Number },
  voteCount: { type: Number },
  releaseDate: { type: String },
  genres: [{ id: Number, name: String }],
});

module.exports = mongoose.model('NetflixMovie', netflixMovieSchema, 'netflix.movies');
