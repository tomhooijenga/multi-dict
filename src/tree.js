import access from '@teamawesome/access';

const LEAF = Symbol('leaf key');

export default class Tree {
  constructor(options) {
    this.options = {
      defaultType: Map,
      types: [],
      ...options,
    };
    this.root = this.createNode(0);
  }

  /**
   * @param {Array} keys
   * @param {boolean} value - True to return the value at this level, false for the node.
   * @return {*|undefined}
   */
  get(keys, value = true) {
    let node = this.root;

    for (const key of keys) {
      node = access.get(node, key);

      if (node === undefined) {
        return undefined;
      }
    }

    return value ? access.get(node, LEAF) : node;
  }

  set(keys, value) {
    let node = this.root;

    for (const [index, key] of keys.entries()) {
      if (!access.has(node, key)) {
        access.set(node, key, this.createNode(index + 1));
      }

      node = access.get(node, key);
    }

    access.set(node, LEAF, value);
  }

  has(keys) {
    const node = this.get(keys, false);

    if (node === undefined) {
      return false;
    }

    return access.has(node, LEAF);
  }

  delete(keys) {
    const node = this.get(keys, false);

    if (node === undefined) {
      return false;
    }

    return access.delete(node, LEAF);
  }

  clear() {
    access.clear(this.root);
  }

  level(keys) {
    const node = this.get(keys, false);
    const entries = [];
    const walker = (level) => {
      for (const [key, value] of access.entries(level)) {
        if (key === LEAF) {
          entries.push(value);
        } else {
          walker(access.get(level, key));
        }
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
  createNode(depth = 0) {
    const { types, defaultType } = this.options;
    const Type = types[depth] || defaultType;

    return new Type();
  }
}
