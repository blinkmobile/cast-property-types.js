(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.castPropertyTypes = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var SKIP_TYPES = ['array', 'function', 'object'];

var FALSE_VALUES = [ 0, '0', '', 'false', null, undefined ];

var CAST = {
  'boolean': function toBoolean (value) {
    if (FALSE_VALUES.indexOf(value) !== -1) {
      return false;
    }
    return true;
  },
  'number': function toNumber (value) {
    var output;
    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }
    output = parseFloat(value);
    // it's safe to use isNaN() on actual Number values
    return isNaN(output) ? 0 : output;
  },
  'string': function toString (value) {
    if (value && typeof value === 'object' && value.toString) {
      return value.toString();
    }
    return '' + value;
  }
};

/**
* @param {Object} input key-value pairs to cast
* @param {Object} example key-value pairs where values are of desired types
* @returns {Object} a new Object with same properties as input but with cast values
*/
function castPropertyTypes (input, example) {
  var output;
  if (!input || typeof input !== 'object') {
    throw new TypeError('1st argument must be an Object');
  }
  if (!example || typeof example !== 'object') {
    throw new TypeError('1st argument must be an Object');
  }
  output = {};
  Object.keys(input).forEach(function (prop) {
    var type;
    if (!input.hasOwnProperty(prop)) {
      return; // no property to cast
    }
    if (!example.hasOwnProperty(prop)) {
      output[prop] = input[prop];
      return; // no example from which to derive type
    }
    type = typeof example[prop];
    if (SKIP_TYPES.indexOf(type) !== -1 || typeof input[prop] === type) {
      output[prop] = input[prop];
      return; // nothing further to do for these types
    }
    output[prop] = CAST[type](input[prop]);
  });
  return output;
}

module.exports = castPropertyTypes;

},{}]},{},[1])(1)
});