"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _ref;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema((_ref = {
  account: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Account'
  },
  avatar: String,
  "default": "rabbodefault",
  name: String
}, _defineProperty(_ref, "default", ""), _defineProperty(_ref, "about", String), _defineProperty(_ref, "default", ""), _ref));
module.exports = _mongoose["default"].model('User', userSchema);
//# sourceMappingURL=user.js.map