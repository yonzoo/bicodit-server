import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import sharp from 'sharp';
import mkdirp from 'mkdirp';
import path from 'path';
import { Router } from 'express';
import bodyParser from 'body-parser';
import User from '../models/user';

import { authenticate } from '../middleware/auth_middleware';

const upload = multer({
  dest: path.join(__dirname, `./temporary/avatars/`)
});

export default ({ config, db }) => {
  let api = Router();

  api.get('/test', function(req, res) {
    res.sendfile('index.html');
  })

  // '/bicoditapi/user/' - Read
  api.get('/', authenticate, (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(users);
    });
  });
  
  //'/bicoditapi/upload/avatar' - Upload avatar
  api.post('/upload/avatar', upload.single("avatar"), authenticate, (req, res) => {
    const tempPath = req.file.path;
    const extname = path.extname(req.file.originalname).toLowerCase();
    let targetPath;
    const targetFolder = path.join(__dirname.slice(0, __dirname.indexOf("/dist")), `res/uploads/${req.user.id}`);
    if (extname === ".png" || extname === ".jpg") {
      if (!fs.existsSync(targetFolder)) {
        mkdirp(targetFolder, function (err) {
          if (err) return res.status(500).json({ message: "Failed to upload the image" });
      });
    }
      targetPath = `${targetFolder}/rawavatar${extname}`;
      const resultPath = `${targetFolder}/avatar.jpg`;
      fs.rename(tempPath, targetPath, err => {
        if (err) return res.status(500).json({ message: "Failed to upload the image" });
        sharp.cache(false);
        sharp(targetPath)
        .resize(1000)
        .jpeg({quality: 80})
        .toBuffer(function(err, buffer) {
          if (err) {
            return res.status(500).json({ message: "Failed to upload the image" });
          }
          fs.writeFile(resultPath, buffer, function(e) {
            if (e) {
              return res.status(500).json({ message: "Failed to upload the image" });
            }
            fs.unlink(targetPath, err => {
              if (err) return res.status(500).json({ message: "Failed to upload the image" });
              res.status(200).json({ message: "Avatar successfully uploaded" })
            });
          });
      });
      });
    }
    else {
      fs.unlink(tempPath, err => {
        if (err) return res.status(500).json({ message: "Failed to upload the image" });
        res.status(403).json({ message: "Image format is not allowed" })
      });
    }
  })

  //'/bicoditapi/avatar/:id' - Get avatar by user id
  api.get('/avatar/:id', authenticate, (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      else if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      else {
        const targetFolder = path.join(__dirname.slice(0, __dirname.indexOf("/dist")), `res/uploads/${user.id}`)
        const defaultFolder = path.join(__dirname.slice(0, __dirname.indexOf("/dist")), `res/default`)
        fs.readFile(`${targetFolder}/avatar.jpg`, (err, userAvatar) => {
          if (err) {
            fs.readFile(`${defaultFolder}/avatar.jpg`, (err, defaultAvatar) => {
              if (err) {
                res.status(500).json({ message: "Could not get default avatar" });
              }
              res.status(200).end(defaultAvatar);
            })
          }
          res.status(200).end(userAvatar);
        })
      }
    });
  })

  // '/bicoditapi/user/:id' - Update
  api.put('/:id', authenticate, (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      else if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      else if (req.user.id == user.account) {
        user.name = req.body.name;
        user.about = req.body.about;
        user.save(err => {
          if (err) {
            res.status(500).json({ message: err });
          }
          res.status(200).json({ message: 'User info updated' });
        });
      }
      else {
        res.status(406).json({ message: 'You provided invalid id for profile changes, please try again' })
      }
    });
  });

    // 'bicoditapi/user/byaccount' - Get user by account id
    api.get('/byaccount', authenticate, (req, res) => {
        User
          .findOne({ 'account': req.headers.id })
          .populate('account')
          .exec((err, userData) => {
            if (err) {
              return res.status(500).json({ message: err });
            }
            else if (!userData) {
              return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({
              userId: userData.id,
              login: userData.account.username,
              email: userData.account.email,
              name: userData.name,
              about: userData.about
          });
          });
      });

    return api;
}