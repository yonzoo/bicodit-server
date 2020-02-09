"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodb = _interopRequireDefault(require("mongodb"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(callback) {
  var db; // Connect to the database before starting the application server.

  _mongoose["default"].connect(_config["default"].mongoUrl, function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log(_config["default"].mongoUrl); // Save database object from the callback for reuse.

    db = database;
    console.log("Database connection ready");
    callback(db);
  });
};

exports["default"] = _default;
//# sourceMappingURL=db.js.map