"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _access = _interopRequireDefault(require("@teamawesome/access"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LEAF = Symbol('leaf key');

var Tree = /*#__PURE__*/function () {
  function Tree(options) {
    (0, _classCallCheck2["default"])(this, Tree);
    this.options = _objectSpread({
      defaultType: Map,
      types: []
    }, options);
    this.root = this.createNode(0);
  }
  /**
   * @param {Array} keys
   * @param {boolean} value - True to return the value at this level, false for the node.
   * @return {*|undefined}
   */


  (0, _createClass2["default"])(Tree, [{
    key: "get",
    value: function get(keys) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var node = this.root;

      var _iterator = _createForOfIteratorHelper(keys),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          node = _access["default"].get(node, key);

          if (node === undefined) {
            return undefined;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return value ? _access["default"].get(node, LEAF) : node;
    }
  }, {
    key: "set",
    value: function set(keys, value) {
      var node = this.root;

      var _iterator2 = _createForOfIteratorHelper(keys.entries()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
              index = _step2$value[0],
              key = _step2$value[1];

          if (!_access["default"].has(node, key)) {
            _access["default"].set(node, key, this.createNode(index + 1));
          }

          node = _access["default"].get(node, key);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      _access["default"].set(node, LEAF, value);
    }
  }, {
    key: "has",
    value: function has(keys) {
      var node = this.get(keys, false);

      if (node === undefined) {
        return false;
      }

      return _access["default"].has(node, LEAF);
    }
  }, {
    key: "delete",
    value: function _delete(keys) {
      var node = this.get(keys, false);

      if (node === undefined) {
        return false;
      }

      return _access["default"]["delete"](node, LEAF);
    }
  }, {
    key: "clear",
    value: function clear() {
      _access["default"].clear(this.root);
    }
    /**
     * Create a tree node.
     * @private
     * @param {number} depth
     * @returns {*}
     */

  }, {
    key: "createNode",
    value: function createNode() {
      var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var _this$options = this.options,
          types = _this$options.types,
          defaultType = _this$options.defaultType;
      var Type = types[depth] || defaultType;
      return new Type();
    }
  }]);
  return Tree;
}();

exports["default"] = Tree;