import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60*60*24*90;
const SECRET = "Obee1UrMyOnlyH0pe";

let authenticate = expressJwt({ secret: SECRET });

let generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign ({
    id: req.user.id,
  }, SECRET, {
    expiresIn: TOKENTIME // 90 days
  });
  next();
}

let respond = (req, res) => {
  res.status(200).json({
    account: req.user.id,
    token: req.token
  });
}

module.exports = {
  authenticate,
  generateAccessToken,
  respond
}
