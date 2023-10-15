const FavLocation = require('../models/favLocationModel');
const verifyUser = require('../auth');

const favorites = {};

favorites.handleGetFavorites = async (req, res, next) => {
// async function handleGetFavorites(req, res, next) {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      try {
        const favs = await FavLocation.find({email: user.email});
        res.status(200).send(favs);
      } catch (err) {
        next(err);
      }
    }
  });
}

favorites.handlePostFavorites = async (req, res, next) => {
// async function handlePostFavorites(req, res, next) {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      try {
        let newLocation = { 
          ...req.body,
          email: user.email
        }
        let createdLocation = await FavLocation.create(newLocation);
        res.status(200).send(createdLocation);
      } catch (err) {
        next(err);
      }
    }
  });
}

favorites.handleDeleteFavorites = async (req, res, next) => {
// async function handleDeleteFavorites(req, res, next) {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      try {
        let id = req.params.id;
        const favFromDb = await FavLocation.findById(id);
        if (favFromDb.email === user.email) {
          await FavLocation.findByIdAndDelete(id);
          res.status(200).send('Fav deleted');
        } else {
          res.status(404).send('The location you are trying to delete does not exist.');
        }
      } catch (err) {
        next(err);
      }
    }
  });
}

module.exports = favorites;
