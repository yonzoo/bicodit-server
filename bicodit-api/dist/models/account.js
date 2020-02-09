"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passportLocalMongoose = _interopRequireDefault(require("passport-local-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var Account = new Schema({
  username: String,
  email: String,
  password: String
});
Account.plugin(_passportLocalMongoose["default"]);
module.exports = _mongoose["default"].model('Account', Account);
//# sourceMappingURL=account.js.map