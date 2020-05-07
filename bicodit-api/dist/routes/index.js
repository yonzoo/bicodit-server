"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("../config"));

var _middleware = _interopRequireDefault(require("../middleware"));

var _db = _interopRequireDefault(require("../db"));

var _user = _interopRequireDefault(require("../controller/user"));

var _account = _interopRequireDefault(require("../controller/account"));

var _rating = _interopRequireDefault(require("../controller/rating"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])(); //connect to db

(0, _db["default"])(function (db) {
  //internal middleware
  router.use((0, _middleware["default"])({
    config: _config["default"],
    db: db
  }));
  router.use('/account', (0, _account["default"])({
    config: _config["default"],
    db: db
  }));
  router.use('/user', (0, _user["default"])({
    config: _config["default"],
    db: db
  }));
  router.use('/rating', (0, _rating["default"])({
    config: _config["default"],
    db: db
  }));
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map