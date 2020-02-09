"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _account = _interopRequireDefault(require("../../models/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserDataExt =
/*#__PURE__*/
function () {
  function UserDataExt() {
    _classCallCheck(this, UserDataExt);
  }

  _createClass(UserDataExt, null, [{
    key: "findUserByEmail",
    value: function findUserByEmail(email, callback) {
      _account["default"].findOne({
        'email': email
      }, function (err, userData) {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, userData);
        }
      });
    }
  }, {
    key: "findUserByLogin",
    value: function findUserByLogin(login, callback) {
      _account["default"].findOne({
        'login': login
      }, function (err, userData) {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, userData);
        }
      });
    }
  }]);

  return UserDataExt;
}();

var _default = UserDataExt;
exports["default"] = _default;
//# sourceMappingURL=user_data_ext.js.map