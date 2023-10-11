'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
let englandData = require('./data/england.json');

const app = express();

// USE
app.use(cors());

const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('Hello there!');
});

app.get('/england', getEngland);

function getEngland(req, res, next) {
  try {
    res.status(200).send(englandData);
  } catch (err) {    
    next(err);
  }
}

app.get('*', (req, res) => {
  res.status(404).send('These are not the droids you are looking for...');
});

// CLASSES

// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message)
  response.status(500).send(error.message)
});

// LISTEN
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));