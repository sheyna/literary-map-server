
let englandData = require('../data/england.json');

// sends all location data
function getEngland(req, res, next) {
  try {
    res.status(200).send(englandData);
  } catch (err) {    
    next(err);
  }
}

module.exports = getEngland
