/* globals Vector2D */

class ParticleSystem {
  constructor(ParticleClass=Particle, count=100) {
   
    this.particles = [];
  
    for (var i = 0; i < count; i++) {
      let pt = new ParticleClass(this);
      this.particles.push(pt);
    }
    console.log(`Created ${}`)
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
    
    // Position
    this.pos = new Vector2D(0,0)
    
    // Velocity
    this.v = new Vector2D(0,0)
    
    // Force
    this.f = new Vector2D(0,0)
    
  }

  calculateForces(p, dt) {
    // Important! reset your forces each frame
    // unlike velocity and position, forces don't accumulate
    this.f.setTo(0,0)
  }
  
  move(dt) {
     this.pos.addMultiple(this.v, dt)
     this.v.addMultiple(this.f, dt)
  }
  
  draw(p) {
    p.fill(100);
    p.noStroke();
    p.circle(...this.pos, 30);
    if (this.debugText)
      p.text(this.debugText, this.pos[0], this.pos[1] - 10);
  }
}
