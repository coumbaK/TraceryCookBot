/* globals Vector2D, Particle, ParticleSystem, p */

/*
 * Local-frame physics
 * and trails!
 * Would work great with a curve behind it instead.....
 */

class BasicSystem extends ParticleSystem {
  
  static label = "🟢"; // Ignore the Glitch parse error
  static desc = "Basic particle motions"; // Ignore the Glitch parse error
  
  
  constructor() {
    // Make what particle, and how many?
    super(BasicParticle, 50);
   
  }
  
  draw(p) {
    
    p.background(0, 0, 50)
    
    p.push()
     p.translate(this.width/2, this.height/2)
    
    // The "super-class" draws the particles
     super.draw(p)
    
    p.pop()
  }
}

//=========================================================================
//=========================================================================
//=========================================================================

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

    p.circle(...this.pos, 30)
    
  }
}
