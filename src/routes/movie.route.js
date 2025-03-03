const express = require('express');
const router = express.Router();
const { fetchMovies } = require('../services/movie.service');

const { route } = require("express/lib/router");
const  {Movie}  = require("../controllers/movie.controller");

router.route("/movies").get(Movie.list).post(Movie.create);

router
  .route("/movies/:movieId")
  .get(Movie.read)
  .put(Movie.update) 
  .patch(Movie.update)
  .delete(Movie.delete);


module.exports = router;