class ParticleSystem {
  constructor() {
    console.log("I made a particlesystem")
    
    this.particles = []
    
    for (var i = 0; i < 10; i++) {
      let pt = new Particle()
      
      this.particles.push(pt)
    }
    
    console.log("I have", this.particles.length, "particles")
  }
  
  
  draw(p) {
    p.stroke(150, 100, 50)
    p.noFill()
    p.circle(0, 0, 200)
  }
}

class Particle {
  constructor() {
    console.log("I made a particle!")
  }
}