"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _multer = _interopRequireDefault(require("multer"));

var _fs = _interopRequireDefault(require("fs"));

var _sharp = _interopRequireDefault(require("sharp"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _path = _interopRequireDefault(require("path"));

var _express = require("express");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _user = _interopRequireDefault(require("../models/user"));

var _auth_middleware = require("../middleware/auth_middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var upload = (0, _multer["default"])({
  dest: _path["default"].join(__dirname, "./temporary/avatars/")
});

var _default = function _default(_ref) {
  var config = _ref.config,
      db = _ref.db;
  var api = (0, _express.Router)();
  api.get('/test', function (req, res) {
    res.sendfile('index.html');
  }); // '/bicoditapi/user/' - Read

  api.get('/', _auth_middleware.authenticate, function (req, res) {
    _user["default"].find({}, function (err, users) {
      if (err) {
        res.status(500).json({
          message: err
        });
      }

      res.status(200).json(users);
    });
  }); //'/bicoditapi/upload/avatar' - Upload avatar

  api.post('/upload/avatar', upload.single("avatar"), _auth_middleware.authenticate, function (req, res) {
    var tempPath = req.file.path;

    var extname = _path["default"].extname(req.file.originalname).toLowerCase();

    var targetPath;

    var targetFolder = _path["default"].join(__dirname.slice(0, __dirname.indexOf("/dist")), "res/uploads/".concat(req.user.id));

    if (extname === ".png" || extname === ".jpg") {
      if (!_fs["default"].existsSync(targetFolder)) {
        (0, _mkdirp["default"])(targetFolder, function (err) {
          if (err) return res.status(500).json({
            message: "Failed to upload the image"
          });
        });
      }

      targetPath = "".concat(targetFolder, "/rawavatar").concat(extname);
      var resultPath = "".concat(targetFolder, "/avatar.jpg");

      _fs["default"].rename(tempPath, targetPath, function (err) {
        if (err) return res.status(500).json({
          message: "Failed to upload the image"
        });

        _sharp["default"].cache(false);

        (0, _sharp["default"])(targetPath).resize(1000).jpeg({
          quality: 80
        }).toBuffer(function (err, buffer) {
          if (err) {
            return res.status(500).json({
              message: "Failed to upload the image"
            });
          }

          _fs["default"].writeFile(resultPath, buffer, function (e) {
            if (e) {
              return res.status(500).json({
                message: "Failed to upload the image"
              });
            }

            _fs["default"].unlink(targetPath, function (err) {
              if (err) return res.status(500).json({
                message: "Failed to upload the image"
              });
              res.status(200).json({
                message: "Avatar successfully uploaded"
              });
            });
          });
        });
      });
    } else {
      _fs["default"].unlink(tempPath, function (err) {
        if (err) return res.status(500).json({
          message: "Failed to upload the image"
        });
        res.status(403).json({
          message: "Image format is not allowed"
        });
      });
    }
  }); //'/bicoditapi/avatar/:id' - Get avatar by user id

  api.get('/avatar/:id', _auth_middleware.authenticate, function (req, res) {
    _user["default"].findById(req.params.id, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: err
        });
      } else if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      } else {
        var targetFolder = _path["default"].join(__dirname.slice(0, __dirname.indexOf("/dist")), "res/uploads/".concat(user.id));

        var defaultFolder = _path["default"].join(__dirname.slice(0, __dirname.indexOf("/dist")), "res/default");

        _fs["default"].readFile("".concat(targetFolder, "/avatar.jpg"), function (err, userAvatar) {
          if (err) {
            _fs["default"].readFile("".concat(defaultFolder, "/avatar.jpg"), function (err, defaultAvatar) {
              if (err) {
                res.status(500).json({
                  message: "Could not get default avatar"
                });
              }

              res.status(200).end(defaultAvatar);
            });
          }

          res.status(200).end(userAvatar);
        });
      }
    });
  }); // '/bicoditapi/user/:id' - Update

  api.put('/:id', _auth_middleware.authenticate, function (req, res) {
    _user["default"].findById(req.params.id, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: err
        });
      } else if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      } else if (req.user.id == user.account) {
        user.name = req.body.name;
        user.about = req.body.about;
        user.save(function (err) {
          if (err) {
            res.status(500).json({
              message: err
            });
          }

          res.status(200).json({
            message: 'User info updated'
          });
        });
      } else {
        res.status(406).json({
          message: 'You provided invalid id for profile changes, please try again'
        });
      }
    });
  }); // 'bicoditapi/user/byaccount' - Get user by account id

  api.get('/byaccount', _auth_middleware.authenticate, function (req, res) {
    _user["default"].findOne({
      'account': req.headers.id
    }).populate('account').exec(function (err, userData) {
      if (err) {
        return res.status(500).json({
          message: err
        });
      } else if (!userData) {
        return res.status(404).json({
          message: "User not found"
        });
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
};

exports["default"] = _default;
//# sourceMappingURL=user.js.map