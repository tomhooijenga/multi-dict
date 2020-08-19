export default class Tree {
  constructor() {
    this.root = new Map();
  }

  get(keys) {
    let node = this.root;

    for (const key of keys) {
      node = node.get(key);

      if (node === undefined) {
        return undefined;
      }
    }

    return node.get(this);
  }

  set(keys, value) {
    let node = this.root;

    for (const key of keys) {
      if (!node.has(key)) {
        node.set(key, new Map());
      }

      node = node.get(key);
    }

    node.set(this, value);
  }

  has(keys) {
    let node = this.root;

    for (const key of keys) {
      node = node.get(key);

      if (node === undefined) {
        return false;
      }
    }

    return node.has(this);
  }

  delete(keys) {
    let node = this.root;

    for (const key of keys) {
      node = node.get(key);

      if (node === undefined) {
        return false;
      }
    }

    return node.delete(this);
  }
}
