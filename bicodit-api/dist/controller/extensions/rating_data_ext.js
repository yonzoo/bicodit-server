"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _rating = _interopRequireDefault(require("../../models/rating"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RatingDataExt =
/*#__PURE__*/
function () {
  function RatingDataExt() {
    _classCallCheck(this, RatingDataExt);
  }

  _createClass(RatingDataExt, null, [{
    key: "findRatingsByToken",
    value: function findRatingsByToken(token, callback) {
      var userId = (0, _jwtDecode["default"])(token).id;

      _rating["default"].find({
        'userId': userId
      }).exec(function (err, ratings) {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, ratings);
        }
      });
    }
  }]);

  return RatingDataExt;
}();

var _default = RatingDataExt;
exports["default"] = _default;
//# sourceMappingURL=rating_data_ext.js.map