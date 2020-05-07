import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import jwtDecode from 'jwt-decode';

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
    token: req.token
  });
}

let respondWithData = (req, res) => {
  res.status(200).json({
    token: req.token,
    userData: {
      id: req.id,
      email: req.email,
      login: req.login,
      avatar: req.avatar || "rabbodefault",
      profileName: req.name || "",
      profileInfo: req.about || ""
    }
  });
}

module.exports = {
  authenticate,
  generateAccessToken,
  respond,
  respondWithData
}
