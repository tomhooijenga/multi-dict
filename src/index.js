import access from '@teamawesome/access';
import Entry from './entry';

const defaultOptions = {
    defaultType: Map,
    types: [],
};

export default class  {
    /**
     * @param {Iterable.<[*, *]>|object} entries Iterable of [...keys, value] entries, or the options object
     * @param {object} options
     * @param {Function} options.defaultType Constructor for the default type
     * @param {Function[]} options.types Array of constructors
     */
    constructor(entries = [], options = {}) {
        if (entries === null || entries === undefined) {
            entries = [];
        } else if (typeof entries[Symbol.iterator] !== 'function') {
            options = entries;
            entries = [];
        }

        this.options = {
            ...defaultOptions,
            ...options
        };
        const {types, defaultType} = this.options;

        const rootType = types.shift() || defaultType;
        /**
         * @type {*}
         * @private
         */
        this._root = new rootType();

        /**
         * @type {Set<Object>}
         * @private
         */
        this._entries = new Set();

        for (const entry of entries) {
            this.set(...entry);
        }
    }

    /**
     * @param {...*} keys
     * @param {*} value
     */
    set(...args) {
        if (args.length < 2) {
            throw new TypeError('Specify at least one key and a value');
        }

        const {types, defaultType} = this.options;
        const value = args.pop();
        const lastKey = args.pop();

        let level = this._root;
        let nextLevel;
        for (const [index, key] of Object.entries(args)) {
            nextLevel = access.get(level, key);

            if (nextLevel === undefined) {
                const levelType = types[index] || defaultType;
                nextLevel = new levelType();

                access.set(level, key, nextLevel);
            }

            level = nextLevel;
        }

        const prevValue = access.get(level, lastKey);

        if (prevValue instanceof Entry) {
            prevValue.value = value;
        } else {
            const entry = new Entry(args, value);
            access.set(level, lastKey, entry);
            this._entries.add(entry);
        }

        return this;
    }

    /**
     * @param {...*} keys
     * @return {*}
     */
    get(...keys) {
        let level = this._root;
        for (const key of keys) {
            if (!access.has(level, key)) {
                return undefined;
            }

            level = access.get(level, key);
        }

        if (level instanceof Entry) {
            return level.value;
        }

        return level;
    }

    /**
     * @param {...*} keys
     * @return {boolean}
     */
    has(...keys) {
        let level = this._root;
        for (const key of keys) {
            if (!access.has(level, key)) {
                return false;
            }

            level = access.get(level, key);
        }

        return true;
    }

    /**
     * Delete an entry
     *
     * @param {...*} keys
     * @return {boolean}
     */
    delete(...keys) {
        const lastKey = keys.pop();
        const leaf = this.get(keys);

        if (leaf === undefined) {
            return false;
        }

        const lastValue = access.get(leaf, lastKey);

        if (lastValue instanceof Entry) {
            this._entries.delete(lastValue);
        }

        return access.delete(leaf, lastKey);
    }

    /**
     * Remove all entries
     */
    clear() {
        this._entries.clear();
        access.clear(this._root);
    }

    /**
     * @generator
     * @yield {[*, *]}
     */
    *[Symbol.iterator]() {
        for (const entry of this._entries) {
            yield [entry.keys, entry.value];
        }
    }

    /**
     * @generator
     * @yield {[*, *]}
     */
    *entries() {
        for (const entry of this._entries) {
            yield [entry.keys, entry.value];
        }
    }

    /**
     * @generator
     * @yield {*}
     */
    *keys() {
        for (const entry of this._entries) {
            yield entry.keys;
        }
    }

    /**
     * @generator
     * @yield {*}
     */
    *values() {
        for (const entry of this._entries) {
            yield entry.value;
        }
    }

    /**
     * @param {function(*, *[], this):undefined} callback
     * @param {*} thisArg Option 'this' context for the callback
     */
    forEach(callback, thisArg = undefined) {
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        for(const entry of this) {
            callback.call(thisArg, entry.value, entry.key, this);
        }
    }

    /**
     * @return {string}
     */
    [Symbol.toStringTag]() {
        return '[object MultiDict]';
    }

    get size() {
        return this._entries.size;
    }
}