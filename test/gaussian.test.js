// Tests based on values from Wolfram Alpha.
const gaussian = require('../lib/gaussian');

expect.extend({
  toEqualGaussian: (received, expected) => {
    expect(received.mean).toStrictEqual(expected.mean);
    expect(received.variance).toStrictEqual(expected.variance);
    expect(received.standardDeviation).toBeCloseTo(
      Math.sqrt(expected.variance)
    );
    return { pass: true };
  },
});

it('test properties', () => {
  expect.assertions(3);
  const d1 = gaussian(0, 1);
  expect(d1.mean).toBe(0);
  expect(d1.variance).toBe(1);
  expect(d1.standardDeviation).toBe(1);
});

it('test pdf', () => {
  expect.assertions(5);
  const d = gaussian(0, 1);
  expect(d.pdf(-2)).toBeCloseTo(0.053991);
  expect(d.pdf(-1)).toBeCloseTo(0.241971);
  expect(d.pdf(0)).toBeCloseTo(0.398942);
  expect(d.pdf(1)).toBeCloseTo(0.241971);
  expect(d.pdf(2)).toBeCloseTo(0.053991);
});

it('test cdf', () => {
  expect.assertions(5);
  const d = gaussian(0, 1);
  expect(d.cdf(-1.28155)).toBeCloseTo(0.1);
  expect(d.cdf(-0.67449)).toBeCloseTo(0.25);
  expect(d.cdf(0)).toBeCloseTo(0.5);
  expect(d.cdf(0.67449)).toBeCloseTo(0.75);
  expect(d.cdf(1.28155)).toBeCloseTo(0.9);
});

it('test ppf', () => {
  expect.assertions(5);
  const d = gaussian(0, 1);
  expect(d.ppf(0.1)).toBeCloseTo(-1.28155);
  expect(d.ppf(0.25)).toBeCloseTo(-0.67449);
  expect(d.ppf(0.5)).toBeCloseTo(0);
  expect(d.ppf(0.75)).toBeCloseTo(0.67449);
  expect(d.ppf(0.9)).toBeCloseTo(1.28155);
});

it('test mul', () => {
  expect.assertions(8);
  // Test normal mul.
  const d = gaussian(0, 1).mul(gaussian(0, 1));
  expect(d).toEqualGaussian(gaussian(0, 0.5));
  // Test scale.
  expect(gaussian(1, 1).mul(2)).toEqualGaussian(gaussian(2, 4));
});

it('test div', () => {
  expect.assertions(8);
  // Test normal div.
  const d = gaussian(1, 1).div(gaussian(1, 2));
  expect(d).toEqualGaussian(gaussian(1, 2));
  // Test scale.
  expect(gaussian(1, 1).div(1 / 2)).toEqualGaussian(gaussian(2, 4));
});

it('test rejects non-positive variances', () => {
  expect.assertions(2);
  expect(() => {
    gaussian(0, 0);
  }).toThrow(Error);
  expect(() => {
    gaussian(0, -1);
  }).toThrow(Error);
});

it('test add', () => {
  expect.assertions(4);
  expect(gaussian(1, 1).add(gaussian(1, 2))).toEqualGaussian(gaussian(2, 3));
});

it('test sub', () => {
  expect.assertions(4);
  expect(gaussian(1, 1).sub(gaussian(1, 2))).toEqualGaussian(gaussian(0, 3));
});

it('test scale', () => {
  expect.assertions(4);
  expect(gaussian(1, 1).scale(2)).toEqualGaussian(gaussian(2, 4));
});

it('test generate samples', () => {
  expect.assertions(10);
  const outcomes = gaussian(0, 0.3).random(10);
  outcomes.forEach((outcome) => expect(typeof outcome).toBe('number'));
});

it('test custom RNG', () => {
  var sillyFn = () => .5;
  const outcomes = gaussian(0, 0.3).random(2, sillyFn);
  outcomes.forEach((outcome) => expect(outcome).toBeCloseTo(-0.644894028, 8));
});

/**
 * Just a naive and simple
 */
it('test generated sample distribution', () => {
  expect.assertions(2);
  const size = 3e6;
  const outcomes = gaussian(-1, 0.65).random(size);
  const mean = (outcomes.reduce((a, m) => a + m, 0) / size) * 1.0;
  const variance =
    (outcomes.reduce((a, n) => a + Math.pow(n - mean, 2)) / size) * 1.0;
  expect(mean).toBeCloseTo(-1.0);
  expect(variance).toBeCloseTo(0.65);
});

/**
 * Coverage for gaussian.js:20
 */
it('ceils ppf >= 1', () => {
  expect.assertions(3);
  const normal = gaussian(0, 1);
  expect(normal.ppf(1)).toBe(141.4213562373095);
  expect(normal.ppf(1.1)).toBe(141.4213562373095);
  expect(normal.ppf(100)).toBe(141.4213562373095);
});

/**
 * Coverage for gaussian.js:21
 */
it('ceils ppf <= 0', () => {
  expect.assertions(4);
  const normal = gaussian(0, 1);
  expect(normal.ppf(0)).toBe(-141.4213562373095);
  expect(normal.ppf(-0)).toBe(-141.4213562373095);
  expect(normal.ppf(-0.1)).toBe(-141.4213562373095);
  expect(normal.ppf(-1)).toBe(-141.4213562373095);
});
