const axios = require('axios');
const Movie = require('../models/movie.model');
require('dotenv').config();

const TMDB_API_KEY =process.env.TMDB_API_KEY

async function fetchMovies(query, filter = false) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${TMDB_API_KEY}`;
  
    // if (filter) {
    //   url = `https://api.themoviedb.org/3/discover/movie?sort_by=release_date.asc&vote_count.gte=1500&vote_average.gte=8.4&with_watch_providers=8&watch_region=TR&api_key=${TMDB_API_KEY}`;
    // }

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
          releaseDate: movie.release_date,
          vote_average: movie.vote_average,
          provider: "Netflix", // Burada sabit ekliyoruz
          region: "TR",       // Burada sabit ekliyoruz
          poster_path: movie.poster_path,
        });
        console.log(`🎥 Kaydedildi: ${movie.title}`);
      } else {
        console.log(`❗ Zaten var: ${movie.title}`);
      }
    }
  }


module.exports = { fetchMovies, saveMovies };