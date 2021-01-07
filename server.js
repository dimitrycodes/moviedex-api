require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const MOVIES = require('./movies-data-small.json')

const { API_TOKEN, PORT } = process.env;

function validateBearerToken(req, res, next) {
  const apiToken = API_TOKEN;
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
}

const app = express();

app.use(morgan('dev'));

app.use(validateBearerToken);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

function handleGetMovie(req, res) {
  let response = MOVIES;

  if (req.query.genre) {
    response = response.filter((movie) =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }

  res.json(response);
}

app.get('/movie', handleGetMovie);

const port = PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
