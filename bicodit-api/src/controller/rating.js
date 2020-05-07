import { Router } from 'express';

import { respondWithRatings, respondWithRating } from '../middleware/rating_middleware';
import RatingDataExt from './extensions/rating_data_ext';
import UserDataExt from './extensions/user_data_ext';

import Rating from '../models/rating';

export default ({ config, db }) => {
  let api = Router();

  // '/bicoditapi/rating/add'
  api.post('/add', (req, res, next) => {
    UserDataExt.findUserByToken(req.headers.token, (err, user) => {
      if (err) {
        res.status(400).send();
      } else if (user == null) {
        res.status(404).send();
      } else {
        const newRating = new Rating({
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
    })
  }, respondWithRating);

  // '/bicoditapi/rating/getall'
  api.get('/getall', (req, res, next) => {
    RatingDataExt.findRatingsByToken(req.headers.token, (err, ratings) => {
      if (err) {
        res.status(400).send();
      } else if (ratings == null) {
        res.status(404).send();
      } else {
        req.ratings = ratings.map(rating => {
          return {
            id: rating.id,
            userId: rating.userId,
            userLogin: rating.userLogin,
            avatar: rating.userAvatar,
            text: rating.text,
            value: rating.value,
            createdTime: rating.createdTime
          }
        });
        next();
      }
    })
  }, respondWithRatings);

  return api;
}