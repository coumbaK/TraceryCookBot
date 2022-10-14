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
    
    // The "super-class" draws the particles
     super.draw(p)
   
  }
}

//=========================================================================
//=========================================================================
//=========================================================================

class BasicParticle extends Particle {
  constructor(ps, index) {
    super(ps, index);
    
    // Where should these particles start?
    // Lets use a polar coordinate to start them in a spiral
    
    let r = 10 + index*2
    let theta = index*.3
    this.pos.setToPolar(r, theta).add(this.width)
    
    
    // We can also store other information about a particle, like its size or color
    this.hue = (index*10)%360
    this.radius = 10
    
    // Here's a new Vector2D we can store a force in so we can visualize it later
    this.attractionForce = new Vector2D()

  }

  calculateForces(p, dt) {
    
    // What forces do we want to apply to this particle?
   // We can attract it to the center
    let center = new Vector2D(0,0)
    this.attractionForce = this.pos.getForceTowardsPoint(center, 1, { falloff:1 } )
    
    
    let mouse = new Vector2D(p.mouseX, p.mouseY)
    this.attractionForce = this.pos.getForceTowardsPoint(center, 1, { falloff:1 } )
    
    this.f.add(this.attractionForce)

  }


  draw(p, drawDebug = false) {
  
    let t = p.millis() * 0.001;
    
    p.noStroke()
    p.fill(this.hue, 50, 50)
    p.circle(...this.pos, this.radius)
    
  }
}
