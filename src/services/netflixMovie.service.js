const axios = require('axios');
const NetflixMovie = require('../models/netflixMovie.model');
const API_URL = process.env.TMDB_API_URL;
const API_KEY = process.env.TMDB_API_KEY;

const fetchMovieDetails = async (id) => {
  const url = `${API_URL}/movie/${id}?api_key=${API_KEY}`;
  const response = await axios.get(url);
  const { title, overview, popularity, vote_average, vote_count, release_date, genres } = response.data;

  return {
    id,
    name: title,
    overview,
    popularity,
    voteAverage: vote_average,
    voteCount: vote_count,
    releaseDate: release_date,
    genres: genres.map(g => ({ id: g.id, name: g.name }))
  };
};

async function saveNetflixMovie(movieDetails) {
    const movie = {
      id: movieDetails.id,
      name: movieDetails.name,
      overview: movieDetails.overview,
      popularity: movieDetails.popularity,
      voteAverage: movieDetails.vote_average,
      voteCount: movieDetails.vote_count,
      releaseDate: movieDetails.release_date,
      genre: movieDetails.genres.map(g => ({ id: g.id, name: g.name })),
    };
  
    await NetflixMovie.create(movie);
  }

module.exports = { fetchMovieDetails, saveNetflixMovie };
