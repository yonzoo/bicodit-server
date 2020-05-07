"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _rating_middleware = require("../middleware/rating_middleware");

var _rating_data_ext = _interopRequireDefault(require("./extensions/rating_data_ext"));

var _user_data_ext = _interopRequireDefault(require("./extensions/user_data_ext"));

var _rating = _interopRequireDefault(require("../models/rating"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var config = _ref.config,
      db = _ref.db;
  var api = (0, _express.Router)(); // '/bicoditapi/rating/add'

  api.post('/add', function (req, res, next) {
    _user_data_ext["default"].findUserByToken(req.headers.token, function (err, user) {
      if (err) {
        res.status(400).send();
      } else if (user == null) {
        res.status(404).send();
      } else {
        var newRating = new _rating["default"]({
          userId: user.id,
          userLogin: user.username,
          userAvatar: user.avatar || "rabbodefault",
          text: req.body.text || "",
          value: req.body.ratingValue,
          createdTime: new Date()
        });
        newRating.save();
        req.rating = newRating;
        next();
      }
    });
  }, _rating_middleware.respondWithRating); // '/bicoditapi/rating/getall'

  api.get('/getall', function (req, res, next) {
    _rating_data_ext["default"].findRatingsByToken(req.headers.token, function (err, ratings) {
      if (err) {
        res.status(400).send();
      } else if (ratings == null) {
        res.status(404).send();
      } else {
        req.ratings = ratings.map(function (rating) {
          return {
            id: rating.id,
            userId: rating.userId,
            userLogin: rating.userLogin,
            avatar: rating.userAvatar,
            text: rating.text,
            value: rating.value,
            createdTime: rating.createdTime
          };
        });
        next();
      }
    });
  }, _rating_middleware.respondWithRatings);
  return api;
};

exports["default"] = _default;
//# sourceMappingURL=rating.js.map