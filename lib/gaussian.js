// Models the normal distribution

var Gaussian = function(mean, variance) {
  if (variance <= 0) {
    throw new Error('Variance must be > 0 (but was ' + variance + ')');
  }

  var stddev = Math.sqrt(variance);
  var precision = 1 / variance;
  var precisionmean = precision * mean;

  // Complementary error function
  // From Numerical Recipes in C 2e p221
  var erfc = function(x) {
    var z = Math.abs(x);
    var t = 1 / (1 + z / 2);
    var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
            t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
            t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
            t * (-0.82215223 + t * 0.17087277)))))))))
    return x >= 0 ? r : 2 - r;
  };

  // Inverse complementary error function
  // From Numerical Recipes 3e p265
  var ierfc = function(x) {
    if (x >= 2) { return -100; }
    if (x <= 0) { return 100; }

    var xx = (x < 1) ? x : 2 - x;
    var t = Math.sqrt(-2 * Math.log(xx / 2));

    var r = -0.70711 * ((2.30753 + t * 0.27061) /
            (1 + t * (0.99229 + t * 0.04481)) - t);

    for (var j = 0; j < 2; j++) {
      var err = erfc(r) - xx;
      r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
    }

    return (x < 1) ? r : -r;
  };

  // Construct a new distribution from the precision and precisionmean
  var fromPrecisionMean = function(precision, precisionmean) {
    var mean = precisionmean / precision;
    var variance = 1 / precision;
    return new Gaussian(mean, variance);
  };

  return {
    mean: mean,
    variance: variance,
    standardDeviation: stddev,

    precision: precision,
    precisionmean: precisionmean,

    // Probability density function
    pdf: function(x) {
      var m = stddev * Math.sqrt(2 * Math.PI);
      var e = Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
      return e / m;
    },

    // Cumulative density function
    cdf: function(x) {
      return 0.5 * erfc(-(x - mean) / (stddev * Math.sqrt(2)));
    },

    // Percent point function (inverse of cdf)
    ppf: function(x) {
      return mean - stddev * Math.sqrt(2) * ierfc(2 * x);
    },

    // Product distribution of this and d
    mul: function(d) {
      return fromPrecisionMean(
          precision + d.precision,
          precisionmean  + d.precisionmean);
    },

    // Quotient distribution of this and d
    div: function(d) {
      return fromPrecisionMean(
          precision - d.precision,
          precisionmean  - d.precisionmean);
    }
  };
};

module.exports = function(mean, variance) {
  return new Gaussian(mean, variance);
};

