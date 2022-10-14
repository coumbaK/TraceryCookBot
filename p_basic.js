/* globals Vector2D, Particle, ParticleSystem, p */

/*
 * Local-frame physics
 * and trails!
 * Would work great with a curve behind it instead.....
 */

class BasicSystem extends ParticleSystem {
  
  static label = "🟢"; // Ignore the Glitch parse error
  
  constructor() {
    super(BasicParticle, 5);
   
  }
}

class BasicParticle extends Particle {
  constructor(ps, index) {
    super(ps, index);

  }

  calculateForces(p, dt) {
    let t = p.millis() * 0.001;
   

    this.v.mult(0.98);
  }

  move(p, dt) {
    // Call the original move function
    super.move(p, dt);

  }

  draw(p, drawDebug = false) {
    let t = p.millis() * 0.001;

    
    
  }
}
