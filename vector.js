/**
* Vector utilities
* Kate Compton
* Things we often need when working with vectors
* Drawing arrows
*/


Object.defineProperty(Array.prototype, 'drawArrow', {
    value: function(p, v, m=1) { 
      if (v == undefined || !Array.isArray(v))
        console.warn("No v passed, drawArrow(p, v, m), v=" + v)
      let x = this[0]
      let y = this[1]
      let vx = v[0]
      let vy = v[1]
      p.line(x, y, x + vx*m, y + vy*m)
    }
});

Object.defineProperty(Array.prototype, 'magnitude', {
    value: function() { 
      return Math.sqrt(this.reduce( (v0, v) => v0 + v**2, 0));
    }
});
