const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const movieRoutes = require('./src/routes/movie.route');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

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