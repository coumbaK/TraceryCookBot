/**
* Vector utilities
* Kate Compton
* Things we often need when working with vectors
* Drawing arrows
*/



function addPolar(v, r, theta) {
  // v = m*u (m is scalar)
  v[0] += r*Math.cos(theta)
  v[1] += r*Math.sin(theta)
  
}

function addMultiple(v, m, u) {
  // v = m*u (m is scalar)
  v[0] += m*u[0]
  v[1] += m*u[1]
}

function polarCoord(r, theta) {
  // Returns a polar coord (array of 2 floats)
  return [r*Math.cos(theta), r*Math.sin(theta)]
}

Object.defineProperty(Array.prototype, 'drawArrow', {
    value: function(p, v, {m=0, color=[0,0,0]} = {}, headSize=1) { 
      if (v == undefined || !Array.isArray(v))
        throw("No v passed, drawArrow(p, v, {settings}), v=" + v)
      let x = this[0]
      let y = this[1]
      let vx = v[0] 
      let vy = v[1]
      let x1 = x + m*vx
      let y1 = y + m*vy
      
      let mag = v.magnitude()
      p.stroke(...color)
      p.line(x, y, x1, y1)
      p.noStroke()
      p.fill(...color)
      // Draw the arrowhead
     p.push()
      p.translate(x1, y1)
      p.beginShape()
      p.rotate(v.angle())
      p.vertex(0, 0)
      p.vertex(-10*headSize, 5*headSize)
      p.vertex(-5*headSize, 0)
      p.vertex(-10*headSize, -5*headSize)
      
      p.endShape()
      p.pop()
    }
});

Object.defineProperty(Array.prototype, 'mult', {
    value: function(m) { 
      for (var i = 0; i < this.length; i++) {
         this[i] *= m 
      }
      return this
    }
});

Object.defineProperty(Array.prototype, 'add', {
    value: function(x, y) { 
      if (Array.isArray(x)) {
         this[0] += x[0]
          this[1] += x[1]
      } else {
        this[0] += x
        this[1] += y
      }
       
      return this
    }
});

Object.defineProperty(Array.prototype, 'magnitude', {
    value: function() { 
      return Math.sqrt(this.reduce( (v0, v) => v0 + v**2, 0));
    }
});

Object.defineProperty(Array.prototype, 'angle', {
    value: function() { 
      return Math.atan2(this[1], this[0])
    }
});
