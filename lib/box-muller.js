/** 
 * Box-Muller implementation
 * https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
 */

(function(exports){
  const PRECISION = 1e9;
  const _2PI = Math.PI * 2;
  function generateGaussian(mean,std){
    var u1 = Math.random();
    var u2 = Math.random();
    
    var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(_2PI * u2);
    var z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(_2PI * u2);

    return z0 * std + mean;
  }

  exports(generateGaussian)
})
(typeof(exports) !== "undefined"
    ? function(e) { module.exports = e; }
    : function(e) { this["boxmuller"] = e; });
  
