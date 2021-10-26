"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.nqkx7.mongodb.net/code_society?retryWrites=true&w=majority',
  PORT: process.env.PORT || 4000
};
exports.default = _default;