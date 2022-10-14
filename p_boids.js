/* globals Vector2D, Particle, ParticleSystem, p */

/*
 * Basic particles with an attraction force
 */

class BoidSystem extends ParticleSystem {
  static label = "🐦"; // Ignore the Glitch parse error
  static desc = "Boids animation"; // Ignore the Glitch parse error

  constructor() {
    // Make what particle, and how many?
    // Try different numbers of particles
    super(BoidParticle, 10);
    
    this.flockCenter = new Vector2D()
  }

  draw(p) {
    // A little bit of trails!
    p.background(0, 0, 50, 0.5);
   

    // The "super-class" draws the particles
    super.draw(p);
  }
}

//=========================================================================
//=========================================================================
//=========================================================================

class BoidParticle extends Particle {
  constructor(ps, index) {
    // ps: the particle system this particle belongs to
    // index: of all the particles in that system, this one's index
    super(ps, index);

    this.pos.setToRandom(0, p.width, 0, p.height);
    this.radius = 10
    this.angle = Math.random()*100
    this.v.setToPolar(10, this.angle)
  }

  calculateForces(p, dt) {
    
  }

  draw(p, drawDebug = false) {
    let t = p.millis() * 0.001;
  
    p.noStroke();
    p.fill(100)
    p.push()
    p.translate(...this.pos)
    p.rotate(this.angle)
    
    p.beginShape()
    p.vertex(this.radius, 0)
    p.vertex(-this.radius, -this.radius)
     p.vertex(0, 0)
    p.vertex(-this.radius, this.radius)
    
    
    p.endShape()
    
    p.pop()
    
    
    if (drawDebug) {
      this.pos.drawArrow(p, this.attractionForce, { m: 0.1 });
    }
  }
}
