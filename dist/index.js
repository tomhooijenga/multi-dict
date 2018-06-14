"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toStringTag = _interopRequireDefault(require("@babel/runtime/core-js/symbol/to-string-tag"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime/core-js/get-iterator"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _iterator5 = _interopRequireDefault(require("@babel/runtime/core-js/symbol/iterator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime/core-js/object/entries"));

var _weakSet = _interopRequireDefault(require("@babel/runtime/core-js/weak-set"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _map = _interopRequireDefault(require("@babel/runtime/core-js/map"));

var _access = _interopRequireDefault(require("@teamawesome/access"));

var _entry = _interopRequireDefault(require("./entry"));

var defaultOptions = {
  defaultType: _map.default,
  types: []
};

var _default =
/*#__PURE__*/
function () {
  /**
   * @param {object} options
   * @param {Function} options.defaultType Constructor for the default type
   * @param {Function[]} options.types Array of constructors
   */
  function _default() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, _default);
    this.options = (0, _objectSpread2.default)({}, defaultOptions, options);
    var _this$options = this.options,
        types = _this$options.types,
        defaultType = _this$options.defaultType;
    var rootType = types.shift() || defaultType;
    /**
     * @type {*}
     * @private
     */

    this._root = new rootType();
    /**
     * @type {WeakSet<Object>}
     * @private
     */

    this._entries = new _weakSet.default();
  }
  /**
   * @param {...*} keys
   * @param {*} value
   */


  (0, _createClass2.default)(_default, [{
    key: "set",
    value: function set() {
      var _this$options2 = this.options,
          types = _this$options2.types,
          defaultType = _this$options2.defaultType;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var value = args.pop();
      var lastKey = args.pop();
      var level = this._root;
      var nextLevel;

      var _arr = (0, _entries.default)(args);

      for (var _i = 0; _i < _arr.length; _i++) {
        var _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2),
            index = _arr$_i[0],
            key = _arr$_i[1];

        nextLevel = _access.default.get(level, key);

        if (nextLevel === undefined) {
          var levelType = types[index] || defaultType;
          nextLevel = new levelType();

          _access.default.set(level, key, nextLevel);
        }

        level = nextLevel;
      }

      var prevValue = _access.default.get(level, lastKey);

      if (prevValue instanceof _entry.default) {
        prevValue.value = value;
      } else {
        var entry = new _entry.default(args, value);

        _access.default.set(level, lastKey, entry);

        this._entries.add(entry);
      }
    }
    /**
     * @param {...*} keys
     * @return {*}
     */

  }, {
    key: "get",
    value: function get() {
      var level = this._root;

      for (var _len2 = arguments.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      for (var _i2 = 0; _i2 < keys.length; _i2++) {
        var key = keys[_i2];

        if (!_access.default.has(level, key)) {
          return undefined;
        }

        level = _access.default.get(level, key);
      }

      if (level instanceof _entry.default) {
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
      var level = this._root;

      for (var _len3 = arguments.length, keys = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        keys[_key3] = arguments[_key3];
      }

      for (var _i3 = 0; _i3 < keys.length; _i3++) {
        var key = keys[_i3];

        if (!_access.default.has(level, key)) {
          return false;
        }

        level = _access.default.get(level, key);
      }

      return true;
    }
    /**
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

      var lastValue = _access.default.get(leaf, lastKey);

      if (lastValue instanceof _entry.default) {
        this._entries.delete(lastValue);
      }

      return _access.default.delete(leaf, lastKey);
    }
    /**
     *
     */

  }, {
    key: "clear",
    value: function clear() {
      _access.default.clear(this._root);
    }
    /**
     * @generator
     * @yield {[*, *]}
     */

  }, {
    key: _iterator5.default,
    value:
    /*#__PURE__*/
    _regenerator.default.mark(function value() {
      return _regenerator.default.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.entries(), "t0", 1);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
    /**
     * @generator
     * @yield {[*, *]}
     */

  }, {
    key: "entries",
    value:
    /*#__PURE__*/
    _regenerator.default.mark(function entries() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry;

      return _regenerator.default.wrap(function entries$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 3;
              _iterator = (0, _getIterator2.default)(this._entries);

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 12;
                break;
              }

              entry = _step.value;
              _context2.next = 9;
              return [entry.keys, entry.value];

            case 9:
              _iteratorNormalCompletion = true;
              _context2.next = 5;
              break;

            case 12:
              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 18:
              _context2.prev = 18;
              _context2.prev = 19;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 21:
              _context2.prev = 21;

              if (!_didIteratorError) {
                _context2.next = 24;
                break;
              }

              throw _iteratorError;

            case 24:
              return _context2.finish(21);

            case 25:
              return _context2.finish(18);

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, entries, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    })
    /**
     * @generator
     * @yield {*}
     */

  }, {
    key: "keys",
    value:
    /*#__PURE__*/
    _regenerator.default.mark(function keys() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, entry;

      return _regenerator.default.wrap(function keys$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context3.prev = 3;
              _iterator2 = (0, _getIterator2.default)(this._entries);

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context3.next = 12;
                break;
              }

              entry = _step2.value;
              _context3.next = 9;
              return entry.keys;

            case 9:
              _iteratorNormalCompletion2 = true;
              _context3.next = 5;
              break;

            case 12:
              _context3.next = 18;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context3.t0;

            case 18:
              _context3.prev = 18;
              _context3.prev = 19;

              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }

            case 21:
              _context3.prev = 21;

              if (!_didIteratorError2) {
                _context3.next = 24;
                break;
              }

              throw _iteratorError2;

            case 24:
              return _context3.finish(21);

            case 25:
              return _context3.finish(18);

            case 26:
            case "end":
              return _context3.stop();
          }
        }
      }, keys, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    })
    /**
     * @generator
     * @yield {*}
     */

  }, {
    key: "values",
    value:
    /*#__PURE__*/
    _regenerator.default.mark(function values() {
      var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, entry;

      return _regenerator.default.wrap(function values$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context4.prev = 3;
              _iterator3 = (0, _getIterator2.default)(this._entries);

            case 5:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context4.next = 12;
                break;
              }

              entry = _step3.value;
              _context4.next = 9;
              return entry.value;

            case 9:
              _iteratorNormalCompletion3 = true;
              _context4.next = 5;
              break;

            case 12:
              _context4.next = 18;
              break;

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](3);
              _didIteratorError3 = true;
              _iteratorError3 = _context4.t0;

            case 18:
              _context4.prev = 18;
              _context4.prev = 19;

              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }

            case 21:
              _context4.prev = 21;

              if (!_didIteratorError3) {
                _context4.next = 24;
                break;
              }

              throw _iteratorError3;

            case 24:
              return _context4.finish(21);

            case 25:
              return _context4.finish(18);

            case 26:
            case "end":
              return _context4.stop();
          }
        }
      }, values, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    })
    /**
     * @param {function(*, *[], this):undefined} callback
     * @param thisArg
     */

  }, {
    key: "forEach",
    value: function forEach(callback) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator2.default)(this), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var entry = _step4.value;
          callback.call(thisArg, entry.value, entry.key, this);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
    /**
     * @return {string}
     */

  }, {
    key: _toStringTag.default,
    value: function value() {
      return '[object MultiDict]';
    }
  }, {
    key: "size",
    get: function get() {
      return this._entries.size;
    }
  }]);
  return _default;
}();

exports.default = _default;