const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const movieRoutes = require('./src/routes/movie.route');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const axios = require('axios');

dotenv.config();

const BASE_URL = process.env.TMDB_API_URL
const API_KEY = process.env.TMDB_API_KEY

const app = express();
app.use(express.json());

require("./src/dbConnection");
// const connectDB = require('./src/dbConnection');
// connectDB(); // MongoDB bağlantısını başlat

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use('/api/movie', movieRoutes);

app.all("/api", (req, res) => {
  res.send("WELCOME TO MOVIE API PROJECT");
});

app.use("/api", require("./src/routes/movie.route"));

app.get('/movies', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1, // İlk sayfa
        sort_by: 'popularity.desc', // Popülerliğe göre sırala
      },
    });

    // İlk 50 film verisini al
    const movies = response.data;

    // Film verilerini döndür
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching movies.' });
  }
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie API',
      version: '1.0.0',
      description: 'TMDB Movie API Documentation',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});