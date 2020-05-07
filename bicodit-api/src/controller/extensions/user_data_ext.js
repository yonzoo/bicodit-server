import mongoose from 'mongoose';
import jwtDecode from 'jwt-decode';
import UserData from '../../models/account';

class UserDataExt {

  static findUserByToken(token, callback) {
    if (token) {
      const id = jwtDecode(token).id;
      UserData
      .findById(id)
      .populate('account')
      .exec(
        (err, userData) => {
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, userData);
          }
        }
      )
    } else {
      return callback("No token was provided", null);
    }
  }

  static findUserByEmail(email, callback) {
    UserData
    .findOne({ 'email': email })
    .populate('account')
    .exec(
      (err, userData) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, userData);
        }
      }
    )
  }

  static findUserByLogin(login, callback) {
    UserData
    .findOne({ 'username': login })
    .populate('account')
    .exec(
      (err, userData) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, userData);
        }
      }
    )
  }
}

export default UserDataExt;
