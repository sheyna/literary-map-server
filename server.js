'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const favorites = require('./modules/favorites');

const getEngland = require('./modules/england');

const app = express();

// USE
app.use(cors());
app.use(express.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.MONGO_URL)

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('Hello there!');
});

// — England
app.get('/england', getEngland);

// — Favorites
app.get('/favorites', favorites.handleGetFavorites);
app.post('/favorites', favorites.handlePostFavorites);
app.delete('/favorites/:id', favorites.handleDeleteFavorites);

app.get('*', (req, res) => {
  res.status(404).send('These are not the droids you are looking for...');
});

// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message)
  response.status(500).send(error.message)
});

// LISTEN
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
