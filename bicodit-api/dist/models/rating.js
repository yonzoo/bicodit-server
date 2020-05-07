"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var ratingSchema = new Schema({
  userId: String,
  userLogin: String,
  userAvatar: String,
  text: String,
  value: Number,
  createdTime: Date
});
module.exports = _mongoose["default"].model('Rating', ratingSchema);
//# sourceMappingURL=rating.js.map