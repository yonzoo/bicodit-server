import mongoose from 'mongoose';
import jwtDecode from 'jwt-decode';
import RatingData from '../../models/rating';

class RatingDataExt {

  static findRatingsByToken(token, callback) {
    const userId = jwtDecode(token).id;
    RatingData
    .find({ 'userId': userId })
    .exec(
      (err, ratings) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, ratings);
        }
      }
    )
  }
}

export default RatingDataExt;
