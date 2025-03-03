const { fetchMovies, saveMovies } = require('../services/movie.service');
const Movie = require("../models/movie.model");

module.exports.Movie = {
    // list: async (req, res) => {
    //     const data = await Movie.find();
    //     res.status(200).send({
    //       error: false,
    //       data: data,
    //     });
    //   },
        list: async (req, res)=>{
            console.log(req.query); // Burada query'nin gelip gelmediğine bak
            const { query,filter } = req.query;

            if (query) {
                const movies = await fetchMovies(query, filter=='true');
                await saveMovies(movies);
                return res.json(movies);
            }
            if (filter === "true") {
              const filteredMovies = await Movie.find({
                  vote_average: { $gte: 7 },
                  vote_count: { $gte: 1500 },
                  provider: "Netflix",
                  region: "TR",
              }).sort({ release_date: 1 }).limit(5);
              return res.json(filteredMovies);
          }

  const data = await Movie.find();
  return res.json(data);
        },
      create: async (req, res) => {
        const data = await Movie.create(req.body);
        res.status(201).send({
          error: false,
          body: req.body,
          data,
        });
      },
      read: async (req, res) => {
        const data = await Movie.find({ _id: req.params.movieId }); //!! route da ne verdiysen burada da aynisini kullan, bizim icin movieId simdi
        res.status(202).send({
          error: false,
          data: data, //* read hakkinda bilgi getirir
        });
      },
      update: async (req, res) => {
        const data = await Movie.updateOne({ _id: req.params.movieId }, req.body);
        const newData = await Movie.find({ _id: req.params.movieId });
        res.status(202).send({
          error: false,
          body: req.body,
          data, //* update hakkinda bilgi getirir
          //* guncel veriyi gormek istiyorsan tekrara cagir
          newData,
        });
      },
      delete: async (req, res) => {
        const data = await Movie.deleteOne({ _id: req.params.movieId });
        // console.log(data)
        res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
      },
}