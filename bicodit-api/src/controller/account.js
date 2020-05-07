import e, { Router } from 'express';
import passport from 'passport';
import Account from '../models/account';
import User from '../models/user';
import UserDataExt from './extensions/user_data_ext';

import { generateAccessToken, respond, respondWithData, authenticate } from '../middleware/auth_middleware';

export default ({ config, db }) => {
  let api = Router();

  // '/bicoditapi/account/register'
  api.post('/register', (req, res, next) => {
    UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
      if (err) {
        res.status(400).send();
      } else if (userData) {
        res.status(403).send();
      } else {
        UserDataExt.findUserByLogin(req.body.login, (err, user) => {
          if (err) {
            res.status(400).send();
          } else if (user) {
            res.status(403).send();
          } else {
            Account.register(new Account({ username: req.body.login, email: req.body.email }), req.body.password, function(err, account) {
              if (err) {
                res.status(400).send();
              }
              passport.authenticate('local', { session: false })(req, res, () => {
                const newUser = new User({ account: req.user._id, avatar: "rabbodefault", name: "", about: "" })
                newUser.save(err => {
                  if (err) {
                    res.status(400).send();
                  }
                  else {
                    req.id = newUser.id;
                    req.name = newUser.name;
                    req.about = newUser.about;
                    req.email = account.email;
                    req.login = account.username;
                    next()
                  }
                })
              });
            });
          }
        })
      }
    });
  }, generateAccessToken, respondWithData);

  // '/bicoditapi/account/login'
  api.post('/login', (req, res, next) => {
		UserDataExt.findUserByLogin(req.body.login, (err, user) => {
      if (err) {
        res.status(400).send();
      } else if (user == null) {
        res.status(404).send();
      } else {
        req.id = user.id;
        req.avatar = user.avatar;
        req.name = user.name;
        req.about = user.about;
        req.email = user.email;
        req.login = user.username;
        next()
			}
    });
  }, passport.authenticate('local', { session: false, scope: [], failWithError: true }), (err, req, res, next) => {
    if (err) {
      res.status(403).send();
    }
  }, generateAccessToken, respondWithData);

  // '/bicoditapi/account/logout'
  api.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).send('Successfully logged out');
  });

  // '/bicoditapi/account/me'
  api.get('/me', (req, res, next) => {
    UserDataExt.findUserByToken(req.headers.token, (err, user) => {
      if (err) {
        res.status(400).send();
      } else if (user == null) {
        res.status(404).send();
      } else {
        req.id = user.id;
        req.avatar = user.avatar;
        req.name = user.name;
        req.about = user.about;
        req.email = user.email;
        req.login = user.username;
        next()
      }
    })
  }, respondWithData);

  return api;
}
