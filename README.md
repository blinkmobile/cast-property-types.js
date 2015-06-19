# cast-property-types.js

coerce properties within an Object to other types

[![npm module](https://img.shields.io/npm/v/@blinkmobile/cast-property-types.svg)](https://www.npmjs.com/package/@blinkmobile/cast-property-types)
[![travis-ci](https://img.shields.io/travis/blinkmobile/cast-property-types.js.svg)](https://travis-ci.org/blinkmobile/cast-property-types.js)


## What is this?

This is a utility function to take an Object that has properties with String
values, and cast those Strings to other type (e.g. Booleans and Numbers).


## API

### `castPropertyTypes()`

- @param {Object} input key-value pairs to cast
- @param {Object} example key-value pairs where values are of desired types
- @returns {Object} a new Object with same properties as input but with cast values

`castPropertyTypes()` will take the values from the first parameter, and cast
those values using the types found in the second parameter.

For example, `castPropertyTypes({ value: '123' }, { value: 0 })` will return:

```json
{
  "value": 123
}
```

We use the built-in `parseFloat()` method to cast values to a Number, so be
aware that values that are not numeric may have unexpected results.
