const axios = require('axios');
const Movie = require('../models/movie.model');
require('dotenv').config();

const TMDB_API_KEY =process.env.TMDB_API_KEY

async function fetchMovies(query) {
//   const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;
//   const response = await axios.get(url);
//   return response.data.results;

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${TMDB_API_KEY}`;
  
    const response = await axios.get(url);
    return response.data.results;
}

async function saveMovies(movies) {
    for (const movie of movies) {
      const existingMovie = await Movie.findOne({ title: movie.title });
      
      if (!existingMovie) {
        await Movie.create({
          title: movie.title,
          overview: movie.overview,
          popularity: movie.popularity,
          releaseDate: movie.release_date
        });
        console.log(`🎥 Kaydedildi: ${movie.title}`);
      } else {
        console.log(`❗ Zaten var: ${movie.title}`);
      }
    }
  }


module.exports = { fetchMovies, saveMovies };