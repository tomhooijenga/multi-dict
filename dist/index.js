"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _access = _interopRequireDefault(require("@teamawesome/access"));

var _item = _interopRequireDefault(require("./item"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultOptions = {
  defaultType: Map,
  types: []
};

var MultiDict = /*#__PURE__*/function () {
  /**
   * @param {Iterable.<[*, *]>|object} entries Iterable of [...keys, value]
   *                                           entries, or the options object
   * @param {object} options
   * @param {Function} options.defaultType Constructor for the default type
   * @param {Function[]} options.types Array of constructors
   */
  function MultiDict() {
    var entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, MultiDict);

    if (entries === null || entries === undefined) {
      entries = [];
    } else if (typeof entries[Symbol.iterator] !== 'function') {
      options = entries;
      entries = [];
    }

    this.options = _objectSpread(_objectSpread({}, defaultOptions), options);
    var _this$options = this.options,
        types = _this$options.types,
        defaultType = _this$options.defaultType;
    var Type = types.shift() || defaultType;
    /**
     * @type {*}
     * @private
     */

    this.root = new Type();
    /**
     * @type {Set<Object>}
     * @private
     */

    this.items = new Set();

    var _iterator = _createForOfIteratorHelper(entries),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var entry = _step.value;
        this.set.apply(this, (0, _toConsumableArray2["default"])(entry));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  /**
   * @return {number}
   */


  (0, _createClass2["default"])(MultiDict, [{
    key: "set",

    /**
     * @param {...*} keys
     * @param {*} value
     */
    value: function set() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length < 2) {
        throw new TypeError('Specify at least one key and a value');
      }

      var _this$options2 = this.options,
          types = _this$options2.types,
          defaultType = _this$options2.defaultType;
      var value = args.pop();
      var lastKey = args.pop();
      var level = this.root;
      var nextLevel;

      for (var _i = 0, _Object$entries = Object.entries(args); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
            index = _Object$entries$_i[0],
            key = _Object$entries$_i[1];

        nextLevel = _access["default"].get(level, key);

        if (nextLevel === undefined) {
          var Type = types[index] || defaultType;
          nextLevel = new Type();

          _access["default"].set(level, key, nextLevel);
        }

        level = nextLevel;
      }

      var prevValue = _access["default"].get(level, lastKey);

      if (prevValue instanceof _item["default"]) {
        prevValue.value = value;
      } else {
        var entry = new _item["default"](args, value);

        _access["default"].set(level, lastKey, entry);

        this.items.add(entry);
      }

      return this;
    }
    /**
     * @param {...*} keys
     * @return {*}
     */

  }, {
    key: "get",
    value: function get() {
      var level = this.root;

      for (var _len2 = arguments.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      for (var _i2 = 0, _keys = keys; _i2 < _keys.length; _i2++) {
        var key = _keys[_i2];
        level = _access["default"].get(level, key);

        if (level === undefined) {
          return undefined;
        }
      }

      if (level instanceof _item["default"]) {
        return level.value;
      }

      return level;
    }
    /**
     * @param {...*} keys
     * @return {boolean}
     */

  }, {
    key: "has",
    value: function has() {
      var level = this.root;

      for (var _len3 = arguments.length, keys = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        keys[_key3] = arguments[_key3];
      }

      for (var _i3 = 0, _keys2 = keys; _i3 < _keys2.length; _i3++) {
        var key = _keys2[_i3];

        if (!_access["default"].has(level, key)) {
          return false;
        }

        level = _access["default"].get(level, key);
      }

      return true;
    }
    /**
     * Delete an entry
     *
     * @param {...*} keys
     * @return {boolean}
     */

  }, {
    key: "delete",
    value: function _delete() {
      for (var _len4 = arguments.length, keys = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        keys[_key4] = arguments[_key4];
      }

      var lastKey = keys.pop();
      var leaf = this.get(keys);

      if (leaf === undefined) {
        return false;
      }

      var lastValue = _access["default"].get(leaf, lastKey);

      if (lastValue instanceof _item["default"]) {
        this.items["delete"](lastValue);
      }

      return _access["default"]["delete"](leaf, lastKey);
    }
    /**
     * Remove all entries
     */

  }, {
    key: "clear",
    value: function clear() {
      this.items.clear();

      _access["default"].clear(this.root);
    }
    /**
     * @generator
     * @yield {[*, *]}
     */

  }, {
    key: Symbol.iterator,
    value: /*#__PURE__*/_regenerator["default"].mark(function value() {
      var _iterator2, _step2, entry;

      return _regenerator["default"].wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator2 = _createForOfIteratorHelper(this.items);
              _context.prev = 1;

              _iterator2.s();

            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context.next = 9;
                break;
              }

              entry = _step2.value;
              _context.next = 7;
              return [entry.keys, entry.value];

            case 7:
              _context.next = 3;
              break;

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

              _iterator2.e(_context.t0);

            case 14:
              _context.prev = 14;

              _iterator2.f();

              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, value, this, [[1, 11, 14, 17]]);
    })
    /**
     * @generator
     * @yield {[*, *]}
     */

  }, {
    key: "entries",
    value: /*#__PURE__*/_regenerator["default"].mark(function entries() {
      var _iterator3, _step3, entry;

      return _regenerator["default"].wrap(function entries$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iterator3 = _createForOfIteratorHelper(this.items);
              _context2.prev = 1;

              _iterator3.s();

            case 3:
              if ((_step3 = _iterator3.n()).done) {
                _context2.next = 9;
                break;
              }

              entry = _step3.value;
              _context2.next = 7;
              return [entry.keys, entry.value];

            case 7:
              _context2.next = 3;
              break;

            case 9:
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);

              _iterator3.e(_context2.t0);

            case 14:
              _context2.prev = 14;

              _iterator3.f();

              return _context2.finish(14);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, entries, this, [[1, 11, 14, 17]]);
    })
    /**
     * @generator
     * @yield {*}
     */

  }, {
    key: "keys",
    value: /*#__PURE__*/_regenerator["default"].mark(function keys() {
      var _iterator4, _step4, entry;

      return _regenerator["default"].wrap(function keys$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _iterator4 = _createForOfIteratorHelper(this.items);
              _context3.prev = 1;

              _iterator4.s();

            case 3:
              if ((_step4 = _iterator4.n()).done) {
                _context3.next = 9;
                break;
              }

              entry = _step4.value;
              _context3.next = 7;
              return entry.keys;

            case 7:
              _context3.next = 3;
              break;

            case 9:
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);

              _iterator4.e(_context3.t0);

            case 14:
              _context3.prev = 14;

              _iterator4.f();

              return _context3.finish(14);

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, keys, this, [[1, 11, 14, 17]]);
    })
    /**
     * @generator
     * @yield {*}
     */

  }, {
    key: "values",
    value: /*#__PURE__*/_regenerator["default"].mark(function values() {
      var _iterator5, _step5, entry;

      return _regenerator["default"].wrap(function values$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _iterator5 = _createForOfIteratorHelper(this.items);
              _context4.prev = 1;

              _iterator5.s();

            case 3:
              if ((_step5 = _iterator5.n()).done) {
                _context4.next = 9;
                break;
              }

              entry = _step5.value;
              _context4.next = 7;
              return entry.value;

            case 7:
              _context4.next = 3;
              break;

            case 9:
              _context4.next = 14;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](1);

              _iterator5.e(_context4.t0);

            case 14:
              _context4.prev = 14;

              _iterator5.f();

              return _context4.finish(14);

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, values, this, [[1, 11, 14, 17]]);
    })
    /**
     * @param {function(*, *[], this):undefined} callback
     * @param {*} thisArg Option 'this' context for the callback
     */

  }, {
    key: "forEach",
    value: function forEach(callback) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (typeof callback !== 'function') {
        throw new TypeError("".concat(callback, " is not a function"));
      }

      var _iterator6 = _createForOfIteratorHelper(this),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var entry = _step6.value;
          callback.call(thisArg, entry.value, entry.key, this);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "size",
    get: function get() {
      return this.items.size;
    }
    /**
     * @return {string}
     */

  }, {
    key: Symbol.toStringTag,
    get: function get() {
      return 'MultiDict';
    }
  }]);
  return MultiDict;
}();

var _default = MultiDict;
exports["default"] = _default;