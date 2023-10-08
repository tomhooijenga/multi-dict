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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var LEAF = Symbol('leaf key');
var Tree = exports["default"] = /*#__PURE__*/function () {
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
  }, {
    key: "level",
    value: function level(keys) {
      var node = this.get(keys, false);
      var entries = [];
      var walker = function walker(level) {
        var _iterator3 = _createForOfIteratorHelper(_access["default"].entries(level)),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2),
              key = _step3$value[0],
              value = _step3$value[1];
            if (key === LEAF) {
              entries.push(value);
            } else {
              walker(_access["default"].get(level, key));
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      };
      walker(node, []);
      return entries;
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