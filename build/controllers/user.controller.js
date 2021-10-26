"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = exports.getUser = exports.createUser = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        username,
        email,
        password,
        name,
        last_name,
        birthday,
        status,
        gener,
        date_register,
        date_update,
        roles
      } = req.body;
      var rolesFound = yield _Role.default.find({
        name: {
          $in: roles
        }
      }); // creating a new User

      var user = new _User.default({
        username,
        email,
        password,
        name,
        last_name,
        birthday,
        status,
        gener,
        date_register,
        date_update,
        roles: rolesFound.map(role => role._id)
      }); // encrypting password

      user.password = yield _User.default.encryptPassword(user.password); // saving the new user

      var savedUser = yield user.save();
      return res.status(200).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles
      });
    } catch (error) {
      console.error(error);
    }
  });

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {});

  return function getUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var getUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {});

  return function getUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUser = getUser;