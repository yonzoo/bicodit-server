"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireWildcard(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _config = _interopRequireDefault(require("../config"));

var _account = _interopRequireDefault(require("../models/account"));

var _user = _interopRequireDefault(require("../models/user"));

var _user_data_ext = _interopRequireDefault(require("./extensions/user_data_ext"));

var _auth_middleware = require("../middleware/auth_middleware");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var config = _ref.config,
      db = _ref.db;
  var api = (0, _express.Router)();
  api.get('/kek', function (req, res) {
    console.log("LOL");
  }); // '/bicoditapi/account/register'

  api.post('/register', function (req, res, next) {
    _user_data_ext["default"].findUserByEmail(req.body.email, function (err, userData) {
      if (err) {
        res.status(409).json({
          message: "An error occured: ".concat(err.message)
        });
      } else if (userData) {
        res.status(300).json({
          message: "Email ".concat(req.body.email, " is already registered")
        });
      } else {
        _user_data_ext["default"].findUserByLogin(req.body.login, function (err, user) {
          if (err) {
            res.status(409).json({
              message: "An error occured: ".concat(err.message)
            });
          } else if (user) {
            res.status(300).json({
              message: "Login ".concat(req.body.login, " is already registered")
            });
          } else {
            _account["default"].register(new _account["default"]({
              username: req.body.login,
              email: req.body.email
            }), req.body.password, function (err, account) {
              if (err) {
                res.status(500).json({
                  message: err
                });
              }

              _passport["default"].authenticate('local', {
                session: false
              })(req, res, function () {
                var newUser = new _user["default"]({
                  account: req.user._id,
                  name: "",
                  about: ""
                });
                newUser.save(function (err) {
                  if (err) {
                    res.status(500).json({
                      message: err
                    });
                  } else {
                    next();
                  }
                });
              });
            });
          }
        });
      }
    });
  }, _auth_middleware.generateAccessToken, _auth_middleware.respond); // '/bicoditapi/account/login'

  api.post('/login', function (req, res, next) {
    _user_data_ext["default"].findUserByEmail(req.body.email, function (err, user) {
      if (err) {
        res.status(409).json({
          message: "An error occured: ".concat(err.message)
        });
      } else {
        req.body.login = user.username;
        next();
      }
    });
  }, _passport["default"].authenticate('local', {
    session: false,
    scope: [],
    failWithError: true
  }), function (err, req, res, next) {
    if (err) {
      res.status(401).json({
        message: "Email or password invalid, please check your credentials"
      });
    }
  }, _auth_middleware.generateAccessToken, _auth_middleware.respond); // '/bicoditapi/account/logout'

  api.get('/logout', _auth_middleware.authenticate, function (req, res) {
    res.logout();
    res.status(200).send('Successfully logged out');
  });
  api.get('/me', _auth_middleware.authenticate, function (req, res) {
    res.status(200).json(req.user);
  });
  return api;
};

exports["default"] = _default;
//# sourceMappingURL=account.js.map