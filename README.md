# Installation
```
npm install @teamawesome/multi-dict
```
# Usage
The aim of multi-dict is to behave just like a set of nested maps, but with an easy to use api. 
```
import MultiDict from '@teamawesome/multi-dict'

const dict = new MultiDict();
```

## Parameters
* `entries` Optional. An iterable whose elements are in the shape of `[key1, ..., value]`. Each element is added to 
the dict.
* `options` Optional. A hash of options as specified in the options paragraph.
```
new Dict([ /* Entries */ ], { /* Options */ });
new Dict([ /* Entries */ ]);
```
## Options
By default, for each level of the dict a Map is used. However, you can specify a type for each level and/or a 
default type.
* `defaultType` The type for each level that is not specified in `types`. Default is Map.
* `types` Array of types, for each depth that should be specified.
```
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
* `forEach(callback, thisArg)` Run a callback for each entry of the dict
```
dict.set(key1, key2, value);
dict.get(key1, key2); // => value
```
```
dict.set(key1, key2, key3, value);
dict.get(key1, key2, key3); // => value
dict.has(key1, key2, key3); // => true

// Only values that have been set before can be retrieved.
dict.has(key1, key2); // false!
dict.get(key1, key2); // => undefined!
```

## Iterable methods:
* `keys` Get an iterable yielding all the paths of the dict 
* `values` Get an iterable yielding all the values of the dict
* `entries` Get an iterable yielding all the paths and values of the dict
* `Symbol.iterator` Get an iterable yielding all the paths and values of the dict
```
for (const keys of dict.keys())
for (const value of dict.values())
for (const [keys, value] of dict.values())
for (const [keys, value] of dict)
```

## Properties
* `size` The amount of entries in the dictionary

