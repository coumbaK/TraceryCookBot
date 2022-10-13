/* globals Vector2D */

class ParticleSystem {
  constructor(ParticleClass=Particle, count=100) {
   
    this.particles = [];
  
    for (var i = 0; i < count; i++) {
      let pt = new ParticleClass(this);
      this.particles.push(pt);
    }
  }
  
  update(p, dt) {
    // Update all the particles in this system
    
    // Calculate this particle's forces
    this.particles.forEach(pt => {
      pt.calculateForces(p);
    });
    
    // Update this particle's velocity and movement for dt seconds
    this.particles.forEach(pt => {
      pt.move(p, dt);
    });
  }

  draw(p) {
   
    // JS Arrays have some useful "do something for each element" methods:
    // map, filter, forEach
    this.particles.forEach((pt, index) => {
      pt.draw(p);
    });
    
  }
}

let particleCount = 0;

class Particle {
  constructor(ps) {
    this.ps = ps
    this.idNumber = particleCount++;
    this.pos = new Vector2D(0,0)
    this.v = new Vector2D(0,0)
    this.f = new Vector2D(0,0)
    
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
