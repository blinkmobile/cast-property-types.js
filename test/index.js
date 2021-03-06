'use strict';

// foreign modules

var test = require('tape');

// local modules

var castPropertyTypes = require('..');

// this module

require('tape-chai');

test('castPropertyTypes', function (t) {

  t.test('is a function', function (tt) {
    tt.isFunction(castPropertyTypes);
    tt.end();
  });

  t.test('throws an error for bad parameters', function (tt) {
    tt['throws'](function () {
      castPropertyTypes(null, null);
    }, Error);
    tt['throws'](function () {
      castPropertyTypes({}, null);
    }, Error);
    tt['throws'](function () {
      castPropertyTypes(null, {});
    }, Error);
    tt.end();
  });

  t.end();
});

test('casting values', function (t) {
  var fixture;
  var example;
  var values;
  var result;

  fixture = {
    b: true,
    b2b: true,
    b2n: true,
    b2s: true,
    n: 123,
    n2b: 123,
    n2n: 123,
    n2s: 123,
    s: 'abc',
    s2b: 'true',
    s2n: '123',
    s2s: 'abc',
    o: {},
    a: []
  };
  example = {
    missing: true,
    b2b: false,
    b2n: 0,
    b2s: '',
    n2b: false,
    n2n: 0,
    n2s: '',
    s2b: false,
    s2n: 0,
    s2s: '',
    o: {},
    a: []
  };
  values = {
    b2n: 1,
    b2s: 'true',
    n2b: true,
    n2s: '123',
    s2b: true,
    s2n: 123,
    // expect these to be the originals
    b: fixture.b,
    b2b: fixture.b2b,
    n: fixture.n,
    n2n: fixture.n2n,
    s: fixture.s,
    s2s: fixture.s2s,
    o: fixture.o,
    a: fixture.a
  };
  result = castPropertyTypes(fixture, example);

  t.test('input and output share same number of properties', function (tt) {
    tt.lengthOf(Object.keys(result), Object.keys(fixture).length);
    tt.end();
  });

  t.test('input and output have same set of keys', function (tt) {
    tt.sameMembers(Object.keys(fixture), Object.keys(result));
    tt.end();
  });

  t.test('results have expected types', function (tt) {
    var prop;
    var value;
    for (prop in values) {
      if (values.hasOwnProperty(prop)) {
        tt.property(result, prop, '[' + prop + ']');
        value = values[prop];
        switch (typeof value) {
          case 'boolean':
            tt.isBoolean(result[prop]);
            break;
          case 'number':
            tt.isNumber(result[prop]);
            break;
          case 'string':
            tt.isString(result[prop]);
            break;
          default:
            tt.equal(
              result[prop],
              fixture[prop],
              '[' + prop + '] unchanged due to non-primitive type');
        }
        if (!Array.isArray(value) || typeof value !== 'object') {
          tt.equal(result[prop], value, '[' + prop + ']');
        }
      }
    }
    tt.end();
  });

  t.end();
});
