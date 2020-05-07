let respondWithRatings = (req, res) => {
  res.status(200).json({
    ratings: req.ratings
  });
}

let respondWithRating = (req, res) => {
  res.status(200).json({
    id: req.rating.id,
    userId: req.rating.userId,
    userLogin: req.rating.userLogin,
    avatar: req.rating.userAvatar,
    text: req.rating.text,
    value: req.rating.value,
    createdTime: req.rating.createdTime
  });
}

module.exports = {
  respondWithRatings,
  respondWithRating
}
