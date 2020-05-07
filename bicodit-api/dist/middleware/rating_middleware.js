"use strict";

var respondWithRatings = function respondWithRatings(req, res) {
  res.status(200).json({
    ratings: req.ratings
  });
};

var respondWithRating = function respondWithRating(req, res) {
  res.status(200).json({
    id: req.rating.id,
    userId: req.rating.userId,
    userLogin: req.rating.userLogin,
    avatar: req.rating.userAvatar,
    text: req.rating.text,
    value: req.rating.value,
    createdTime: req.rating.createdTime
  });
};

module.exports = {
  respondWithRatings: respondWithRatings,
  respondWithRating: respondWithRating
};
//# sourceMappingURL=rating_middleware.js.map