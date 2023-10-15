'use strict';

// jwt - json web token
const jwt = require('jsonwebtoken');

// jwks - json web key set
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

// this comes from the jsonwebtoken docs
// https://www.npmjs.com/package/jsonwebtoken (search for auth0)
function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// we need to verfy the user
function verifyUser(req, errorFirstOrUserCallbackFunction) {
  try {
    // extract the token from the user's request
    const token = req.headers.authorization.split(' ')[1];
    // from jsonwebtoken docs
    jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction)
  } catch(error) {
    errorFirstOrUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;
