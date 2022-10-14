/* globals Vector2D, Particle, ParticleSystem, p */

class RainSystem extends ParticleSystem{
  constructor() {
     // Make rain particles
   super(RainParticle, 100)
  this.windScale = .001
        
  }

 
  
  getWindAt(x, y) {
    let windTheta = 10*p.noise(x*this.windScale, y*this.windScale)
    let windSpeed = 10
    return Vector2D.polar(windSpeed, windTheta)
  }
}


class RainParticle extends Particle {
  constructor(ps, index) {
    super(ps, index)
    
    // Put these particles somewhere randomly on screen
    this.pos.setToRandom(-p.width/2, p.width/2, -p.height/2, p.height/2) // Set to a random (x0,x1,y0,y1)
    this.v.setTo(0, 100)
    
// Store a wind force so we can visualize it
    this.windForce = new Vector2D()
  }  
  
  calculateForces(p, dt) {
    let t = p.millis()*.001
    
    // Apply some "drag" by making the velocity smaller
    this.v.mult(.99)
    
    
    this.f.add(0, 40)
    
//     Different "wander forces"
    
    let windX = this.ps.windScale*this.pos[0]
    let windY = this.ps.windScale*this.pos[1]
    
// Which way to go?
    // Set the wind from just the time (note how they synchronize)
    let windDir = 20*p.noise(t*.1)
    
    // Set the wind from their positions
    // But if they have the same position, eventually 
    // they clump up
    windDir = 20*p.noise(windX, windY)
    
    
    windDir = 20*p.noise(windX, windY, t*.1)
   
    this.windForce.setToPolar(100, windDir)
    this.f.add(this.windForce)
    
  }
  
  move(p, dt) {
    // Call the original move function
    super.move(p, dt)
    
    
    this.pos.wrapY(-p.height/2, p.height/2)
    this.pos.wrapX(-p.width/2, p.width/2)
  }
  
  draw(p) {
    p.fill(100)
    p.circle(...this.pos, 1)
    
    this.pos.drawArrow(p, this.windForce, {m:.2})
  }

}
