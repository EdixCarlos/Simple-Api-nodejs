"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductById = exports.getProducts = exports.getProductById = exports.deleteProductById = exports.createProduct = void 0;

var _Product = _interopRequireDefault(require("../models/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      name,
      category,
      price,
      imgURL
    } = req.body;

    try {
      var newProduct = new _Product.default({
        name,
        category,
        price,
        imgURL
      });
      var productSaved = yield newProduct.save();
      res.status(201).json(productSaved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function createProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createProduct = createProduct;

var getProductById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      productId
    } = req.params;
    var product = yield _Product.default.findById(productId);
    res.status(200).json(product);
  });

  return function getProductById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getProductById = getProductById;

var getProducts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var products = yield _Product.default.find();
    return res.json(products);
  });

  return function getProducts(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getProducts = getProducts;

var updateProductById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var updatedProduct = yield _Product.default.findByIdAndUpdate(req.params.productId, req.body, {
      new: true
    });
    res.status(204).json(updatedProduct);
  });

  return function updateProductById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateProductById = updateProductById;

var deleteProductById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var {
      productId
    } = req.params;
    yield _Product.default.findByIdAndDelete(productId); // code 200 is ok too

    res.status(204).json();
  });

  return function deleteProductById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteProductById = deleteProductById;