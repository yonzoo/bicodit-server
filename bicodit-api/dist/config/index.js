"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  // "port": process.env.PORT,
  "port": 5000,
  "mongoUrl": "mongodb+srv://bicodit-api:yDVQfdF3VN68rrzV@bicoditdemocluster-6apea.mongodb.net/test?retryWrites=true&w=majority",
  "bodyLimit": "100kb"
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map