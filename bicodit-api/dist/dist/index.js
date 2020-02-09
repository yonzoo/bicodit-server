"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
} // import passport from 'passport';
// import socket from 'socket.io';
// import Message from './model/message';
// import Channel from './model/channel';


console.log("HELLO"); // import config from './config';
// import routes from './routes';
// let app = express();
// app.server = http.createServer(app);
// // let io = socket(app.server);
// //middleware
// //parse application/json
// app.use(bodyParser.json({
//   limit: config.bodyLimit
// }));
// app.use('/bicoditapi', routes);
// // Base URL test endpoint to see if API is running
// app.get('/', (req, res) => {
//   res.json({ message: 'Bicodit API is ALIVE!' })
// });
// app.server.listen(config.port);
// console.log(`Started on port ${app.server.address().port}`);

module.exports = {
  app: app
};
//# sourceMappingURL=index.js.map