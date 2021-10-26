"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.signUp = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      // Getting the Request Body
      var {
        username,
        email,
        password,
        roles
      } = req.body; // Creating a new User Object

      var newUser = new _User.default({
        username,
        email,
        password: yield _User.default.encryptPassword(password)
      }); // checking for roles

      if (req.body.roles) {
        var foundRoles = yield _Role.default.find({
          name: {
            $in: roles
          }
        });
        newUser.roles = foundRoles.map(role => role._id);
      } else {
        var role = yield _Role.default.findOne({
          name: "user"
        });
        newUser.roles = [role._id];
      } // Saving the User Object in Mongodb


      var savedUser = yield newUser.save(); // Create a token

      var token = _jsonwebtoken.default.sign({
        id: savedUser._id
      }, _config.default.SECRET, {
        expiresIn: 86400 // 24 hours

      });

      return res.status(200).json({
        token
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      // Request body email can be an email or username
      var userFound = yield _User.default.findOne({
        email: req.body.email
      }).populate("roles");
      if (!userFound) return res.status(400).json({
        message: "User Not Found"
      });
      var matchPassword = yield _User.default.comparePassword(req.body.password, userFound.password);
      if (!matchPassword) return res.status(401).json({
        token: null,
        message: "Invalid Password"
      });

      var token = _jsonwebtoken.default.sign({
        id: userFound._id
      }, _config.default.SECRET, {
        expiresIn: 86400 // 24 hours

      });

      res.json({
        token
      });
    } catch (error) {
      console.log(error);
    }
  });

  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;