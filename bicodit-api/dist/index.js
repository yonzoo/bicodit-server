"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _config = _interopRequireDefault(require("./config"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import socket from 'socket.io';
// import Message from './model/message';
// import Channel from './model/channel';
var LocalStrategy = require('passport-local').Strategy;

var app = (0, _express["default"])();
app.server = _http["default"].createServer(app); // let io = socket(app.server);
//middleware
//parse application/json

app.use(_bodyParser["default"].json({
  limit: _config["default"].bodyLimit
})); //passport config

app.use(_passport["default"].initialize());

var Account = require('./models/account');

_passport["default"].use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
}, Account.authenticate()));

_passport["default"].serializeUser(Account.serializeUser());

_passport["default"].deserializeUser(Account.deserializeUser());

app.use('/bicoditapi', _routes["default"]); // Base URL test endpoint to see if API is running

app.get('/', function (req, res) {
  res.json({
    message: 'Bicodit API is ALIVE!'
  });
});
app.server.listen(_config["default"].port);
console.log("Started on port ".concat(app.server.address().port));
module.exports = {
  app: app
};
//# sourceMappingURL=index.js.map