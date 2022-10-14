/* globals Vector2D, Particle, ParticleSystem, p */

/*
 * Local-frame physics
 * and trails!
 */

class RocketSystem extends ParticleSystem {
  constructor() {
    // Make wind particles
    super(RocketParticle, 5);
    this.windScale = 0.001;
  }


}

class RocketParticle extends Particle {
  constructor(ps, index) {
    super(ps, index);
    
    
    this.angle = Math.random()*200
    this.hue = Math.random()*60

    // Put these particles somewhere randomly on screen
    this.pos.setToRandom(
      -p.width / 2,
      p.width / 2,
      -p.height / 2,
      p.height / 2
    ); // Set to a random (x0,x1,y0,y1)
    this.v.setTo(0, 100);

     this.thrusterStrength = 1
    this.turnStrength = .1
    this.flameAnimation = .1
    
    this.thrustForce = new Vector2D()
    this.turnForce = new Vector2D()
    this.trail = []
  }

  calculateForces(p, dt) {
    let t = p.millis()*.001
    // The ship's angle is the same as its velocity
    //. True of rockets, may not be true of everything!
    
    this.angle = this.v.angle
    let angle = this.angle
    
    // Set the amount of turn and thruster force
    this.turnStrength = 10*(p.noise(t*.2, this.idNumber) - .5)
    this.thrusterStrength = 10*(p.noise(t*.2, this.idNumber) - .5)
    
    
    let multiplier = 100
    this.thrustForce.setToPolar(this.thrusterStrength * multiplier, this.angle)
    this.turnForce.setToPolar(this.turnStrength * multiplier, this.angle + Math.PI/2)
    this.f.add(this.turnForce)
    this.f.add(this.thrustForce)
    
    this.v.mult(.98)
  }

  move(p, dt) {
    // Call the original move function
    super.move(p, dt);
  
    // Then wrap around the screen
    this.pos.wrapY(-p.height / 2, p.height / 2);
    this.pos.wrapX(-p.width / 2, p.width / 2);
  }

  draw(p, drawDebug = false) {
    let t = p.millis() * 0.001;

   	p.stroke(0, 0, 100, 1)
	p.fill(0, 0, 0, .4)
		
		this.trail.forEach(pt => p.circle(...pt, 3))

		p.push()
		p.translate(...this.pos)
		p.rotate(this.v.angle)

    // Rocket body
		p.noStroke()
		p.rectMode(p.CENTER)
		p.stroke(0, 0, 100, 1)
	p.fill(0, 0, 50)
		p.rect(10, 0, 15, 10)
		p.ellipse(30, 0, 22, 5)
  
    // Fins
		p.beginShape()
		p.vertex(0, 0)
		p.vertex(20, 0)
		p.fill(0, 0, 70)
		p.vertex(0, -40*this.turnStrength)
		p.endShape()

// 		let cycle = this.flameAnimation
// 		let flameCount = 7
// 		p.scale(this.thrusterStrength, .6 + this.thrusterStrength*.4)
// 		for (var i = 0; i < flameCount; i++) {
// 			let pct = ((i + cycle*10)%flameCount)/flameCount
// 			let r = (.3 + Math.sin(pct*Math.PI))*(1-pct)
// 			p.fill(50 - pct*50, 100, 50)
// 			p.noStroke()
// 			p.ellipse(-pct*100, pct*3*Math.sin(i*3 + cycle), r*40, r*15)
// 		}

		p.pop()
    
    // if (drawDebug) {
      this.pos.drawArrow(p, this.thrustForce, { m: 0.2, color: [40, 100, 50] });
      this.pos.drawArrow(p, this.turnForce, { m: 0.2, color: [190, 100, 50] });
    // }
  }
}
