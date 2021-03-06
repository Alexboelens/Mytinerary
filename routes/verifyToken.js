var jwt = require('jsonwebtoken');
var config = require('../config');




const verifyToken = (req, res, next) => {
  var token = req.headers['token'];
  if (!token)
    return res.send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, (err, result) => {
    if (err)
      return res.send({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = result.id;
    next();
  });
}

module.exports = verifyToken;