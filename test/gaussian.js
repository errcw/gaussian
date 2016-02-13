// Tests based on values from Wolfram Alpha.

var gaussian = require('../lib/gaussian');

// Allow for some error.
var assert = require('nodeunit').assert;
assert.epsilonEqual = function(actual, expected) {
  var diff = Math.abs(actual - expected);
  assert.ok(diff < 1e-5, actual + ' - ' + expected + ' is ' + diff);
};
assert.gaussianEqual = function(actual, expected) {
  assert.equal(actual.mean, expected.mean);
  assert.equal(actual.variance, expected.variance);
  assert.epsilonEqual(actual.standardDeviation, Math.sqrt(expected.variance));
}

module.exports = {
  'test properties': function(test) {
    var d1 = gaussian(0, 1);
    test.equal(d1.mean, 0);
    test.equal(d1.variance, 1);
    test.equal(d1.standardDeviation, 1);

    var d2 = gaussian(1, 4);
    test.equal(d2.mean, 1);
    test.equal(d2.variance, 4);
    test.equal(d2.standardDeviation, 2);

    test.done();
  },

  'test pdf': function(test) {
    var d = gaussian(0, 1);
    test.epsilonEqual(d.pdf(-2), 0.053991);
    test.epsilonEqual(d.pdf(-1), 0.241971);
    test.epsilonEqual(d.pdf(0), 0.398942);
    test.epsilonEqual(d.pdf(1), 0.241971);
    test.epsilonEqual(d.pdf(2), 0.053991);
    test.done();
  },

  'test cdf': function(test) {
    var d = gaussian(0, 1);
    test.epsilonEqual(d.cdf(-1.28155), 0.1);
    test.epsilonEqual(d.cdf(-0.67449), 0.25);
    test.epsilonEqual(d.cdf(0), 0.5);
    test.epsilonEqual(d.cdf(0.67449), 0.75);
    test.epsilonEqual(d.cdf(1.28155), 0.9);
    test.done();
  },

  'test ppf': function(test) {
    var d = gaussian(0, 1);
    test.epsilonEqual(d.ppf(0.1), -1.28155);
    test.epsilonEqual(d.ppf(0.25), -0.67449);
    test.epsilonEqual(d.ppf(0.5), 0);
    test.epsilonEqual(d.ppf(0.75), 0.67449);
    test.epsilonEqual(d.ppf(0.9), 1.28155);
    test.done();
  },

  'test mul': function(test) {
    // Test normal mul.
    var d = gaussian(0, 1).mul(gaussian(0, 1));
    test.gaussianEqual(d, gaussian(0, 0.5));
    // Test scale.
    test.gaussianEqual(gaussian(1, 1).mul(2), gaussian(2, 4));
    test.done();
  },

  'test div': function(test) {
    // Test normal div.
    var d = gaussian(1, 1).div(gaussian(1, 2));
    test.gaussianEqual(d, gaussian(1, 2));
    // Test scale.
    test.gaussianEqual(gaussian(1, 1).div(1 / 2), gaussian(2, 4));
    test.done();
  },

  'test rejects non-positive variances': function(test) {
    test.throws(function() { gaussian(0, 0) }, Error);
    test.throws(function() { gaussian(0, -1) }, Error);
    test.done();
  },

  'test add': function(test) {
    test.gaussianEqual(gaussian(1, 1).add(gaussian(1, 2)), gaussian(2, 3));
    test.done();
  },

  'test sub': function(test) {
    test.gaussianEqual(gaussian(1, 1).sub(gaussian(1, 2)), gaussian(0, 3));
    test.done();
  },

  'test scale': function(test) {
    test.gaussianEqual(gaussian(1, 1).scale(2), gaussian(2, 4));
    test.done();
  }
};
