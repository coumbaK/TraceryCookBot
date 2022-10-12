

/* globals Vector2D */

class ParticleSystem {
  constructor() {
    console.log("I made a particlesystem");

    this.particles = [];

    for (var i = 0; i < 1; i++) {
      let pt = new Particle();

      this.particles.push(pt);
    }

    console.log("I have", this.particles.length, "particles");
    console.log(this.particles);
  }

  update(p, dt) {
    this.particles.forEach((pt, index) => {
      pt.update(p, dt);
    });
  }

  draw(p) {
    p.stroke(150, 100, 50);
    p.noFill();
    p.circle(0, 0, 200);

    // Maps, filters, for each
    this.particles.forEach((pt, index) => {
      pt.draw(p);
    });
  }
}

let particleCount = 0

class Particle {
  constructor() {
    this.idNumber = particleCount++
    console.log("I made a particle!");
    let r = Math.random() ** 0.5 * 100;
    this.drag = 0.01

    this.pos = Vector2D.polar(r, Math.random() * 6.26);

    let initialSpeed = 10;
    this.v = Vector2D.polar(initialSpeed, Math.random() * 6.26);
    
    
    this.f = new Vector2D()
    
    // You can add the forces ar
    this.wiggleForce = new Vector2D()
    
  }
  
  applyForceTowardsPoint(center, amt=1, {falloff=1, startRadius}={}) {
    let offset = Vector2D.sub(this.pos, center)
    
    // How much force should be applied?
    // Take our current distance
    let d = offset.magnitude
    
    let x = d
    // Treat distances less than or greater than the thresholds as being *at* those thresholds
    if (startRadius !== undefined)
      x = Math.max(d - startRadius, 0)

    if (d === 0 || isNaN(d))
      return
    
    let strength = amt*(x**falloff)
    this.debugText = "str " + strength.toFixed(2) + " x=" + x
    
    this.f.addMultiple(offset, strength/d)
  }

  // How to update particle
  update(p, dt) {
    //      Reset forces
    let gravity = 10;
     this.f.setTo(0, gravity)
    
    // How far outside of the range is this particle?
    let distanceFromCenter = this.pos.magnitude
    let range = 100
    let outOfRange = Math.max(0, distanceFromCenter - range)
   
    let center = new Vector2D(0,0)
    this.applyForceTowardsPoint(center, -10, {startRadius: 100, falloff: 1})
    

    //      wiggle force
    
    let r = 600;
    let theta = 20 * p.noise(dt * 1);
    this.f.addPolar(r, theta);

   this.pos.addMultiple(this.v, dt);
    this.v.addMultiple(this.f, dt);
    
//     Fake drag
    if (this.drag)
      this.v.mult(1 - this.drag)
    
    // How fast is this particle allowed to go?
    this.v.constrainMagnitude(0, 500)
  }

  // How to draw particle

  draw(p) {
    p.fill(100);
    p.noStroke();
    // p.circle(this.pos[0], this.pos[1], 10)
    p.circle(...this.pos, 3);
    this.pos.drawArrow(p, this.v, { color: [100, 100, 50], m: 1 });
    // let m = 10
    // p.stroke(0)
    // p.line(this.pos[0], this.pos[1], this.pos[0] + this.v[0]*m, this.pos[1] + this.v[1]*m)
    // p.stroke(20, 100, 50)
    // p.line(this.pos[0], this.pos[1], this.pos[0] + this.f[0]*m, this.pos[1] + this.f[1]*m)
    p.fill(0);
    
    p.text(this.debugText, this.pos[0], this.pos[1] - 10);
     
  }
}
