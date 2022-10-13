/* globals Vector2D, Particle, ParticleSystem */

class RainSystem {
  constructor() {
    console.log("I made a particlesystem");

    this.particles = [];

    for (var i = 0; i < 100; i++) {
      let pt = new Particle(this);

      this.particles.push(pt);
    }

    console.log("I have", this.particles.length, "particles");
    console.log(this.particles);
    
    this.windScale = .01
        
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

    
    
    
    let count = 30
    for (var i = 0; i < count; i++) {
      
      for (var j = 0; j < count; j++) {
        let x = i*10 - 140
        let y = j*10 - 140
        p.fill(0)
        p.circle(x, y, 1)
//         let windTheta = 10*p.noise(x*this.windScale, y*this.windScale)
//         let windSpeed = 10
        
        p.stroke(0)
        
        let wind = this.getWindAt(x, y)
        
        p.line(x, y, x + wind[0], y + wind[1])
      }
    }
    
    // Maps, filters, for each
    this.particles.forEach((pt, index) => {
      pt.draw(p);
    });
    
  }
  
  getWindAt(x, y) {
    let windTheta = 10*p.noise(x*this.windScale, y*this.windScale)
    let windSpeed = 10
    return Vector2D.polar(windSpeed, windTheta)
  }
}


class RainParticle {
  constructor(ps) {
    this.ps = ps
    this.idNumber = particleCount++;
    console.log("I made a particle!");
    let r = Math.random() ** 0.5 * 100;
    this.drag = 0.6;

    
    
    this.pos = Vector2D.polar(r, Math.random() * 6.26);

    let initialSpeed = 10;
    this.v = Vector2D.polar(initialSpeed, Math.random() * 6.26);

    this.f = new Vector2D();

    // You can add the forces ar
    this.wiggleForce = new Vector2D();
    
    this.mouseForce = new Vector2D();
  }

  getForceTowardsPoint(center, amt = 1, { falloff = 1, startRadius } = {}) {
    let offset = Vector2D.sub(this.pos, center);

    // How much force should be applied?
    // Take our current distance
    let d = offset.magnitude;

    let x = d;
    // Treat distances less than or greater than the thresholds as being *at* those thresholds
    if (startRadius !== undefined) x = Math.max(d - startRadius, 0);

    if (d === 0 || isNaN(d)) return;

    let strength = amt * x ** falloff;
    // this.debugText = "str " + strength.toFixed(2) + " x=" + x.toFixed(2);
  
    return offset.mult(strength/d)
   
  }

  // How to update particle
  update(p, dt) {
    //      Reset forces
    let gravity = 10;
    // this.f.setTo(0, gravity)

   

    let center = new Vector2D(0, 0);
    
    // Apply a force to the cetner
    this.boundaryForce = this.getForceTowardsPoint(center, -10, { startRadius: 200, falloff:1 });

    let mouseVector = new Vector2D(p.mouseX - p.width/2, p.mouseY - p.height/2)
    // let mouseVector = new Vector2D(p.mouseX , p.mouseY )
    this.mouseForce = this.getForceTowardsPoint(mouseVector, -100, { startRadius: 10, falloff:1.5 });

    // this.f.add(this.mouseForce)
    this.f.add(this.boundaryForce)
    
    this.wind = this.ps.getWindAt(...this.pos)
    this.f.add(this.wind)
    //      wiggle force

    // let r = 600;
    // let theta = 20 * p.noise(dt * 1);
    // this.f.addPolar(r, theta);

    this.pos.addMultiple(this.v, dt);
    this.v.addMultiple(this.f, dt);

    
    // How fast is this particle allowed to go?
    this.v.constrainMagnitude(0, 500);
    
    //     Fake drag
    if (this.drag) this.v.mult(1 - this.drag);

  }

  // How to draw particle

  draw(p) {
    p.fill(100);
    p.noStroke();
    // p.circle(this.pos[0], this.pos[1], 10)
    p.circle(...this.pos, 3);
    // this.pos.drawArrow(p, this.v, { color: [100, 100, 50], m: .1 });
    // this.pos.drawArrow(p, this.wind, { color: [320, 100, 50], m: 4 });
    
    // let m = 10
    // p.stroke(0)
    // p.line(this.pos[0], this.pos[1], this.pos[0] + this.v[0]*m, this.pos[1] + this.v[1]*m)
    // p.stroke(20, 100, 50)
    // p.line(this.pos[0], this.pos[1], this.pos[0] + this.f[0]*m, this.pos[1] + this.f[1]*m)
    p.fill(0);

    p.text(this.debugText, this.pos[0], this.pos[1] - 10);
  }
}
