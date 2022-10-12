/**
* Vector utilities
* Kate Compton
* Things we often need when working with vectors
* Drawing arrows
*/


class Vector2D extends Array {
  constructor(x=0, y=0) {
    this.super(x, y)
    return this
  }
  
  addPolar(r, theta) {
    this[0] += r*Math.cos(theta)
     this[1] += r*Math.sin(theta)
    return this
  }
  
 
   mult(m) {
    this[0] *= m
     this[1] *= m
     return this
  }
  
   div(m) {
    this[0] /= m
     this[1] /= m
     return this
  }
  
  add(x, y) { 
      if (Array.isArray(x)) {
         this[0] += x[0]
          this[1] += x[1]
      } else {
        this[0] += x
        this[1] += y
      }
       
      return this
    }
  
  get magnitude() {
    return Math.sqrt(this[0]**2 + this[1]**2)
  }
  
  get angle() {
    return Math.atan2(this[1], this[0])
  }
  
  
  //======================
  // Drawing things
  
  function(p, v, {m=0, color=[0,0,0]} = {}, headSize=1) { 
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
  //======================
  // Drawing things
  
  toString() {
    return `(${this[0].toFixed(2)}, ${this[1].toFixed(2)})`
  }
  
  static calculate(n) {
    return super.calculate(n) * super.calculate(n);
  }
}

Vector2D.prototype.polar = function(r, theta) {
  return new Vector2D(r*Math.cos(theta), r*Math.sin(theta))
}
