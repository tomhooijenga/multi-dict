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

  get(keys) {
    let node = this.root;

    for (const key of keys) {
      node = access.get(node, key);

      if (node === undefined) {
        return undefined;
      }
    }

    return access.get(node, LEAF);
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
    let node = this.root;

    for (const key of keys) {
      node = access.get(node, key);

      if (node === undefined) {
        return false;
      }
    }

    return access.has(node, LEAF);
  }

  delete(keys) {
    let node = this.root;

    for (const key of keys) {
      node = access.get(node, key);

      if (node === undefined) {
        return false;
      }
    }

    return access.delete(node, LEAF);
  }

  clear() {
    access.clear(this.root);
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
