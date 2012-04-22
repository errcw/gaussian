// Models the normal distribution

var Gaussian = function(mean, variance) {
  if (variance <= 0) {
    throw new Error('Variance must be > 0 (but was ' + variance + ')');
  }

  var stddev = Math.sqrt(variance);
  var precision = 1 / variance;
  var precisionmean = precision * mean;

  // Complementary error function
  var erfc = function(x) {
  };


  // Inverse complementary error function
  var ierfc = function(x) {
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

