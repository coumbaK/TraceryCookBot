/* globals Vector2D, DEBUG_DRAW_EL */

class ParticleSystem {
  constructor(ParticleClass=Particle, count=100) {
   
    this.particles = [];
  
    for (var i = 0; i < count; i++) {
      let pt = new ParticleClass(this, i);
      this.particles.push(pt);
    }
    console.dir(ParticleClass)
    console.log(`Created ${count} ${ParticleClass.name}`)
  }
  
  update(p, dt) {
    // Update all the particles in this system
    
    // Calculate this particle's forces
    this.particles.forEach(pt => {
      // Important! reset your forces each frame
    // unlike velocity and position, forces don't accumulate
      pt.f.setTo(0,0)
      pt.calculateForces(p, dt);
    });
    
    // Update this particle's velocity and movement for dt seconds
    this.particles.forEach(pt => {
      pt.move(p, dt);
    });
  }

  draw(p) {
    let debugDraw = DEBUG_DRAW_EL.checked
   
    // JS Arrays have some useful "do something for each element" methods:
    // map, filter, forEach
    this.particles.forEach((pt, index) => {
      pt.draw(p);
    });
    
  }
}

let particleCount = 0;

class Particle {
  
  constructor(ps, index) {
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
    // Calculate the force on these particles
    
  }
  
  move(p, dt) {
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
