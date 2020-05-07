"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _account = _interopRequireDefault(require("../models/account"));

var _user = _interopRequireDefault(require("../models/user"));

var _user_data_ext = _interopRequireDefault(require("./extensions/user_data_ext"));

var _auth_middleware = require("../middleware/auth_middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(_ref) {
  var config = _ref.config,
      db = _ref.db;
  var api = (0, _express.Router)(); // '/bicoditapi/account/register'

  api.post('/register', function (req, res, next) {
    _user_data_ext["default"].findUserByEmail(req.body.email, function (err, userData) {
      if (err) {
        res.status(400).send();
      } else if (userData) {
        res.status(403).send();
      } else {
        _user_data_ext["default"].findUserByLogin(req.body.login, function (err, user) {
          if (err) {
            res.status(400).send();
          } else if (user) {
            res.status(403).send();
          } else {
            _account["default"].register(new _account["default"]({
              username: req.body.login,
              email: req.body.email
            }), req.body.password, function (err, account) {
              if (err) {
                res.status(400).send();
              }

              _passport["default"].authenticate('local', {
                session: false
              })(req, res, function () {
                var newUser = new _user["default"]({
                  account: req.user._id,
                  avatar: "rabbodefault",
                  name: "",
                  about: ""
                });
                newUser.save(function (err) {
                  if (err) {
                    res.status(400).send();
                  } else {
                    req.id = newUser.id;
                    req.name = newUser.name;
                    req.about = newUser.about;
                    req.email = account.email;
                    req.login = account.username;
                    next();
                  }
                });
              });
            });
          }
        });
      }
    });
  }, _auth_middleware.generateAccessToken, _auth_middleware.respondWithData); // '/bicoditapi/account/login'

  api.post('/login', function (req, res, next) {
    _user_data_ext["default"].findUserByLogin(req.body.login, function (err, user) {
      if (err) {
        res.status(400).send();
      } else if (user == null) {
        res.status(404).send();
      } else {
        req.id = user.id;
        req.avatar = user.avatar;
        req.name = user.name;
        req.about = user.about;
        req.email = user.email;
        req.login = user.username;
        next();
      }
    });
  }, _passport["default"].authenticate('local', {
    session: false,
    scope: [],
    failWithError: true
  }), function (err, req, res, next) {
    if (err) {
      res.status(403).send();
    }
  }, _auth_middleware.generateAccessToken, _auth_middleware.respondWithData); // '/bicoditapi/account/logout'

  api.get('/logout', _auth_middleware.authenticate, function (req, res) {
    res.logout();
    res.status(200).send('Successfully logged out');
  }); // '/bicoditapi/account/me'

  api.get('/me', function (req, res, next) {
    _user_data_ext["default"].findUserByToken(req.headers.token, function (err, user) {
      if (err) {
        res.status(400).send();
      } else if (user == null) {
        res.status(404).send();
      } else {
        req.id = user.id;
        req.avatar = user.avatar;
        req.name = user.name;
        req.about = user.about;
        req.email = user.email;
        req.login = user.username;
        next();
      }
    });
  }, _auth_middleware.respondWithData);
  return api;
};

exports["default"] = _default;
//# sourceMappingURL=account.js.map