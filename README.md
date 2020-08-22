# Installation
```shell script
npm install @teamawesome/multi-dict
```
# Usage
The aim of multi-dict is to behave just like a set of nested maps, but with an easy to use api. It supports
all the regular methods of `Map`, including the iterators.
```js
import Dictionary from '@teamawesome/multi-dict'

const dict = new Dictionary();
```

## Parameters
* `entries` Optional. An iterable whose elements are in the shape of `[key1, ..., value]`. Each element is added to 
the dict.
* `options` Optional. A hash of options as specified in the options paragraph.
```js
new Dictionary([ /* Entries */ ], { /* Options */ });
new Dictionary([ /* Entries */ ]);
```
## Options
By default, each level of the dict is a `Map`. However, you can specify a type for each level and/or a 
default type.
* `defaultType` The constructor for each level not specified in `types`. Default is `Map`.
* `types` Array of constructors, for each depth that should be specified.
```js
// Each level of the dict will be an array
new MultiDict({
  defaultType: Array
});

// The first level will be an Object, the second an Array.
// The third and deeper levels will be the default type.
new MultiDict({
  types: [Object, Array]
});
```

## Methods
* `get(...keys)` Get a value by its path
* `set(...keys, value)` Set a value by a path of keys
* `has(...keys)` Check if a path of keys exists
* `delete(...keys)` Delete a path of keys
* `clear()` Remove all entries in the dict
* `level(...keys)` Get a new Dictionary from the given level
* `forEach(callback, thisArg)` Run a callback for each entry of the dict
```js
dict.set(key1, key2, value);
dict.get(key1, key2); // => value
```
```js
dict.set(key1, key2, key3, value);
dict.get(key1, key2, key3); // => value
dict.has(key1, key2, key3); // => true

// Only values that have been set before can be retrieved.
dict.has(key1, key2); // false!
dict.get(key1, key2); // => undefined!
```
```js
dict = new Dictionary([
  ['a', 'b', 'value',]
  ['a', 'b', 'c1', 'value c1']
  ['a', 'b', 'c2', 'value c2']
]);

dict2 = dict.level('a', 'b');
[...dict2.entries()] // => [[[], 'value'], [['c1'], 'value c1'], [['c2'], 'value c2']]
```

## Iterable methods:
* `keys` Get an iterable yielding all the paths of the dict 
* `values` Get an iterable yielding all the values of the dict
* `entries` Get an iterable yielding all the paths and values of the dict
* `Symbol.iterator` Get an iterable yielding all the paths and values of the dict
```js
for (const keys of dict.keys())
for (const value of dict.values())
for (const [keys, value] of dict.values())
for (const [keys, value] of dict)
```

## Properties
* `size` The amount of entries in the dictionary

