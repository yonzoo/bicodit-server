import mongoose from 'mongoose';
import e, { Router } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Account from '../models/account';
import User from '../models/user';
import UserDataExt from './extensions/user_data_ext';

import { generateAccessToken, respond, authenticate } from '../middleware/auth_middleware';

export default ({ config, db }) => {
  let api = Router();

  api.get('/kek', (req, res) => {
    console.log("LOL")
  })

  // '/bicoditapi/account/register'
  api.post('/register', (req, res, next) => {
    UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
      if (err) {
        res.status(409).json({ message: `An error occured: ${err.message}`});
      } else if (userData) {
        res.status(300).json({ message: `Email ${req.body.email} is already registered`});
      } else {
        UserDataExt.findUserByLogin(req.body.login, (err, user) => {
          if (err) {
            res.status(409).json({ message: `An error occured: ${err.message}`});
          } else if (user) {
            res.status(300).json({ message: `Login ${req.body.login} is already registered`});
          } else {
            Account.register(new Account({ username: req.body.login, email: req.body.email }), req.body.password, function(err, account) {
              if (err) {
                res.status(500).json({ message: err });
              }
              passport.authenticate('local', { session: false })(req, res, () => {
                const newUser = new User({ account: req.user._id, name: "", about: "" })
                newUser.save(err => {
                  if (err) {
                    res.status(500).json({ message: err });
                  }
                  else {
                    next()
                  }
                })
              });
            });
          }
        })
      }
    });
  }, generateAccessToken, respond);

  // '/bicoditapi/account/login'
  api.post('/login', (req, res, next) => {
		UserDataExt.findUserByEmail(req.body.email, (err, user) => {
      if (err) {
        res.status(409).json({ message: `An error occured: ${err.message}`});
      } else {
        req.body.login = user.username
        next()
			}
    });
  }, passport.authenticate('local', { session: false, scope: [], failWithError: true }), (err, req, res, next) => {
    if (err) {
      res.status(401).json({ message: `Email or password invalid, please check your credentials`});
    }
  }, generateAccessToken, respond);

  // '/bicoditapi/account/logout'
  api.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).send('Successfully logged out');
  });

  api.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
  });

  return api;
}
