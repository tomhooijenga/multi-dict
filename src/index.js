import Item from './item';
import Tree from './tree';

export default class MultiDict {
  /**
   * @param {Iterable|object} entries Iterable of [...keys, value] entries.
   * @param {Object} options
   * @param {Function} options.defaultType
   * @param {Function[]} options.types
   */
  constructor(entries = [], options = {}) {
    /**
     * @type {Tree}
     * @private
     */
    this.tree = new Tree(options);

    /**
     * @type {Set<Item>}
     * @private
     */
    this.items = new Set();

    for (const entry of entries) {
      this.set(...entry);
    }
  }

  /**
   * @return {number}
   */
  get size() {
    return this.items.size;
  }

  /**
   * @return {string}
   */
  // eslint-disable-next-line class-methods-use-this
  get [Symbol.toStringTag]() {
    return 'MultiDict';
  }

  /**
   * Set a value.
   *
   * @param {...*} keys
   * @param {*} value
   * @return {MultiDict}
   */
  set(...keys) {
    const value = keys.pop();

    const oldItem = this.tree.get(keys);

    // Overwrite item
    if (oldItem) {
      oldItem.value = value;
    } else {
      const newItem = new Item(keys, value);
      this.tree.set(keys, newItem);
      this.items.add(newItem);
    }

    return this;
  }

  /**
   * Get an entry or undefined if it wasn't added.
   *
   * @param {...*} keys
   * @return {*|undefined}
   */
  get(...keys) {
    const item = this.tree.get(keys);

    if (item === undefined) {
      return undefined;
    }

    return item.value;
  }

  /**
   * Check if an entry exists. Always false for partial key paths.
   *
   * @param {...*} keys
   * @return {boolean}
   */
  has(...keys) {
    return this.tree.has(keys);
  }

  /**
   * Delete an entry.
   *
   * @param {...*} keys
   * @return {boolean}
   */
  delete(...keys) {
    const item = this.tree.get(keys);

    if (item === undefined) {
      return false;
    }

    this.items.delete(item);
    return this.tree.delete(keys);
  }

  /**
   * Remove all entries
   */
  clear() {
    this.items.clear();
    this.tree.clear();
  }

  /**
   * Create a new dictionary from the given level.
   *
   * @param {...*} keys
   * @returns {MultiDict}
   */
  level(...keys) {
    if (this.tree.get(keys, false) === undefined) {
      throw new Error('Cannot create dictionary from non-existing level.');
    }

    const { defaultType, types } = this.tree.options;
    const dict = new MultiDict([], {
      defaultType,
      types: types.slice(keys.length),
    });

    const indexedItems = new Map(
      [...this.items].map((item, index) => [item, index]),
    );
    this.tree.level(keys)
      .sort((a, b) => indexedItems.get(a) - indexedItems.get(b))
      .forEach((item) => {
        dict.set(...item.keys.slice(keys.length), item.value);
      });

    return dict;
  }

  /**
   * Get an iterator for each of the entries.
   *
   * @generator
   * @yield {[*[], *]}
   */
  * [Symbol.iterator]() {
    for (const entry of this.items) {
      yield [entry.keys, entry.value];
    }
  }

  /**
   * Get an iterator for each of the entries.
   *
   * @generator
   * @yield {[*[], *]}
   */
  * entries() {
    for (const entry of this.items) {
      yield [entry.keys, entry.value];
    }
  }

  /**
   * Get an iterator for each of the keys.
   *
   * @generator
   * @yield {*[]}
   */
  * keys() {
    for (const entry of this.items) {
      yield entry.keys;
    }
  }

  /**
   * Get an iterator for each of the values.
   *
   * @generator
   * @yield {*}
   */
  * values() {
    for (const entry of this.items) {
      yield entry.value;
    }
  }

  /**
   * Call a callback for each of the registered entries.
   *
   * @param {function(*, *[], this):undefined} callback
   * @param {*} thisArg Optional 'this' context for the callback
   */
  forEach(callback, thisArg = undefined) {
    if (typeof callback !== 'function') {
      throw new TypeError(`${callback} is not a function`);
    }

    for (const [keys, value] of this) {
      callback.call(thisArg, value, keys, this);
    }
  }
}
