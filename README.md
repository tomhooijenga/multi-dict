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
* `get` Get a value by it's path
* `set` Set a value by a path of keys
* `has` Check if a path of keys exists
* `delete` Delete a path of keys
* `clear` Remove all entries in the dict
* `forEach` Run a callback for each entry of the dict
```
dict.set(key1, key2, value);
dict.get(key1, key2); // => value
```
It's possible to get/set/delete a sub-level of the dictionary by omitting the last key(s) from a path.

## Iterable methods:
* `keys` Get an iterable yielding all the paths of the dict 
* `values` Get an iterable yielding all the values of the dict
* `entries` Get an iterable yielding all the paths and values of the dict
* `Symbol.iterator` Get an iterable yielding all the paths and values of the dict
```
for (const key of dict.keys())

for (const [key, value] of dict)
```
## Properties
* `size` The amount of entries in the dictionary

