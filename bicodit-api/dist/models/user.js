"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _helper = _interopRequireDefault(require("../utils/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema(_defineProperty({
  account: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Account'
  },
  name: String,
  "default": "",
  about: String
}, "default", "")); // userSchema.pre('save', true, function(next, done) {
//     var self = this
//     if (self.username.length > 0) {
//         const validateNameMsg = validator.username(self.username)
//         if (validateNameMsg) {
//             self.invalidate('name', validateNameMsg)
//             next(new Error(validateNameMsg))
//         }
//     }
//     if (self.about.length > 0) {
//         const validateAboutMsg = validator.about(self.about)
//         if (validateAboutMsg) {
//             self.invalidate('about', validateAboutMsg)
//             next(new Error(validateAboutMsg))
//         }
//     }
//     next()
// })

module.exports = _mongoose["default"].model('User', userSchema);
//# sourceMappingURL=user.js.map