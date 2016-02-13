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
