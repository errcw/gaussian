[![Version](https://img.shields.io/npm/v/gaussian)](https://www.npmjs.com/package/gaussian)
[![Tests](https://github.com/errcw/gaussian/workflows/tests/badge.svg)](https://github.com/errcw/gaussian/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/errcw/gaussian/badge.svg?branch=master)](https://coveralls.io/github/errcw/gaussian?branch=master)
[![Downloads](https://img.shields.io/npm/dy/gaussian)](https://www.npmjs.com/package/gaussian)

# gaussian

A JavaScript model of the [Normal](http://en.wikipedia.org/wiki/Normal_distribution)
(or Gaussian) distribution.

## API

### Creating a Distribution

```javascript
var gaussian = require('gaussian');
var distribution = gaussian(mean, variance);
// Take a random sample using inverse transform sampling method.
var sample = distribution.ppf(Math.random());
```

### Properties

- `mean`: the mean (μ) of the distribution
- `variance`: the variance (σ^2) of the distribution
- `standardDeviation`: the standard deviation (σ) of the distribution

### Probability Functions

- `pdf(x)`: the probability density function, which describes the probability
  of a random variable taking on the value _x_
- `cdf(x)`: the cumulative distribution function, which describes the
  probability of a random variable falling in the interval (−∞, _x_]
- `ppf(x)`: the percent point function, the inverse of _cdf_

### Combination Functions

- `mul(d)`: returns the product distribution of this and the given distribution; equivalent to `scale(d)` when d is a constant
- `div(d)`: returns the quotient distribution of this and the given distribution; equivalent to `scale(1/d)` when d is a constant
- `add(d)`: returns the result of adding this and the given distribution's means and variances
- `sub(d)`: returns the result of subtracting this and the given distribution's means and variances
- `scale(c)`: returns the result of scaling this distribution by the given constant

### Generation Function

- `random(n)`: returns an array of generated `n` random samples correspoding to the Gaussian parameters.
