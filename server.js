require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

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

app.use((req, res) => {
  res.send('Hello, world!');
});

const port = PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
