export default class Item {
  /**
     * @param {*[]} keys
     * @param {*} value
     */
  constructor(keys, value) {
    /**
      * @type {*[]}
      */
    this.keys = keys;
    /**
      * @type {*}
      */
    this.value = value;
  }
}
