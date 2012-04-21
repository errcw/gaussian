// Models the normal distribution

var Gaussian = function(mean, variance) {
  return {
    mean: mean,
    variance: variance,

    // Probability density function
    pdf: function(x) {
    },

    // Cumulative density function
    cdf: function(x) {
    },

    // Percent point function (inverse of cdf)
    ppf: function(x) {
    },

    // Product distribution of this and d
    mul: function(d) {
    },

    // Quotient distribution of this and d
    div: function(d) {
    }
  };
};

module.exports = function(mean, variance) {
  return new Gaussian(mean, variance);
};

