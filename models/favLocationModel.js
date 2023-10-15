'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const favLocationSchema = new Schema({
  locationId: {type: Number, required: true},
  title: {type: String, required: true},
  book: {type: String, required: true},
  author: {type: String, required: true},
  positionTop: {type: Number, required: true},
  positionLeft: {type: Number, required: true},
  townName: {type: String, required: true},
  bodyText: {type: String, required: true},
  email: {type: String, required: true}
});

const FavLocation = mongoose.model('FavLocation', favLocationSchema);

module.exports = FavLocation;
