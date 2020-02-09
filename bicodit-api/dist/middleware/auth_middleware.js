"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TOKENTIME = 60 * 60 * 24 * 90;
var SECRET = "Obee1UrMyOnlyH0pe";
var authenticate = (0, _expressJwt["default"])({
  secret: SECRET
});

var generateAccessToken = function generateAccessToken(req, res, next) {
  req.token = req.token || {};
  req.token = _jsonwebtoken["default"].sign({
    id: req.user.id
  }, SECRET, {
    expiresIn: TOKENTIME // 90 days

  });
  next();
};

var respond = function respond(req, res) {
  res.status(200).json({
    account: req.user.id,
    token: req.token
  });
};

module.exports = {
  authenticate: authenticate,
  generateAccessToken: generateAccessToken,
  respond: respond
};
//# sourceMappingURL=auth_middleware.js.map