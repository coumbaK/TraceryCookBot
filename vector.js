/**
* Vector utilities
* Kate Compton
* Things we often need when working with vectors
* Drawing arrows
*/


Object.defineProperty(Array.prototype, 'drawArrow', {
    value: function(p, v, m=1) { 
      
    }
});

Object.defineProperty(Array.prototype, 'magnitude', {
    value: function() { 
      return this.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
    }
});
