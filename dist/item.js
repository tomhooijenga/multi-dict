"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var Item = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(
/**
   * @param {*[]} keys
   * @param {*} value
   */
function Item(keys, value) {
  (0, _classCallCheck2["default"])(this, Item);
  /**
    * @type {*[]}
    */
  this.keys = keys;
  /**
    * @type {*}
    */
  this.value = value;
});